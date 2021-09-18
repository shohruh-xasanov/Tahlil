const Reclame = require('../models/reclame')
const {sharpFile} = require('../fileUpload/sharp')
const Menu = require('../models/adminMenu')
const fs = require('fs')
const path = require('path')

const getReclame = {
    createReclame : async (req,res)=>{
        try {
            const files = await sharpFile(req.file.filename, 1316, 180)
            const reclame = new Reclame({image:files, link:req.body.link})
            await reclame.save()
            res.redirect('/reclame')
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    allReclame : async (req,res)=>{
        const reclame = await Reclame.find()    
            .sort({createdAt:-1})
            .limit(100)
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/reclame/index', {
            layout:'admin_layout', reclame, user, menu
        })
    },
    getReclameById : async (req,res)=>{
        const result = await Reclame.findById(req.params.id)
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin 
        res.render('admin/reclame/update', {
            layout:'admin_layout', result, menu, user
        })
    },
    reclameDelete : async (req,res)=>{
        const result = await Reclame.findById(req.params.id)
        fs.unlink(path.join(path.dirname(__dirname) + result.image), (err)=>{
            if(err){
                return
            }
        })
        await Reclame.findByIdAndDelete({_id:result._id})
        res.redirect('/reclame')
    },
    reclameUpdate : async (req,res)=>{
        try {
            const result = await Reclame.findById(req.params.id)
            fs.unlink(path.join(path.dirname(__dirname) + result.image), (err)=>{
                if(err){
                    return
                }
            })
            console.log(req.file)
            const files = await sharpFile(req.file.filename, 1316, 180)
            result.image = files
            result.link = req.body.link
            await result.save()
            res.redirect('/reclame')
        } catch (error) {
            res.redirect(`/reclame/${req.params.id}`)
        }
    }
}

module.exports = getReclame