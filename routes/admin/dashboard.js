const router = require('express').Router()
const {dashboart} = require('../../controllers/admin/dashboard')
const {roles} = require('../../middleware/auth')

router.route('/dashboard')
    .get(roles,dashboart)

module.exports = router 