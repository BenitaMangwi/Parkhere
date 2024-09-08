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
    res.cookie('user', 'owner')
    console.log("owner mode")
  }
  
  if(req.cookies.user == 'owner' || req.cookies.user==null){
    res.locals.user = "owner"
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


app.get('/', (req, res) => {
  //req.cookies.user ? res.redirect("/home") : res.redirect("/landing_page")
  const user =  req.cookies.user 

  if(user && user != "owner")
    res.redirect("/home")
  else
    res.redirect("/landing_page")
    
});


//other routes
app.get("/landing_page", (req, res) => {
  res.render("landing_page");
});

app.get("/home", function(req, res) {
  res.render("home");
});

//error handling
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