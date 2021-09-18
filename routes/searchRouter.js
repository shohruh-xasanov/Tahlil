const router = require('express').Router()
const {searchNewsclient,searchNewsclientru, searchNewsclienten, searchNews,
    searchNewstags, searchNewstagsen, searchNewstagsru} = require('../controllers/searchController')
const {roles} = require('../middleware/auth')

router.route('/news/all/search')
    .get(roles,searchNews)
router.get('/news/search', searchNewsclient)
router.get('/ru/news/search', searchNewsclientru)
router.get('/en/news/search', searchNewsclienten)
router.get('/news/tags/search', searchNewstags)
router.get('/ru/news/tags/search', searchNewstagsru)
router.get('/en/news/tags/search', searchNewstagsen)

module.exports = router