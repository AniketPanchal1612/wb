const express = require('express');
const router = express.Router();
const usercontroller = require("../controller/userlogic")


router.post('/add-user',usercontroller.registerUser);

router.post('/user-login',usercontroller.loginUser);

module.exports = router;