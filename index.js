// my node start point
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');

const adminel=require('./routes/adminel')
const authfunc=require('./routes/user')
app.use(express.json());

// connect to mongoDB 
mongoose.connect(config.dbUrl);
mongoose.connection.on('connected', () => {
    console.log('connected to mongo database');
});
mongoose.connection.on('error', err => {
    console.log('Error at mongoDB: ' + err);
});
var port = 4000;
// overallroutes
app.use('/admin', adminel);//admin
app.use('/main',authfunc)
app.listen(port, () => {
    console.log('Server is starting = ' + port);
});

