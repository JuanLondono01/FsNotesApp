const mongoose = require('mongoose');
const notesSchema = require('./NotesSchema')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userNotes: {
        type: [notesSchema],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});





const User = mongoose.model('User', userSchema);

module.exports = User;
