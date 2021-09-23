const mongoose = require('mongoose')

const reclameSchema = new mongoose.Schema({
    link:{
        type:String,
        requried:true
    },
    image:{
        type:String,
        requried:true
    },
    px:{
        type:String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Reclame',reclameSchema)