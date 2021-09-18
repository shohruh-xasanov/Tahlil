const router = require("express").Router();
const {
  createNewsEn,
  allNewsEng,
  createNewsPageEng,
  newsDelete,
  updateNews
} = require("../../../controllers/news/english/enNewsController");
const upload = require("../../../fileUpload/imageUpload");
const {roles} = require('../../../middleware/auth')

router.route("/create/news/en")
    .post(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images',
        maxCount:10}]), createNewsEn)
    .get(roles,createNewsPageEng)

    
router.route('/news/en/:id')
    .delete(roles,newsDelete)
    .put(roles,upload.fields([
      {name:'poster',
      maxCount:1}, 
      {name:'images',
      maxCount:10}]),updateNews)


router.get("/news/en",roles, allNewsEng);

module.exports = router;