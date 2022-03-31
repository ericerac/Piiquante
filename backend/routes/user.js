const express = require("express");
const router = express.Router();
const userControl = require("../controllers/user");
const passWord = require("../middleWare/passValidator.js");
const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

router.post("/signup", passWord, userControl.signup);

router.post(
  "/login",
  bruteforce.prevent,
  userControl.login,
  function (req, res, next) {
    res.send("Success!");
  }
);

module.exports = router;
