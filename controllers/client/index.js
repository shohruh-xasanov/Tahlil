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
      ["name.uz"]: { $gte: 0 },
      createdAt:{$gte: twoday} })
      .sort({ seen: -1 })
      .limit(5)
      .select('-description -images -editor -imageInfo -tags -actual')
    const lastnews = await News.find({ ["name.uz"]: { $gte: 0 } })
      .sort({ createdAt: -1 })
      .limit(4)
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const actual = await News.find({ ["name.uz"]: { $gte: 0 } }).and({actual:true})
      .sort({ createdAt: -1 })
      .limit(6)
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const reclame = await Reclame.find().sort({ createdAt: -1 }).limit(1)
    const video = await News.find({ ["name.uz"]: { $gte: 0 } }).and({ videoLink: { $gte: 0 } })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const photo = await News.find({ ["name.uz"]: { $gte: 0 } }).and({ videoLink:undefined })
      .sort({ createdAt: 1 })
      .limit(3)
      .select('-description -images -editor -imageInfo -tags -actual')
      .populate("categoryID");
    const category = await Category.find({['name.uz']:{$gte:0}}).limit(7);
    const links = await Links.find().limit(1).sort({ createdAt: -1 });
    const id1 = category[0]._id
    const id2 = category[1]._id
    const newsCat1 = await News.find({categoryID: id1}).and({ ["name.uz"]: { $gte: 0 } })
    .select('-description -images -editor -imageInfo -tags -actual').sort({createdAt:-1}).limit(6).populate('categoryID')
    const newsCat2 = await News.find({categoryID: id2}).and({ ["name.uz"]: { $gte: 0 } })
    .select('-description -images -editor -imageInfo -tags -actual').sort({createdAt:-1}).limit(8).populate('categoryID')
    res.render("client/index", {
      title:'Tahlil24.uz интернет нашри',
      layout: "./client_layout",
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
    res.render('client/reclame', {
      title:'Реклама',
      layout:'./client_layout', links
    })
  },
  getContact : async (req,res)=>{
    const links = await Links.find().limit(1).sort({createdAt:-1})
    res.render('client/contact', {
      title: 'Алоқа',
      layout:'./client_layout', links
    })
  },
  getabout : async (req,res)=>{
    const links = await Links.find().limit(1).sort({createdAt:-1})
    const about = await About.find().limit(1).sort({createdAt:-1})
    res.render('client/about', {
      title:'Сайт ҳақида',
      layout:'./client_layout', links, about
    }) 
  },
  changelanguage : async (req,res,next)=>{
    req.session.lang = 'uz'
    res.redirect('/')
  }
};
module.exports = getMain;
