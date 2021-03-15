const router = require('express').Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const Notes = mongoose.model('Notes')

router.get('/notes', auth, async (req,res)=>{
    try {
        const notes = await Notes.find().populate('postedBy', '_id name email').sort('-createdAt')
        if(notes){
            res.status(200).json(notes)
        }else{
            return res.status(422).json({err: "Notes not found"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.post('/notes', auth, async (req,res)=>{
    try {
        const {title, subtitle, body, date} = req.body
        if(!title || !subtitle || !body || !date){
            return res.status(422).json({err: "Please Enter all the fields"})
        }

        const notes = await Notes.findOne({title})
        if(notes){
            return res.status(422).json({err: "Title already exists"})
        }

        if(title.length < 4){
            return res.status(422).json({err: "Title must contain atleast 4 characters"})
        }

        const newNotes = new Notes({
            title,
            subtitle,
            body,
            date,
            postedBy: req.user
        })

        await newNotes.save()

        res.status(201).json({msg: "Note Created Sucessfully"})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.get('/notes/:id', auth, async (req,res)=>{
    try {
        const notes = await Notes.findById(req.params.id).populate('postedBy',"_id name email").sort('-createdAt')
        if(notes){
            res.status(200).json(notes)
        }else{
            return res.status(422).json({err: "Notes not found"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.put('/notes/:id', auth, async (req,res)=>{
    try {
        const {title, subtitle, body, date} = req.body
        if(!title || !subtitle || !body || !date){
            return res.status(422).json({err: "Please Enter all the fields"})
        }

        const notes = await Notes.findOne({title})
        if(notes){
            return res.status(422).json({err: "Title already exists"})
        }
        
        if(title.length < 4){
            return res.status(422).json({err: "Title must contain atleast 4 characters"})
        }

        await Notes.findOneAndUpdate({_id: req.params.id}, {
            title, 
            subtitle,
            body, 
            date
        })

        res.status(201).json({msg: "Notes Updated Sucessfully"})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.delete('/notes/:id', auth, async (req,res)=>{
    try {
        const notes = await Notes.findByIdAndDelete(req.params.id)
        if(notes){
            res.status(200).json({msg: "Note Deleted Sucessfully"})
        }else{
            return res.status(422).json({err: "Can'\t delete the Note"})
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

module.exports = router