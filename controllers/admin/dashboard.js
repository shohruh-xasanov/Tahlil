const User = require('../../models/user')
const Menu = require('../../models/adminMenu')
const News = require('../../models/news')
const Visit = require('../../models/statistics')

const dashboart = {
    dashboart : async (req,res)=>{
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const users = await User.find().select('-password -login')
        for(let i=0; i<users.length; i++){
            switch(users[i].role) {
                case 401 :
                users[i].role = 101
                break;
                case 402 :
                users[i].role = 102
                break;
                case 403 :
                users[i].role = 103
                break;
            }
        }
        const news = await News.find().countDocuments() 
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const month = await News.find({ 
            createdAt:{$gte: new Date().setDate(new Date().getDate()-30)} }).countDocuments() 
        const week = await News.find({ 
            createdAt:{$gte: new Date().setDate(new Date().getDate()-7)} }).countDocuments() 
        const day = await News.find({ 
            createdAt:{$gte: new Date().setDate(new Date().getDate()-1)} }).countDocuments()   
        const monthvisit = await Visit.find({
            message:'GET',
            createdAt:{$gte: new Date().setDate(new Date().getDate()-30)} }).countDocuments() 
        const weekvisit = await Visit.find({ 
            message:'GET',
            createdAt:{$gte: new Date().setDate(new Date().getDate()-7)} }).countDocuments() 
        const dayvisit = await Visit.find({ 
            message:'GET',
            createdAt:{$gte: new Date().setDate(new Date().getDate()-1)} }).countDocuments()  
        await Visit.deleteMany({
            createdAt:{$lt: new Date().setDate(new Date().getDate()-30)} }) 
        const user = req.session.admin
        res.render('admin/dashboard', {
            layout:'./admin_layout',
            user, menu, users, news,month, 
            week,user,day,monthvisit,weekvisit,dayvisit
        })
    }
}
module.exports = dashboart