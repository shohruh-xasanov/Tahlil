const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    menu:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Menu', menuSchema)