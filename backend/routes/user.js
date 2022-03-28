const express = require("express");
const router = express.Router();
const userControl = require("../controllers/user");
const passWord = require("../middleWare/passValidator.js");
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store);

router.post("/signup", passWord, userControl.signup);
//router.post("/login", userControl.login);

module.exports = router;


router.post('/login',
    bruteforce.prevent, userControl.login, // error 429 if we hit this route too often
    function (req, res, next) {
        res.send('Success!');
    }
);

