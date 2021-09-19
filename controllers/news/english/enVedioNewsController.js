const News = require('../../../models/news')
const {sharpFile,sharpFile_unlink, sharpFile_poster} = require('../../../fileUpload/sharp')
const Menu = require('../../../models/adminMenu')
const Category = require('../../../models/category')
const Convert = require('cyrillic-to-latin')
const path = require('path')
const fs = require('fs')

const getVedioNews = {
    /* Create Vedio News */
    createNewsEn : async (req,res)=>{
        try {
            const files = req.files.images
            const image = req.files.poster[0].filename
            const {
                nameeng, titleeng, descriptionen,descriptionen1,
                descriptionen2,descriptionen3,descriptionen4,
                descriptionen5,
                actual, categoryID, videoLink,
                editor, imageInfo, tags} = req.body
            
            const min = await sharpFile_unlink(image, 1017, 472)
            const org = await sharpFile_poster(image, 319, 198)
            let urls = [];
            if(files) {
                for(let i= 0; i<files.length; i++){
                    const file = await sharpFile(files[i].filename,1017, 472)
                    urls.push({url : file})
                }
            }
            const convert = Convert(nameeng).split('ʺ').join('').toString()
            const convert1 = convert.split('-').join(' ').toString()
            const convert2 = convert1.split('\r\n').join(' ').toString()
            const search = convert2.split(' ').join('-').toString()

            const news = new News({
                name:{eng:nameeng},
                title:{eng:titleeng},
                description:{
                    eng:descriptionen,  eng1:descriptionen1, eng2:descriptionen2,
                    eng3:descriptionen3, eng4:descriptionen4, eng5:descriptionen5,
                },
                poster:{min, org},
                actual, categoryID, 
                editor, imageInfo, tags,
                images:urls,videoLink, search});
            
            await news.save()
            res.redirect('/videonews/en')
        } catch (error) {
            res.redirect('/create/videonews/en')
        }
    },
    /* All News */
    allNewsEng : async (req,res)=>{
        const news = await News.find({['name.eng']:{$gte:0}}).and({ videoLink: { $gte: 0 } })
            .limit(100)
            .sort({createdAt:-1})
            .populate('categoryID')
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/vedio_news_eng/index', {
            layout:'admin_layout', news, menu, user
        })
    },
    /* Create Vedio News Page */
    createNewsPageEng : async (req,res)=>{
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const category = await Category.find({['name.eng']:{$gte:0}})
        const user = req.session.admin
        res.render('admin/vedio_news_eng/createNews', {
            layout:'admin_layout', menu, category,user
        })
    },
    /* Delete News */
    newsDelete : async (req,res)=>{
        const news  = await News.findById(req.params.id)
        if(news.poster){
            fs.unlink(path.join(path.dirname(__dirname) + news.poster.min), (error) => {
                if (error) {
                  return
                }
            });
            fs.unlink(path.join(path.dirname(__dirname) + news.poster.org), (error) => {
                if (error) {
                  return
                }
            });
        }
        if(news.images){
            for(let i=0; i<news.images.length; i++){
                fs.unlink(path.join(path.dirname(__dirname) + news.images[i].url), (error) => {
                    if (error) {
                      return
                    }
                });
            }
        }
        await News.findByIdAndDelete({_id:news._id})
        res.redirect('/videonews/en')
    },
    /* Update News */
    updateNews : async (req,res)=>{
       try {
        const news  = await News.findById(req.params.id)
        if(news.poster){
            fs.unlink(path.join(path.dirname(__dirname) + news.poster.min), (error) => {
                if (error) {
                  return
                }
            });
            fs.unlink(path.join(path.dirname(__dirname) + news.poster.org), (error) => {
                if (error) {
                  return
                }
            });
        }
        if(news.images){
            for(let i=0; i<news.images.length; i++){
                fs.unlink(path.join(path.dirname(__dirname) + news.images[i].url), (error) => {
                    if (error) {
                      return
                    }
                });
            }
        }
        const files = req.files.images
        const image = req.files.poster[0].filename
        const {
            nameeng, titleeng, descriptionen,descriptionen1,
            descriptionen2,descriptionen3,descriptionen4,
            descriptionen5,
            actual, categoryID, videoLink,
            editor, imageInfo, tags} = req.body
       
        const min = await sharpFile_unlink(image, 1017, 472)
        const org = await sharpFile_poster(image, 319, 198)
            
        let urls = [];
        if(files) {
            for(let i= 0; i<files.length; i++){
                const file = await sharpFile(files[i].filename,1017, 472)
                urls.push({url : file})
            }
        }
        const convert = Convert(nameeng).split('ʺ').join('').toString()
        const convert1 = convert.split('-').join(' ').toString()
        const convert2 = convert1.split('\r\n').join(' ').toString()
        const search = convert2.split(' ').join('-').toString()

        await News.findByIdAndUpdate({_id:news._id}, {
            name:{eng:nameeng},
            title:{eng:titleeng},
            description:{
                eng:descriptionen,  eng1:descriptionen1, eng2:descriptionen2,
                eng3:descriptionen3, eng4:descriptionen4, eng5:descriptionen5,
            },
            poster:{min, org},
            actual, categoryID, 
            editor, imageInfo, tags,
            images:urls, videoLink, search})
        res.redirect('/videonews/en')
       } catch (error) {
           res.redirect(`/videonews/update/${news._id}`)
       }
    }
}
module.exports = getVedioNews