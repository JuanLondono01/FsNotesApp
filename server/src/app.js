const express = require('express');
const cors = require('cors')
const app = express();

// settings
app.set('Port', process.env.PORT || 2710)

// Middlewares
app.use(cors())
app.use(express.json())


// Routes
app.use('/access', require('./routes/access'))
app.use('/user', require('./routes/user'))



module.exports = app