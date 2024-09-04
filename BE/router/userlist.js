const express = require('express');
const router = express.Router();
const userController = require("../controllers/userlistcontroller")
router.get('/userlist', userController.getAllUser);
module.exports = router;