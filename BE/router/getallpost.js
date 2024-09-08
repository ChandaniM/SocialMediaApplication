const express = require('express');
const router = express.Router();
const getPostController = require("../controllers/getpostcontroller");
router.get('/list-of-post', getPostController.getAllPost);
module.exports = router;