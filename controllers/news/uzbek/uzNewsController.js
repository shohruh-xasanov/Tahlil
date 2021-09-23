const News = require('../../../models/news')
const {sharpFile,sharpFile_unlink, sharpFile_poster} = require('../../../fileUpload/sharp')
const Menu = require('../../../models/adminMenu')
const Category = require('../../../models/category')
const Convert = require('cyrillic-to-latin')
const path = require('path')
const fs = require('fs')

const getNews = {
    /* Create News  */
    createNews : async (req,res)=>{
        try {
            const files = req.files.images
            const image = req.files.poster[0].filename
            const {
                nameuz, titleuz, descriptionuz,descriptionuz1,
                descriptionuz2,descriptionuz3,descriptionuz4,
                descriptionuz5, actual, categoryID, 
                editor, imageInfo, tags} = req.body
            /* image delete */
           
            const min = await sharpFile_unlink(image, 1017, 472)
            const org = await sharpFile_poster(image, 319, 198)
            
            let urls = [];
            if(files) {
                for(let i= 0; i<files.length; i++){
                    const file = await sharpFile(files[i].filename,1017, 472)
                    urls.push({url : file})
                }
            }
            // const convert = transliterate(nameuz)
            const convert = Convert(nameuz).split('ʺ').join('').toString()
            const convert1 = convert.split('-').join(' ').toString()
            const convert2 = convert1.split('\r\n').join(' ').toString()
            const search = convert2.split(' ').join('-').toString()
            const news = new News({
                name:{uz:nameuz},
                title:{uz:titleuz},
                description:{
                uz:descriptionuz,  uz1:descriptionuz1, uz2:descriptionuz2,
                uz3:descriptionuz3, uz4:descriptionuz4, uz5:descriptionuz5,
                },
                poster:{min, org},
                actual, categoryID, 
                editor, imageInfo, tags,
                images:urls, search});
            await news.save()
            res.redirect('/news/uz')
        } catch (error) {
            res.redirect('/create/news/uz')
        }
    },
    /* All news */
    allNews : async (req,res)=>{
        const news = await News.find({['name.uz']:{$gte:0}}).and({ videoLink:undefined })
            .limit(100)
            .sort({createdAt:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
            .populate('categoryID')
        const menu = await Menu.find().limit(1).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/news_uz/index', {
            layout:'admin_layout', news, menu, user
        })
    },
    /* Create news page */
    createNewsPage : async (req,res)=>{
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const category = await Category.find({['name.uz']:{$gte:0}})
        const user = req.session.admin
        res.render('admin/news_uz/createNews', {
            layout:'admin_layout', menu, category,user
        })
    },
    /* Actual news */
    allActualNews : async (req,res)=>{
        const menu = await Menu.find() 
            .limit(1)   
            .sort({createdAt:-1})
            .select(['_id', 'fullname'])
        const user = req.session.admin 
        const news = await News.find({actual: true})
            .limit(100)
            .sort({createdAt:-1})
            .select('-description -images -editor -imageInfo -tags -actual')
            .populate('categoryID')
            res.render('admin/actual/index', {
                layout:'admin_layout', menu, user, 
                news
        })
    },
    /* Edit Actual News */
    editActual : async (req,res)=>{
        const news = await News.findById(req.params.id)
        news.actual = !news.actual
        await news.save()
        res.redirect('/news/actual')
     },
    /* News findById */
    getNewsById : async (req,res)=>{
        const result = await News.findById(req.params.id)
            .populate('categoryID')
        const menu = await Menu.find()
            .limit(1)
            .sort({createdAt:-1})
        const category = await Category.find()
        const user = req.session.admin
        res.render('admin/updateNews/index', {
            layout:'admin_layout', menu, category
            , user, result
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
        res.redirect('/news/uz')
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
            nameuz, titleuz, descriptionuz,descriptionuz1,
            descriptionuz2,descriptionuz3,descriptionuz4,
            descriptionuz5,actual, categoryID, 
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
        const convert = Convert(nameuz).split('ʺ').join('').toString()
        const convert1 = convert.split('-').join(' ').toString()
        const convert2 = convert1.split('\r\n').join(' ').toString()
        const search = convert2.split(' ').join('-').toString()
        
        await News.findByIdAndUpdate({_id:news._id}, {
            name:{uz:nameuz},
            title:{uz:titleuz},
            description:{
                uz:descriptionuz,  uz1:descriptionuz1, uz2:descriptionuz2,
                uz3:descriptionuz3, uz4:descriptionuz4, uz5:descriptionuz5,
            },
            poster:{min, org},
            actual, categoryID, 
            editor, imageInfo, tags,
            images:urls, search})
        res.redirect('/news/uz')
       } catch (error) {
           res.redirect(`/news/update/${news._id}`)
       }
    }
}


module.exports = getNews