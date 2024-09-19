const express = require('express');
const router = express.Router();
const  addCommentOnPostController= require("../controllers/addcommentcontroller")
router.get('/get-comment', addCommentOnPostController.getCommentControllerList);
module.exports = router;