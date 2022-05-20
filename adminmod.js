var mongoose = require('mongoose');
var NotificationSchema = mongoose.Schema({
     username:{
         type:String,
         required:true,
     },
    Adminfees: {
        type: Number,
        required: true,
        unique: true 
    }
},
{ timestamps: true },);
module.exports = mongoose.model('Notification', NotificationSchema);
