const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    // date:{
    //     type:Date,
    //     required:true
    // }, 
    Amount:{
        type:Number,
    }
})
module.exports = mongoose.model('usercol', userSchema)


