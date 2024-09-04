const express = require('express');
const router = express.Router();
const loginController = require("../controllers/logincontroller")
router.post('/login', loginController.loginUser);
module.exports = router;