const multer = require('multer')
const path = require('path')
const md5 = require('md5')
const fs = require('fs')


const store= multer.diskStorage({
    destination:(req, file, cb)=>{
        if(file.fieldname === "poster")
        {
            cb(null, 'public/uploads/poster')
        }
        if(file.fieldname === "images")
        {
            cb(null, 'public/uploads/image')
        }if(file.fieldname === 'image')
        {
            cb(null, 'public/uploads/image')
        }
    },
    filename: (req, file, cb)=>{
        let ext = path.extname(file.originalname)
        if(file.fieldname ==="poster" )
        {
            cb(null,  md5(Date.now()) + ext)
        }
        if(file.fieldname ==="images")
        {
            cb(null,  md5(Date.now()) + ext)
        }if(file.fieldname === 'image')
        {
            cb(null, md5(Date.now()) + ext)
        }
    }
})

var  upload = multer ({
    storage: store,
    limits : {fileSize: 1024 * 1024 * 2}
})

module.exports= upload
