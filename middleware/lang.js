const language = {
    changeuz : async (req,res,next)=>{
        lang = req.session.lang;
        if(lang === 'uz' || lang === undefined){
            next()
        }
        if(lang === 'ru'){
            return res.redirect('/ru')
        }
        if(lang === 'en'){
            return res.redirect('en')
        }
    },
    changeru : async (req,res,next)=>{
        lang = req.session.lang;
        if(lang === 'ru' || lang === undefined){
            next()
        }
        if(lang === 'uz'){
            return res.redirect('/')
        }
        if(lang === 'en'){
            return res.redirect('en')
        }
    },
    changeen : async (req,res,next)=>{
        lang = req.session.lang;
        if(lang === 'en' || lang === undefined){
            next()
        }
        if(lang === 'ru'){
            return res.redirect('/ru')
        }
        if(lang === 'uz'){
            return res.redirect('/')
        }
    }
}
module.exports = language