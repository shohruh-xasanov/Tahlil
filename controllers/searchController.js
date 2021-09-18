const News = require('../models/news')
const Menu = require('../models/adminMenu')
const Links = require('../models/links')

exports.searchNews = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.name)
    const news = await News.find().or([
        {['name.uz']:{ $regex: searchExpression_name, $options: 'i'}},
        {['name.ru']:{ $regex: searchExpression_name, $options: 'i'}},
        {['name.eng']:{ $regex: searchExpression_name, $options: 'i'}}
    ])
    .populate('categoryID')
    const user = req.session.admin
    const menu = await Menu.find().limit(1).sort({createdAt:-1})
    res.render("admin/search/index", {
        layout: "./admin_layout", user, news, menu
    });
}
exports.searchNewsclient = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.search)
    let search = req.query.search
    const links = await Links.find().limit(1)
    const  news = await News.find().or([
        {['name.uz']:{ $regex: searchExpression_name, $options: 'i'}}
    ]).populate('categoryID').limit(9)
    const lastNews = await News.find({['name.uz']:{$gte:0}}).limit(5).sort({createdAt:-1})
    res.render("client/searchnews", {
        layout: "./client_layout", news, lastNews, search,links
    });
}
exports.searchNewsclienten = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.search)
    let search = req.query.search
    const links = await Links.find().limit(1)
    const  news = await News.find().or([
        {['name.en']:{ $regex: searchExpression_name, $options: 'i'}}
    ]).populate('categoryID').limit(9)
    const lastNews = await News.find({['name.eng']:{$gte:0}}).limit(5).sort({createdAt:-1})
    res.render("clienten/searchnews", {
        layout: "./client_layout", news, lastNews, search,links
    });
}
exports.searchNewsclientru = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.search)
    let search = req.query.search
    const links = await Links.find().limit(1)
    const  news = await News.find().or([
        {['name.ru']:{ $regex: searchExpression_name, $options: 'i'}}
    ]).populate('categoryID').limit(9)
    const lastNews = await News.find({['name.ru']:{$gte:0}}).limit(5).sort({createdAt:-1})
    res.render("clientru/searchnews", {
        layout: "./client_layout", news, lastNews, search,links
    });
}

exports.searchNewstags = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.search)
    let search = req.query.search
    const links = await Links.find().limit(1)
    const  news = await News.find().or([
        {tags:{ $regex: searchExpression_name, $options: 'i'}}
    ]).populate('categoryID').limit(9)
    const lastNews = await News.find({['name.uz']:{$gte:0}}).limit(5).sort({createdAt:-1})
    res.render("client/searchnews", {
        layout: "./client_layout", news, lastNews, search,links
    });
}
exports.searchNewstagsen = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.search)
    let search = req.query.search
    const links = await Links.find().limit(1)
    const  news = await News.find().or([
        {tags:{ $regex: searchExpression_name, $options: 'i'}}
    ]).populate('categoryID').limit(9)
    const lastNews = await News.find({['name.eng']:{$gte:0}}).limit(5).sort({createdAt:-1})
    res.render("clienten/searchnews", {
        layout: "./client_layout", news, lastNews, search,links
    });
}
exports.searchNewstagsru = async(req,res)=>{
    let searchExpression_name = new RegExp(req.query.search)
    let search = req.query.search
    const links = await Links.find().limit(1)
    const  news = await News.find().or([
        {tags:{ $regex: searchExpression_name, $options: 'i'}}
    ]).populate('categoryID').limit(9)
    const lastNews = await News.find({['name.ru']:{$gte:0}}).limit(5).sort({createdAt:-1})
    res.render("clientru/searchnews", {
        layout: "./client_layout", news, lastNews, search,links
    });
}