const Menu = require('../models/adminMenu')

exports.menuCreate = async (req,res)=>{
    try {
        const menu = new Menu({
            menu:false
        })
        await menu.save()
        res.status(201).json({menu})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


exports.menuEdit = async (req,res)=>{
    try {
        const {id} = req.params
        const fon =  await Menu.findById(id)
        fon.menu = !fon.menu
        await fon.save()
        res.redirect('/dashboard')
    } catch (error) {
        res.redirect('/dashboard')
    }
}