const express = require('express');
const path = require('path'); // Added for serving static files
const { User } = require("./models/userModel");


const locationController = require('./controllers/locationController');
const bookingController = require('./controllers/bookingController');
const userController = require('./controllers/userController');
const signupandloginController = require('./controllers/signupandloginController');

const app = express();

var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use(express.static("static"));
app.set("view engine", "pug");
app.set("views", "./app/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount controllers for other functionalities
app.use('/locations', locationController);
app.use('/bookings', bookingController);
app.use('/users', userController);
app.use('/auth' , signupandloginController );


// user
app.post('/set-password', async function (req, res) {
  params = req.body;
  var user = new User (params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          // If a valid, existing user is found, set the password and redirect to the users single-student page
          await user.setUserPassword(params.password);
          console.log(req.session.id);
          res.send('Password set successfully');
      }
      else {
          // If no existing user is found, add a new one
          newId = await user.addUser(params.email);
          res.send('Perhaps a page where a new user sets a programme would be good here');
      }
  } catch (err) {
      console.error(`Error while adding password `, err.message);
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
              req.session.user_id = uId;
              req.session.loggedIn = true;
              console.log(req.session.user_id);
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

app.get("/db_test", function(req, res) {
  // Assumes a table called test_table exists in your database
  sql = 'select * from test_table';
  db.query(sql).then(results => {
      console.log(results);
      res.send(results)
  });
});



// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});