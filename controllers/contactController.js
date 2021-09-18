const Contact = require('../models/contact')
const Menu = require('../models/adminMenu')

const getContact = {
    createContact : async (req,res)=>{
        try {
            const {fullname,email,phone,message} = req.body
            const contact = new Contact({fullname,email,phone,message})
            await contact.save()
            res.redirect('/contact')
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    allContact : async (req,res)=>{
        const contact = await Contact.find().sort({createdAt:-1}).limit(100)
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/contact/unseen', {
            layout:'admin_layout', contact, user, menu
        })
    }
}

module.exports = getContact