const express = require("express")
const router = express.Router();
const User = require('../models/User.model')

const {isLoggedIn, isLoggedOut} = require("../middleware/route-guard.js")



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser)
  res.render("private", req.session.currentUser);
});

router.get("/cat", isLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser)
  res.render("main", req.session.currentUser);
});


module.exports = router;
