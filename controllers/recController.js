const Rek = require('../models/rek')
const Menu = require('../models/adminMenu')
const fs = require('fs')
const path = require('path')

const getRek = {
    createRek : async (req,res)=>{
        try {
            const rek = new Rek({
                file:req.file.filename
            })
            console.log(file)
            await rek.save()
            res.redirect('/')
        } catch (error) {
           res.status(500).json({msg:error.message})
        }
    },
    allRec : async (req,res)=>{
        const rek = await Rek.find().sort({createdAt:-1}).limit(100)
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/rec/index', {
            layout:'admin_layout', rek, user,menu
        })
    },
    reclameDelete : async (req,res)=>{
        const result = await Rek.findById(req.params.id)
        fs.unlink(path.join(path.dirname(__dirname) + result.file), (err)=>{
            if(err){
                return
            }
        })
        await Rek.findByIdAndDelete({_id:result._id})
        res.redirect('/sendrec')
    }
}

module.exports = getRek