const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentcontroller")
router.post('/comment', commentController.postCommentCount);
module.exports = router;