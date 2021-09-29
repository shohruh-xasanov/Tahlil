const router = require('express').Router()
const {mainMenu, getReclame, getContact, getabout, changelanguage} = require('../../controllers/client/index')
const {getNews ,getNewsById, bestNews, lastNews, videoNews, photoNews} = require('../../controllers/client/findNews')
const {changeuz} = require('../../middleware/lang')


router.get('/',changeuz, mainMenu)
router.get('/uz/changelang', changelanguage)
router.get('/news/category/:name', getNews)
router.get('/news/name/:name', getNewsById)
router.get('/news/videos', videoNews)
router.get('/news/photos', photoNews)
router.get('/news/mostseen/24', bestNews)
router.get('/reclame/tahlil/24', getReclame)
router.get('/contact/tahlil/24', getContact)
router.get('/about/tahlil/24', getabout)
router.get('/news/lastnews/24',lastNews)

module.exports = router