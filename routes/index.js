const router = require("express").Router();
const User = require('../models/User.model')

const bcrypt = require('bcryptjs');
const saltRounds = 10;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async(req, res, next) => {
  const dbUser = {userName, password} = req.body
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const userLogin = await User.create({
      userName,
      password: hash
    })
    console.log("You are Signed Up")
    res.redirect("/");
  } catch (error) {
    console.log(error)
  }
  
});



router.get("/login", (req, res, next) => {
  res.render("login");
});




module.exports = router;
