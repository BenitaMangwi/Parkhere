const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const userModel = require("../models/userModel");

// Sign Up
router.get("/signup", function (req, res) {
  res.render("signupandlogin", {
    current_view: "signup",
    title: "Sign Up",
  });
});

router.post("/signup", async function (req, res) {
  // Check if user exists
  const existingUser = await userModel.getUserByEmailOrUsername(
    req.body.Email,
    req.body.Username
  );

  if (existingUser) {
    res.render("signupandlogin", {
      current_view: "signup",
      title: "Sign Up",
      errors: `User Already Exists`,
    });
    return;
  }

  // Hash password
  const salt = bcrypt.genSaltSync(13);
  const hash = await bcrypt.hash(req.body.Password, salt);

  // Add user to database
  const result = await userModel.addUser({
    ...req.body,
    Password: hash,
  });

  // Set cookie and redirect
  const userId = result.insertId;
  res.cookie("user", userId);
  res.redirect("/home");
});

// Login
router.get("/login", function (req, res) {
  res.render("signupandlogin", {
    current_view: "login",
    title: "Log In",
  });
});

router.post("/login", async function (req, res) {
  try {
    const user = await userModel.getUserByEmail(req.body.email);

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.Password);

      if (isMatch) {
        // Set cookie and redirect
        res.cookie("user", user.UserID);
        res.redirect("/home");
      } else {
        res.render("signupandlogin", {
          current_view: "login",
          title: "Log In",
          errors: `Wrong Password`,
          email: req.body.email,
        });
      }
    } else {
      res.render("signupandlogin", {
        current_view: "login",
        title: "Log In",
        errors: `No Such User: ${req.body.email}`,
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
});

// Log Out
router.get("/logout", async function (req, res) {
  res.render("log_out", { title: "Log Out" });
});

router.post("/logout", async function (req, res) {
  res.cookie("user", "");
  res.redirect("/");
});

module.exports = router;