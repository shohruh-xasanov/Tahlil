const router = require("express").Router();
const {
  createNewsRu,
  allNewsRu,
  createNewsPageRu,
  newsDelete,
  updateNews
} = require("../../../controllers/news/russian/ruNewsController");
const upload = require("../../../fileUpload/imageUpload");
const {roles} = require('../../../middleware/auth')

router.route("/create/news/ru")
    .post(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images',
        maxCount:10}]), createNewsRu)
    .get(roles,createNewsPageRu)

router.route('/news/ru/:id')
      .delete(roles,newsDelete) 
      .put(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images',
        maxCount:10}]),updateNews)

router.get("/news/ru", roles,allNewsRu);

module.exports = router;