const express = require('express')
const Recipe = require('../model/createRecipe')
const User = require('../model/register')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const { jwt_token } = require('../key')
const jwt = require('jsonwebtoken')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//Post api for register

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({
                status: "failed",
                error: "enter all the fields"
            })
        }
        const existemail = await User.findOne({ email: email })
        if (existemail) {
            return res.status(402).json({
                status: "signup failed",
                error: "email already exist"
            })
        }
        bcrypt.hash(password, 10, async (err, hashedPass) => {
            if (err) {
                return res.status(409).json({
                    status: "failed",
                    message: err.message
                })
            }
            const data = await User.create({
                email,
                password: hashedPass
            })
            return res.status(200).json({
                status: "Success",
                message: "signup successfully",
                data
            })
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

//Post api for login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                status: "failed",
                error: "enter all the fields"
            })
        }
        const userData = await User.findOne({ email })
        if (!userData) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        bcrypt.compare(password, userData.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                })
            }
            if (result) {
                const token = jwt.sign({ _id: userData.id }, jwt_token)
                const { _id, email, password } = userData
                return res.json({
                    token: token,
                    user: { _id, email, password },
                    message: 'user logged in successfully'
                })
            }
            else {
                return res.status(500).json({
                    error: "password not matched"
                })
            }
        })
    } catch(e){
        return res.status(400).json({
            error : e.message
        })
    }
})

//Post api for recipe

router.post('/recipe/:user', async(req,res)=>{
    console.log(req.body);
    try{
        const {user} = req.params
        const {title, author, ingredients, instruction} = req.body
        const {url, type} = req.body.img
        const data = await Recipe.create({ 
            title, 
            author, 
            img :{url, type}, 
            ingredients, 
            instruction, 
            user : user})
            await data.save()
            return res.status(201).json({
                message : "data created",
                data
            })
        
    } catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})

// Get api for recipe 

router.get('/recipe/:user', async(req,res)=>{
    try{
        const {user} = req.params
        const data = await Recipe.find({user : user})
        if(data.length){
            res.json({data})
        }
        else{
            res.status(400).json({
                message:"no record found"
            })
        }
    } catch(e){
        res.status(400).json({
            status : "failed",
            message : e.message
        })
    }
})
router.get('/find/user:/:search', async(req,res)=>{
    try{
        const user = req.params.user
        const key = `^${req.params.search}`
        const result = await Recipe.find({user:user,
        $or: [
            {title:{$regex:key, $option:"i"}},
        ]})
        if(result){
            res.status(200).json({result})
        }
    }catch(e){
        res.status(400).json({message:e.message})
    }
})

module.exports = router