const mongoose = require('mongoose')

const statisticSchema = new mongoose.Schema({
    message:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Visit', statisticSchema)