const News = require("../../models/news");
const Category = require("../../models/category");
const Reclame = require("../../models/reclame");
const Links = require("../../models/links");

const findNews = {
    getNews : async (req,res)=>{
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}}).limit(7)
        const category1 = await Category.findOne({search: req.params.name})
        const id = category1._id
        const news = await News.find({categoryID: id}).and({ ["name.uz"]: { $gte: 0 }})
            .sort({createdAt:-1}).populate('categoryID').limit(40)
            .select('-description -images -editor -imageInfo -tags -actual')
        const lastNews = await News.find({ ["name.uz"]: { $gte: 0 } }).sort({createdAt:-1}).limit(8)
        .select('-description -images -editor -imageInfo -tags -actual')
        res.render('client/category', {
            title:category1.name.uz +' янгиликлари',
            layout:'./client_layout', news, lastNews, category,links
        })
    },
    getNewsById : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-2)
        const name = req.params.name
        const news = await News.findOne({search: name}).populate('categoryID')
        const seen = parseInt(news.seen) +1
        await News.findByIdAndUpdate({_id:news._id}, {seen})
        const best = await News.find({ 
      ["name.uz"]: { $gte: 0 },
      createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}}).limit(7)
        const newsbycategory = await News.find({categoryID:news.categoryID._id}).and({["name.uz"]: { $gte: 0 }})
            .select('-description -images -editor -imageInfo -tags -actual')
            .limit(4).populate('categoryID').sort({createdAt:-1})
        res.render('client/single_page', {
            title:news.name.uz,
            layout:'./client_layout', news, best, links,
            category, newsbycategory
        })
    },
    bestNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const news = await News.find({ 
            ["name.uz"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(40).sort({seen:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}}).limit(7)
        const lastNews = await News.find({ 
            ["name.uz"]: { $gte: 0 }}).sort({createdAt:-1}).limit(8)
            .select('-description -images -editor -imageInfo -tags -actual')
        res.render('client/category', {
            title:'Энг кўп ўқилган',
            layout:'./client_layout', news, lastNews, category,
            links, data:'Энг кўп ўқилган'
        })
    },
    lastNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const news = await News.find({ 
            ["name.uz"]: { $gte: 0 }}).limit(40).sort({createdAt:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}}).limit(7)
        
        const best = await News.find({ 
            ["name.uz"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
        res.render('client/category', {
            title:'Сўнги хабарлар',
            layout:'./client_layout', news, best, category,
            links, data:'Сўнги хабарлар'
        })
    },
    
    videoNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const news = await News.find({ 
            ["name.uz"]: { $gte: 0 }}).and({ videoLink: { $gte: 0 } }).limit(40).sort({createdAt:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}}).limit(7)
        
        const best = await News.find({ 
            ["name.uz"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
        res.render('client/category', {
            title:'Сўнги хабарлар',
            layout:'./client_layout', news, best, category,
            links, data:'Барча видеолар'
        })
    },
    photoNews : async (req,res)=>{
        let twoday = new Date()
        twoday.setDate(twoday.getDate()-7)
        const news = await News.find({ 
            ["name.uz"]: { $gte: 0 }}).and({ videoLink:undefined }).limit(40).sort({createdAt:-1}).populate('categoryID')
            .select('-description -images -editor -imageInfo -tags -actual')
        const links = await Links.find().limit(1).sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}}).limit(7)
        
        const best = await News.find({ 
            ["name.uz"]: { $gte: 0 },
            createdAt:{$gte: twoday} }).limit(6).sort({seen:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
        res.render('client/category', {
            title:'Сўнги хабарлар',
            layout:'./client_layout', news, best, category,
            links, data:'Барча фотолар'
        })
    }
}

module.exports = findNews