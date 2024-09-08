const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");

// Sign Up
router.get("/signup", function (req, res) {
  res.render("signup", {
    current_view: "signup",
    title: "Sign Up",
  });
  router.post("signup", async function (req, res) {
    res.redirect("/");
  });
});


// Login
router.get("/login", function (req, res) {
  res.render("login", {
    current_view: "login",
    title: "Log In",
  });
  router.post("/login", async function (req, res) {
    res.redirect("/");
  });
});


// Log Out
router.get("/logout", async function (req, res) {
  res.render("log_out", { title: "Log Out" });
});

router.post("/logout", async function (req, res) {
  res.redirect("/");
});

module.exports = router;