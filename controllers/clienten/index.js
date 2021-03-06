const News = require("../../models/news");
const Category = require("../../models/category");
const Reclame = require("../../models/reclame");
const Links = require("../../models/links");
const About = require('../../models/about')

const getMain = {
  mainMenu: async (req, res) => {
    let twoday = new Date()
    twoday.setDate(twoday.getDate()-2)
    const seen = await News.find({ 
      ["name.eng"]: { $gte: 0 },
      createdAt:{$gte: twoday} })
      .limit(5)
      .select('-description -images -editor -imageInfo -tags -actual')
      .sort({ seen: -1 });
    const lastnews = await News.find({['name.eng']:{$gte:0}})
      .limit(4)
      .sort({ createdAt: -1 })
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const actual = await News.find({['name.eng']:{$gte:0}}).and({actual:true})
      .limit(6)
      .sort({ createdAt: -1 })
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const reclame = await Reclame.find().limit(2).sort({ createdAt: -1 });
    const video = await News.find({['name.eng']:{$gte:0}}).and({ videoLink: { $gte: 0 } })
      .limit(3)
      .sort({ createdAt: -1 })
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const photo = await News.find({['name.eng']:{$gte:0}}).and({ videoLink:undefined })
      .limit(3)
      .sort({ createdAt: 1 })
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const category = await Category.find({['name.eng']:{$gte:0}}).limit(7);
    const links = await Links.find().limit(1).sort({ createdAt: -1 });
    const id1 = category[0]._id
    const id2 = category[1]._id
    const newsCat1 = await News.find({categoryID: id1}).and({ ["name.eng"]: { $gte: 0 } })
    .select('-description -images -editor -imageInfo -tags -actual').sort({createdAt:-1}).limit(6).populate('categoryID')
    const newsCat2 = await News.find({categoryID: id2}).and({ ["name.eng"]: { $gte: 0 } })
    .select('-description -images -editor -imageInfo -tags -actual').sort({createdAt:-1}).limit(8).populate('categoryID')
    return res.render("clienten/index", {
      layout: "./client_layouten",
      title:'Tahlil24.uz internet edition',
      seen,
      lastnews,
      actual,
      reclame,
      video,
      photo,
      category,
      links,
      newsCat1,
      newsCat2
    });
  },
  getReclame : async (req,res)=> {
    const links = await Links.find().limit(1).sort({createdAt:-1})
    return res.render('clienten/reclame', {
      title:'Reclame',
      layout:'./client_layouten', links
    })
  },
  getContact : async (req,res)=>{
    const links = await Links.find().limit(1).sort({createdAt:-1})
    return res.render('clienten/contact', {
      title:'Contact us',
      layout:'./client_layouten', links
    })
  },
  getabout : async (req,res)=>{
    const links = await Links.find().limit(1).sort({createdAt:-1})
    const about = await About.find().limit(1).sort({createdAt:-1})
    return res.render('clienten/about', {
      title:'About us',
      layout:'./client_layouten', links, about
    }) 
  },
  changelanguage : async (req,res,next)=>{
    req.session.lang = 'en'
    return res.redirect('/en')
  }
};
module.exports = getMain;