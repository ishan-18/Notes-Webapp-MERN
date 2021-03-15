require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

//Models
require('./models/user')
require('./models/notes')

//Routes
app.use('/user', require('./routes/user'))
app.use('/api', require('./routes/notes'))

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', ()=>{
    console.log("Database running @27017")
})

mongoose.connection.on('error', (err)=>{
    console.log("Error:", err)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server responding @${PORT}`)
})