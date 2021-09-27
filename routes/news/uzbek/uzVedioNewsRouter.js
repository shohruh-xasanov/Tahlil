const router = require("express").Router();
const {
  createNews,
  allNews,
  createNewsPage,
  updateNews,
  newsDelete,
  getNewsById
} = require("../../../controllers/news/uzbek/uzVedioNewsController");
const upload = require("../../../fileUpload/imageUpload");
const {roles} = require('../../../middleware/auth')

router.route("/create/videonews/uz")
    .post(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images'}]), createNews)
    .get(roles,createNewsPage)

router.route('/videonews/uz/:id')
    .delete(roles,newsDelete)
    .put(roles,upload.fields([
      {name:'poster',
      maxCount:1}, 
      {name:'images'}]),updateNews)


router.get("/videonews/uz", roles,allNews);
router.get('/videonews/update/:id', roles,getNewsById)

module.exports = router;
