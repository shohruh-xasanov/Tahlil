const User = require('../../models/user')
const Menu = require('../../models/adminMenu')
const bcrypt = require('bcrypt')

const getUser = {
    /* Add user */
    createUser : async (req,res)=>{
        try {
            const {fullname,login ,password } = req.body
            console.log(fullname)
            const a = req.body.role
            const user = new User({fullname, login, role:a,password})
            switch(a) {
                case "jurnalist" :
                user.role = 401
                break;
                case "moderator" :
                user.role = 402
                break;
                case "admin" :
                user.role = 403
                break;
            }
            await user.save()
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
            res.redirect('/create/user')
        }
    },
    createUserPage : async (req,res)=>{
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/profile/index', {
            layout:'./admin_layout', menu, user
        })
    },
    /* Delete user */
    userDelete : async (req,res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.redirect('/dashboard')
    },
    userFind :async (req,res)=>{
        const result = await User.findById(req.params.id).select('-password -login -role')
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/profile/update',{
            layout:'./admin_layout', user, menu, result
        })
    },
    /* User update */
    userUpdate : async (req, res)=>{
        try {
        const {fullname,login ,password,oldpassword  } = req.body
        const a = req.body.role
        const user = await  User.findByIdAndUpdate(req.params.id,{fullname, login})
        switch(a) {
            case "jurnalist" :
            user.role = 401
            break;
            case "moderator" :
            user.role = 402
            break;
            case "admin" :
            user.role = 403
            break;
        }
        if(!bcrypt.compareSync(oldpassword, user.password)){
            return res.redirect(`/user/search/${req.params.id}`)
         }
        user.password = password
        await user.save()
        res.redirect('/dashboard')
        } catch (error) {
            res.json({msg:error.message})
            res.redirect(`/user/search/${req.params.id}`)
        }
    }
}

module.exports = getUser