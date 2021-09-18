const router = require('express').Router()
const {createReclame, allReclame, getReclameById, 
    reclameDelete, reclameUpdate} = require('../controllers/reclameController')
const upload = require('../fileUpload/imageUpload')
const {roles} = require('../middleware/auth')

router.route('/reclame')
    .post(roles,upload.single('image'),createReclame)
    .get(roles,allReclame)
router.route('/reclame/:id')
    .get(roles,getReclameById)
    .delete(roles,reclameDelete)
    .put(roles,upload.single('image'),reclameUpdate)

module.exports = router