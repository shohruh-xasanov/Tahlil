const router = require('express').Router()
const {mainMenu, getReclame, getContact, getabout, changelanguage} = require('../../controllers/client/index')
const {getNews ,getNewsById, bestNews, lastNews} = require('../../controllers/client/findNews')
const {changeuz} = require('../../middleware/lang')
const {visits} = require('../../middleware/visit')


router.get('/', visits,changeuz, mainMenu)
router.get('/uz/changelang', changelanguage)
router.get('/news/category/:name',visits, getNews)
router.get('/news/name/:name',visits, getNewsById)
router.get('/news/mostseen/24',visits, bestNews)
router.get('/reclame/tahlil/24',visits, getReclame)
router.get('/contact/tahlil/24',visits, getContact)
router.get('/about/tahlil/24',visits, getabout)
router.get('/news/lastnews/24',visits, lastNews)

module.exports = router