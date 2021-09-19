const router = require('express').Router()
const {mainMenu, getReclame, getContact, getabout, changelanguage} = require('../../controllers/clienten/index')
const {getNews ,getNewsById, bestNews, lastNews,videoNews,photoNews} = require('../../controllers/clienten/findNews')
const {visits} = require('../../middleware/visit')
const {changeen} = require('../../middleware/lang')


router.get('/', visits,changeen, mainMenu)
router.get('/changelang', changelanguage)
router.get('/news/category/:name',visits, getNews)
router.get('/news/name/:name',visits, getNewsById)
router.get('/news/mostseen/24',visits, bestNews)
router.get('/news/videos',visits, videoNews)
router.get('/news/photos',visits, photoNews)
router.get('/reclame/tahlil/24',visits, getReclame)
router.get('/contact/tahlil/24',visits, getContact)
router.get('/about/tahlil/24',visits, getabout)
router.get('/news/lastnews/24',visits, lastNews)

module.exports = router
