const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },
    message:{
        type:String,
        required:true,
        trim:true,
        minlength:10
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Contact', contactSchema)