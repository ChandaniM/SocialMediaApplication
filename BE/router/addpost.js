const express = require('express');
const router = express.Router();
const postController = require("../controllers/addpostcontroller")
router.post('/add-post', postController.addPost);
module.exports = router;