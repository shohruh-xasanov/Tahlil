const roles = (req, res, next) => {
    if(req.session.admin){
        if(req.session.admin.role === 101 || 
            req.session.admin.role === 102  ||
            req.session.admin.role === 103){
                next();
          }else{
            return res.render('client/err',{
                layout:false
            })
          }
    }else{
        return res.render('client/err',{
            layout:false
        })
    }
};

module.exports = {roles}