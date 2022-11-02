const express = require("express")
const router = express.Router();
const User = require('../models/User.model')

const bcrypt = require('bcryptjs');
const saltRounds = 10;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});


// Sign In 
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async(req, res, next) => {
  const {username, password} = req.body
  
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

   /* if (username === '' || password === '') {
    res.render('signup', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }  */

  try {
    
     await User.create({
      username,
      password: hash
    })
    
    console.log("You are Signed Up")
    res.redirect("/profile");
  } catch (error) {
    console.log(error)
  }
  
});


// Log In 

router.get("/login", (req, res, next) => {
  res.render("login");
  
});

 router.post("/login", async(req, res, next) => {
  const { userName, password } = req.body;
  if (userName === '' || password === '') {
    res.render('login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
  try {
    const dbUser = await User.findOne({userName})
    console.log(dbUser)

    if (!dbUser) {
      res.render('login', { errorMessage: 'Email is not registered. Try with other email.' });
      return;
    } else if (bcryptjs.compareSync(password, dbUser.password)) {
      res.render('profile', { dbUser });
    } else {
      res.render('login', { errorMessage: 'Incorrect password.' });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error)
  }
  
}); 




module.exports = router;
