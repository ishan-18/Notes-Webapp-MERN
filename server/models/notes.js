const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        max: 150
    },
    date: {
        type: Date,
        default: Date.now()
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

mongoose.model('Notes', noteSchema)