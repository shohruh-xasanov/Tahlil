const router = require("express").Router();
const {
  createNewsRu,
  createNewsPageRu,
  allNewsRu,
  updateNews,
  newsDelete
} = require("../../../controllers/news/russian/ruVedioNewsController");
const upload = require("../../../fileUpload/imageUpload");
const {roles} = require('../../../middleware/auth')

router.route("/create/videonews/ru")
    .post(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images',
        maxCount:10}]), createNewsRu)
    .get(roles,createNewsPageRu)

router.route('/videonews/ru/:id')
    .delete(roles,newsDelete)
    .put(roles,upload.fields([
      {name:'poster',
      maxCount:1}, 
      {name:'images',
      maxCount:10}]),updateNews)

router.get("/videonews/ru", roles,allNewsRu);

module.exports = router;