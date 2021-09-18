const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    tg:{
        type:String,
        required:[true, "Telegram linkini kiriting"],
        trim:true,
    },
    insta:{
        type:String,
        required:[true, 'Instagram linkini kiriting'],
        trim:true
    },
    tw:{
        type:String,
        required:[true, 'Twitter linkini kiriting'],
        trim:true
    },
    fb:{
        type:String,
        required:[true, 'Twitter linkini kiriting'],
        trim:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Links', linkSchema)