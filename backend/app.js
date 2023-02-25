const express = require('express')
const connection = require('./connection/connection')
connection()
const cors = require('cors')
const userRoutes = require('./routes/route')

const app = express()

app.use(cors())
app.use(userRoutes)

app.get("*", (req, res)=>{
    res.status(404).send("API NOT FOUND")
})

app.listen(5412 || process.env.PORT, ()=>{console.log('Listening on port 5412')})