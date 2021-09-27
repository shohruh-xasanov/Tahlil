const router = require("express").Router();
const {
  createNewsEn,
  createNewsPageEng,
  allNewsEng,
  updateNews,
  newsDelete
} = require("../../../controllers/news/english/enVedioNewsController");
const upload = require("../../../fileUpload/imageUpload");
const {roles} = require('../../../middleware/auth')

router.route("/create/videonews/en")
    .post(roles,upload.fields([
        {name:'poster',
        maxCount:1}, 
        {name:'images'}]), createNewsEn)
    .get(roles,createNewsPageEng)
    
router.route('/videonews/en/:id')
    .delete(roles,newsDelete)
    .put(roles,upload.fields([
      {name:'poster',
      maxCount:1}, 
      {name:'images'}]),updateNews)

router.get("/videonews/en",roles, allNewsEng);

module.exports = router;