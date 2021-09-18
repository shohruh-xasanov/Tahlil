const router = require('express').Router()
const {createCategory, getCategory,
    getAboutById, aboutDelete, aboutUpdate} = require('../controllers/categoryController')
const {roles} = require('../middleware/auth')

router.route('/category')
    .post(roles,createCategory)
    .get(roles,getCategory)

router.route('/category/:id')
    .get(roles,getAboutById)
    .delete(roles,aboutDelete)
    .put(roles,aboutUpdate)

module.exports = router