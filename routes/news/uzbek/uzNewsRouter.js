const router = require("express").Router();
const {
  createNews,
  allNews,
  createNewsPage,
  allActualNews,
  getNewsById,
  newsDelete,
  updateNews,
  editActual
} = require("../../../controllers/news/uzbek/uzNewsController");
const upload = require("../../../fileUpload/imageUpload");
const {roles} = require('../../../middleware/auth')

router.route("/create/news/uz")
    .post(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images',
        maxCount:10}]),createNews)
        .get(roles,createNewsPage)

router.route('/news/uz/:id')
      .delete(roles,newsDelete)
      .put(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images',
        maxCount:10}]),updateNews)
      .get(roles,editActual)


router.get("/news/uz", roles,allNews);
router.get('/news/update/:id', roles,getNewsById)
router.get('/news/actual', roles,allActualNews)

module.exports = router;
