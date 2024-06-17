const mongoose = require('mongoose');


const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    isImportant: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = notesSchema