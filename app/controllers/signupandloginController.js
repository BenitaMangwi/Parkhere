const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();

const signupandloginModel = require("../models/signupandloginModel");
const userModel = require("../models/userModel")
const { user } = require("../models/userModel")

// Sign Up
router.get("/signup", function(req, res){
  res.render("signupandlogin", { 
    current_view: "signup", 
    title: "Sign Up"
  });
});

router.post("/signup", async function(req, res){
  // checking if the user exists
  let check = await userModel.getUser(req.body.email, req.body.first_name)
  if(check.length >= 1){
    res.render("signupandlogin", { 
      current_view: "signup", 
      title: "Sign Up",
      errors: `User Already Exists`
    });

    return
  }
  
  let data = {
    ...req.body
  }

  // hashing password
  const salt = bcrypt.genSaltSync(13)
  const hash = await bcrypt.hash(data.password, salt)
  data.password = hash

  
  let result = await userModel.addUser(data)
  console.log(result)
  //result = result[0].user_id
  
  //let user_id = await userModel.getUser(data.Email)
  const user_id = result[0].insertId
  res.cookie('user', user_id)
  res.redirect('/home')
})

// Login
router.get("/login", function(req, res){
  res.render("signupandlogin", { 
    current_view: "login",
    title: "Log In" 
  });
});

router.post("/login", async function (req, res){
  try{
    let result = await userModel.getUser(req.body.email)  
    result = result[0]
  
    if(result){
      let truePassword = result.password
      let formPassword = req.body.password
      const isMatch = await bcrypt.compare(formPassword, truePassword)
      
      if(isMatch){
        // user is logged in
        if(result.user_id == 0)
          res.cookie('user', 'owner')
        else
          res.cookie('user', result.user_id)
        
        res.redirect('/home')
      }
      else {
        // wrong passwod
        res.render("signupandlogin", { 
          current_view: "login",
          title: "Log In",
          errors: `Wrong Password`,
          email: req.body.email,
        });
      }
    } else {
      // no user
      res.render("signupandlogin", { 
        current_view: "login",
        title: "Log In",
        errors: `No Such User: ${req.body.email}`
      });
    }
  } catch(err){
    console.error(err)
    throw err
  }
})

// Log out
router.get("/logout", async function(req, res) {
  res.render('log_out', { title: "Log Out"})
})

router.post("/logout", async function(req, res){
  res.cookie('user', 'onwer')
  res.redirect('/')
})

module.exports = router;
