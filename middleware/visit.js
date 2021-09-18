const Visit = require('../models/statistics')

exports.visits = async (req,res, next)=>{
    const visit = new Visit({
        message:req.method
    })
    await visit.save()
    next()
}
