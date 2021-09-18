const User = require('../../models/user')

exports.login = async (req,res,next)=>{
    try {
        const {login, password} = req.body
    if (!login && !password) {
      res.redirect("/api/auth/login");
    }
    await User.findOne({login}).then((user)=>{
        if(!user){
                return res.render('admin/login/index',{
                    layout:'./admin/login/layout', data:"Parol yoki login xato"
                })
            } user.matchPassword(password, (err, isMatch)=>{
                if(err){
                   return res.render('admin/login/index',{
                    layout:'./admin/login/layout', data:"Parol yoki login xato"
                })
                }
                if (!isMatch) {
                   return res.render('admin/login/index',{
                    layout:'./admin/login/layout', data:"Parol yoki login xato"
                })
                  }else{
                      let data = 0
                    switch(user.role) {
                        case 401 :
                            data= 101
                        break;
                        case 402 :
                            data = 102
                        break;
                        case 403 :
                            data = 103
                        break;
                    }
                      req.session.admin = data={role:data, id:user._id}
                      req.session.save()
                      res.redirect('/dashboard')
                  }
            });
    })
    } catch (error) {
        res.redirect('/api/auth/login')
    }
}

exports.getLogin = async (req,res)=>{
    res.render('admin/login/index',{
        layout:'./admin/login/layout'
    })
}

exports.logout = async (req,res,next)=>{
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect('/api/auth/login')
}