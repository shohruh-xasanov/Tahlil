const About = require('../models/about')
const Menu = require('../models/adminMenu')

const getAbout = {
    createAbout : async (req,res,next)=>{
        try {
            const {
                titleuz,titleru,titleeng, 
                descriptionuz,descriptionru,descriptioneng,
                conditionsuz, conditionsru, conditionseng} = req.body
            const about = new About({
                title:{uz:titleuz, ru:titleru, eng:titleeng},
                description:{uz:descriptionuz, ru:descriptionru, eng:descriptioneng},
                conditions:{uz:conditionsuz, ru:conditionsru, eng:conditionseng}
            })
            await about.save()
            res.redirect('/about')
        } catch (error) {
            res.redirect('/about')
        }
    },
    getAbout : async (req,res)=>{
        const about = await About.find().sort({createdAt:-1}).limit(100)
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.user
        res.render('admin/about/index', {
            layout:'admin_layout',
            about, user, menu
        })
    },
    getAboutById : async (req,res)=>{
        const result = await About.findById(req.params.id)
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/about/update',{
            layout:'admin_layout', result, menu, user
        })
    },
    aboutDelete : async(req,res)=>{
        await About.findByIdAndDelete(req.params.id)
        res.redirect('/about')
    },
    aboutUpdate : async (req,res)=>{
        const {id} = req.params
        try {
            const {
            titleuz,titleru,titleeng, 
            descriptionuz,descriptionru,descriptioneng,
            conditionsuz, conditionsru, conditionseng} = req.body

            const about = await About.findByIdAndUpdate({_id:id}, {
                title:{uz:titleuz, ru:titleru, eng:titleeng},
                description:{uz:descriptionuz, ru:descriptionru, eng:descriptioneng},
                conditions:{uz:conditionsuz, ru:conditionsru, eng:conditionseng}
            })
            await about.save()
            res.redirect('/about')
        } catch (error) {
            res.redirect(`/about/${id}`)
        }
    }
}

module.exports = getAbout