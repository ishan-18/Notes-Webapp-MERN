const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const e = require('express')

router.post('/register', async (req,res)=>{
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(422).json({err: "Please Enter all the fields"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(422).json({err: "Email already exists"})
        }

        const user1 = await User.findOne({name})
        if(user1) return res.status(422).json({err: "Username ain't available"})

        if(password.length < 6 && password.length > 14){
            return res.status(422).json({err: "Password must contain atleast 6 characters and at the most 14 characters"})
        }

        if(name.length < 2 && name.length > 14){
            return res.status(422).json({err: "Name must be of atleast 2 characters"})
        }

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(401).json({err: "Invalid Email"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            name,
            email, 
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({msg: "User registered Successfully", newUser})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(422).json({err: "Please Enter all the fields"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({err: "User doesn't exists"})
        }

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return res.status(401).json({err: "Invalid Email"})
        }

        if(password.length < 6 && password.length > 14){
            return res.status(422).json({err: "Password must contain atleast 6 characters and at the most 14 characters"})
        }

        const doMatch = await bcrypt.compare(password, user.password)
        if(doMatch){
            // res.status(200).json({msg: "User Signed in Sucessfully"})
            const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN, {expiresIn: "1d"})
            res.status(200).json({msg: "User Signed in Sucessfully", token})
        }else{
            return res.status(401).json({err: "Invalid Email or Password"})
        }

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.get('/byId', auth, async (req,res)=>{
    try {
        const token = req.header("Authorization")
        if(!token){
            return res.status(401).json({err: "Access Denied"})
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, async (err, verified)=>{
            if(err){
                return res.status(401).json({err: err.message})
            }

            const user = await User.findById(verified._id)
            if(user){
                res.send(true)
            }else{
                res.send(false)
            }

        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

module.exports = router