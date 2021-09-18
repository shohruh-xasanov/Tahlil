const Category = require('../models/category')
const Menu = require('../models/adminMenu')
const News = require('../models/news')
const Convert = require('cyrillic-to-latin')
const fs = require('fs')
const path = require('path')

const getCategory = {
    createCategory : async (req,res)=>{
        try {
            const {uz,ru,eng} = req.body
            const convert = Convert(uz).split('ʺ').join('').toString()
            const convert1 = convert.split('-').join(' ').toString()
            const search = convert1.split(' ').join('-').toString()
            const convertru = Convert(ru).split('ʺ').join('').toString()
            const convertru1 = convertru.split('-').join(' ').toString()
            const searchru = convertru1.split(' ').join('-').toString()
            const converten = Convert(eng).split('ʺ').join('').toString()
            const converten1 = converten.split('-').join(' ').toString()
            const searchen = converten1.split(' ').join('-').toString()
            let category =0
            if(uz.length>1&&ru.length>1&&eng.length>1){
                category = new Category({name:{uz, ru, eng},search,searchru,searchen})
                await category.save()
                console.log('1')
            }
            if(uz.length>1&&ru.length>1&&eng.length<1){
                 category = new Category({name:{uz, ru},search,searchru})
                 await category.save()
                 console.log('2')
            }
            if(uz.length<1&&ru.length>1&&eng.length>1){
                 category = new Category({name:{eng, ru},searchru,searchen})
                 await category.save()
                 console.log('3')
            }
            if(uz.length>1&&ru.length<1&&eng.length>1){
                 category = new Category({name:{uz, eng},search,searchen})
                 await category.save()
                 console.log('4')
            }
            if(uz.length>1&&ru.length<1&&eng.length<1){
                 category = new Category({name:{uz},search})
                 await category.save()
                 console.log('5')
            }
            if(uz.length<1&&ru.length>1&&eng.length<1){
                 category = new Category({name:{ru},searchru})
                 await category.save()
                 console.log('6')
            }
            if(uz.length<1&&ru.length<1&&eng.length>1){
                 category = new Category({name:{eng},searchen})
                 await category.save()
                 console.log('7')
            }
            console.log(category)
            res.redirect('/category')
        } catch (error) {
            // res.redirect('/category')
            res.json({msg:error.message})
        }
    },
    getCategory : async (req,res)=>{
        const category =await Category.find().sort({createdAt:-1}).limit(100)
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/category/index', {
            layout:'admin_layout',
            category,user,menu
        })
    },
    getAboutById : async (req,res)=>{
        const result = await Category.findById(req.params.id)
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/category/update',{
            layout:'admin_layout', result, menu, user
        })
    },
    aboutDelete : async(req,res)=>{
        const {id} = req.params
        await Category.deleteMany({_id:id})
        const news = await News.find({categoryID:id})
        for(let a=0; a<news.length; a++){
        if(news[a].images){
        for(let i=0; i<news[a].images.length; i++){
                fs.unlink(path.join(path.dirname(__dirname) + news[a].images[i].url), (error) => {
                    if (error) {
                     return
                }
            });
        }
        }
        fs.unlink(path.join(path.dirname(__dirname) + news[a].poster.org), (error) => {
            if (error) {
              return
            }
        });
        fs.unlink(path.join(path.dirname(__dirname) + news[a].poster.min), (error) => {
            if (error) {
              return
            }
        });
        }
        await News.deleteMany({categoryID:id}).then((data)=>{
            console.log(data)
        })
        res.redirect('/category')
    },
    aboutUpdate : async (req,res)=>{
        const {id} = req.params
        try {
            const {uz,ru,eng} = req.body
            const about = await Category.findByIdAndUpdate({_id:id}, {name:{uz, ru, eng}})
            await about.save()
            res.redirect('/category')
        } catch (error) {
            res.redirect(`/category/${id}`)
        }
    }
}

module.exports = getCategory