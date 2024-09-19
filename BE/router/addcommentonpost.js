const express = require('express');
const router = express.Router();
const  addCommentOnPostController= require("../controllers/addcommentcontroller")
router.post('/add-comment', addCommentOnPostController.addCommentOnPostController);
module.exports = router;