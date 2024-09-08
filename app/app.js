const express = require('express');
const path = require('path'); // Added for serving static files
const createError = require("http-errors");
const cookieParser = require('cookie-parser')

const userModel = require("./models/userModel")

const locationController = require('./controllers/locationController');
const bookingController = require('./controllers/bookingController');
const userController = require('./controllers/userController');
const signupandloginController = require('./controllers/signupandloginController');

const app = express();



app.use(express.static("static"));
app.set("view engine", "pug");
app.set("views", "./app/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// setting up cookies
app.use(async (req, res, next) => {
  if(req.cookies.user == null){
    res.cookie('user', 'admin')
    console.log("admin mode")
  }
  
  if(req.cookies.user == 'admin' || req.cookies.user==null){
    res.locals.user = "admin"
  }
  else {
    res.locals.user = await userModel.getName(req.cookies.user)
  }
    
  next();
});

// Mount controllers for other functionalities
app.use('/locations', locationController);
app.use('/bookings', bookingController);
app.use('/users', userController);
app.use('/auth' , signupandloginController );


// user
app.post('/set-password', async function (req, res) {
  params = req.body;

  // Check if email is present in the request body
  if (!params.email) {
    return res.status(400).send('Email is required');
  }

  // Create a new user object with the email address
  var user = new User(params.email);

  try {
    uId = await user.getIdFromEmail();
    if (uId) {
      // User with the email address already exists
      return res.status(400).send('Email address is already in use');
    } else {
      // Create a new user and set the password
      newId = await user.addUser(params.email, params.password);
      res.send('Password set successfully');
      res.redirect('/home')
    }
  } catch (err) {
    console.error(`Error adding password `, err.message);
  }
});

// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
  params = req.body;
  var user = new User(params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          match = await user.authenticate(params.password);
          if (match) {
              res.redirect('/home');
          }
          else {
              // TODO improve the user journey here
              res.send('invalid password');
          }
      }
      else {
          res.send('invalid email');
      }
  } catch (err) {
      console.error(`Error while comparing `, err.message);
  }
});

//other routes
app.get("/landing_page", (req, res) => {
  res.render("landing_page");
});

app.get("/home", function(req, res) {
  res.render("home");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});