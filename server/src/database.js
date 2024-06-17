const mongoose = require('mongoose');

const URI = process.env.URI
    ? process.env.URI
    : 'mongodb://localhost:27017/NotesApp';

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Database is connected');
})