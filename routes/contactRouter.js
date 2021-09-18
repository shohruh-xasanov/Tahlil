const router = require('express').Router()
const {createContact, allContact} = require('../controllers/contactController')
const {roles} = require('../middleware/auth')

router.route('/contact')
    .post(createContact)
    .get(roles,allContact)

module.exports = router