const mongoose = require('mongoose')

const rekSchema = new mongoose.Schema({
    file:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Rek', rekSchema)