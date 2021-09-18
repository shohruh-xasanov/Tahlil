const router = require('express').Router()
const {
    createAbout, getAbout, getAboutById,
    aboutDelete, aboutUpdate} = require('../controllers/aboutController')
const {roles} = require('../middleware/auth')

router.route('/about')
    .post(roles,createAbout)
    .get(roles,getAbout)

router.route('/about/:id')
    .get(roles,getAboutById)
    .delete(roles,aboutDelete)
    .put(roles,aboutUpdate)

module.exports = router