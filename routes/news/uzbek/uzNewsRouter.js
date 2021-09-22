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
        {name:'poster',}, 
        {name:'images'}]),createNews)
        .get(roles,createNewsPage)

router.route('/news/uz/:id')
      .delete(roles,newsDelete)
      .put(roles,upload.fields([
        {name:'poster'}, 
        {name:'images'}]),updateNews)
      .get(roles,editActual)


router.get("/news/uz", roles,allNews);
router.get('/news/update/:id', roles,getNewsById)
router.get('/news/actual', roles,allActualNews)

module.exports = router;
