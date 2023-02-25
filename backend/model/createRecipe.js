const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const recipe = new Schema({
    user : {type: ObjectId, ref:'User', required: false},
    title : String,
    author : String,
    img : {url:{
         type:String,
         required:true
    }},
    ingredients : String,
    instruction : String
}, {timestamps:true})

const Recipe = mongoose.model('Recipe', recipe)

module.exports = Recipe