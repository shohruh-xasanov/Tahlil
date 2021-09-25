const router = require('express').Router()
const {menuCreate,menuEdit} = require('../controllers/adminMenuController')
const {roles} = require('../middleware/auth')

router.route('/menu')
    .get(menuCreate)

router.route('/menu/:id')
    .get(roles,menuEdit)

module.exports = router