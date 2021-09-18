const Links = require('../models/links')
const Menu = require('../models/adminMenu')

const getLinks = {
    createLinks : async (req,res)=>{
        try {
            const {tg,insta,tw,fb} = req.body
            const links = new Links({tg,insta,tw,fb})
            await links.save()
            res.redirect('/links')
        } catch (error) {
            res.redirect('/links')
        }
    },
    allLinks : async (req,res)=>{
        const links = await Links.find()
            .sort({createdAt:-1})
            .limit(100)
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/link/index', {
            layout:'admin_layout', links, user, menu
        })
    },
    getLinksById : async (req,res)=>{
        const result = await Links.findById(req.params.id)
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/link/update',{
            layout:'admin_layout', result, menu, user
        })
    },
    linkDelete : async(req,res)=>{
        await Links.findByIdAndDelete(req.params.id)
        res.redirect('/links')
    },
    linkUpdate : async (req,res)=>{
        const {id} = req.params
        try {
            const {tg,insta,tw,fb} = req.body
            await Links.findByIdAndUpdate({_id:id}, {tg,insta,tw,fb})
                .then((data)=>{
                    data.save()
                    res.redirect('/links')
                })
        } catch (error) {
            res.redirect(`/links/${id}`)
        }
    }
}

module.exports = getLinks