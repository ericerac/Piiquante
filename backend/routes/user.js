const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user')
const passWord = require('../middleWare/passValidator.js')

const multer = require('../middleWare/multer-config.js');


router.post('/signup', passWord, userControl.signup);
router.post('/login', userControl.login);



module.exports = router;