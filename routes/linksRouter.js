const router = require('express').Router()
const {createLinks, allLinks, getLinksById,
       linkUpdate, linkDelete} = require('../controllers/links')
const {roles} = require('../middleware/auth')

router.route('/links')
    .post(roles,createLinks)
    .get(roles,allLinks)

router.route('/links/:id')
    .get(roles,getLinksById)
    .delete(roles,linkDelete)
    .put(roles,linkUpdate)

module.exports = router