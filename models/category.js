const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name :{
        uz:
        {
            type:String, 
            trim:true,
            unique:false
        },
        ru:{
            type:String, 
            trim:true,
            unique:false
        },
        eng:
        {
            type:String, 
            trim:true,
            unique:false
        }
    },
    search:{
        type:String
    },
    searchru :{
        type:String
    },
    searchen:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Category', categorySchema)