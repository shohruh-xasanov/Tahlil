const router = require('express').Router()
const {createRek,allRec, reclameDelete} = require('../controllers/recController')
const upload = require('../fileUpload/pdfUpload')
const {roles} = require('../middleware/auth')

router.route('/sendrec')
    .post(upload.single('file'),createRek)
    .get(roles,allRec)

router.delete('/sendrec/:id', reclameDelete)

module.exports = router