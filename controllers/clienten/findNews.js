const News = require("../../models/news");
const Category = require("../../models/category");
const Reclame = require("../../models/reclame");
const Links = require("../../models/links");

const findNews = {
    getNews : async (req,res)=>{
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find().limit(7)
        const category1 = await Category.findOne({searchen: req.params.name})
        const id = category1._id
        const news = await News.find({categoryID: id}).and({ ["name.eng"]: { $gte: 0 }})
            .sort({createdAt:-1}).populate('categoryID').limit(30)
        const lastNews = await News.find({ ["name.eng"]: { $gte: 0 } }).sort({createdAt:-1}).limit(8)
        res.render('clienten/category', {
            layout:'./client_layouten', news, lastNews, category,links
        })
    },
    getNewsById : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-2)

        const news = await News.findOne({search:req.params.name}).populate('categoryID')
        const seen = parseInt(news.seen) +1
        await News.findByIdAndUpdate({_id:news._id}, {seen})
        const best = await News.find({ 
      ["name.eng"]: { $gte: 0 },
      createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find().limit(7)
        const newsbycategory = await News.find({categoryID:news.categoryID._id}).and({["name.eng"]: { $gte: 0 }})
            .limit(4).populate('categoryID').sort({createdAt:-1})
        res.render('clienten/single_page', {
            layout:'./client_layouten', news, best, links,
            category, newsbycategory
        })
    },
    bestNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const news = await News.find({ 
            ["name.eng"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(30).sort({seen:-1}).populate('categoryID')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find().limit(7)
        const lastNews = await News.find({ 
            ["name.eng"]: { $gte: 0 }}).sort({createdAt:-1}).limit(8)
        res.render('clienten/category', {
            layout:'./client_layouten', news, lastNews, category,
            links, data:'Энг кўп ўқилган'
        })
    },
    lastNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-2)

        const news = await News.find({ 
            ["name.eng"]: { $gte: 0 }}).limit(30).sort({createdAt:-1}).populate('categoryID')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find().limit(7)
        const best = await News.find({ 
            ["name.eng"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
        res.render('clienten/category', {
            layout:'./client_layouten', news, best, category,
            links, data:'Сўнги хабарлар'
        })
    }
}

module.exports = findNews