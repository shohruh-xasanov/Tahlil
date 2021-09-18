const multer=require('multer')
const path= require('path')

const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/uploads/pdf')
    },
    filename: (req, file, cb)=>{
        cb(null,  file.originalname)
    }
})


const  upload = multer ({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        let ext= path.extname(file.originalname)
        if(
            ext == '.pdf'
        ){
            cb(null, true)
        }else{
            res.status(500).json({msg: "Qo'llab-quvvatlanmaydigan fayl turi"})
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

module.exports= upload