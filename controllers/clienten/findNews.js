const News = require("../../models/news");
const Category = require("../../models/category");
const Links = require("../../models/links");

const findNews = {
    getNews : async (req,res)=>{
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}}).limit(7)
        const category1 = await Category.findOne({searchen: req.params.name})
        const id = category1._id
        const news = await News.find({categoryID: id}).and({ ["name.eng"]: { $gte: 0 }})
            .sort({createdAt:-1}).populate('categoryID').limit(40)
            .select('-description -images -editor -imageInfo -tags -actual')
        const lastNews = await News.find({ ["name.eng"]: { $gte: 0 } }).sort({createdAt:-1}).limit(8)
            .select('-description -images -editor -imageInfo -tags -actual')
            return res.render('clienten/category', {
            title:category1.name.eng +' news',
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
        .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}}).limit(7)
        const newsbycategory = await News.find({categoryID:news.categoryID._id}).and({["name.eng"]: { $gte: 0 }})
        .select('-description -images -editor -imageInfo -tags -actual')
            .limit(4).populate('categoryID').sort({createdAt:-1})
            return res.render('clienten/single_page', {
            title:news.name.eng,
            layout:'./client_layouten', news, best, links,
            category, newsbycategory
        })
    },
    bestNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const news = await News.find({ 
            ["name.eng"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(40).sort({seen:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}}).limit(7)
        const lastNews = await News.find({ 
            ["name.eng"]: { $gte: 0 }}).sort({createdAt:-1}).limit(8)
            .select('-description -images -editor -imageInfo -tags -actual')
            return res.render('clienten/category', {
            title:'Popular news',
            layout:'./client_layouten', news, lastNews, category,
            links, data:'?????? ?????? ??????????????'
        })
    },
    lastNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-2)

        const news = await News.find({ 
            ["name.eng"]: { $gte: 0 }}).limit(40).sort({createdAt:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}}).limit(7)
        const best = await News.find({ 
            ["name.eng"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
            return res.render('clienten/category', {
            title:'Latest news',
            layout:'./client_layouten', news, best, category,
            links, data:'?????????? ????????????????'
        })
    },
    
    videoNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-2)

        const news = await News.find({ 
            ["name.eng"]: { $gte: 0 }}).and({ videoLink: { $gte: 0 } }).limit(40).sort({createdAt:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}}).limit(7)
        const best = await News.find({ 
            ["name.eng"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
            return res.render('clienten/category', {
            title:'Video news',
            layout:'./client_layouten', news, best, category,
            links, data:'?????????? ????????????????',
        })
    },
    photoNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-2)

        const news = await News.find({ 
            ["name.eng"]: { $gte: 0 }}).and({ videoLink: undefined }).limit(40).sort({createdAt:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}}).limit(7)
        const best = await News.find({ 
            ["name.eng"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
            return res.render('clienten/category', {
            title:'Photo news',
            layout:'./client_layouten', news, best, category,
            links, data:'?????????? ??????????????'
        })
    }
}

module.exports = findNews