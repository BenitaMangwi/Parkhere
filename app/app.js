const express = require("express"); // Import the Express.js library
const path = require("path"); // Import the path library for file path manipulation
const createError = require("http-errors"); // Import the createError function for handling HTTP errors
const cookieParser = require('cookie-parser'); // Import the cookieParser middleware for parsing cookies

// Import controllers for handling different functionalities
const locationController = require("./controllers/locationController.js");
const bookingController = require("./controllers/bookingController");
const userController = require("./controllers/userController");
const signupandloginController = require("./controllers/signupandloginController.js/index.js");

// Import models for interacting with the database
const locationModel = require("./models/locationModel");
const bookingModel = require("./models/bookingModel");
const userModel = require("./models/userModel");

const app = express(); // Create an instance of the Express application

// Serve static files from the "static" directory
app.use(express.static("static"));

// Set the view engine to Pug and specify the views directory
app.set("view engine", "pug");
app.set("views", "./app/views");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming JSON data
app.use(express.json());

// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Parse cookies from incoming requests
app.use(cookieParser());

// Cookie setup middleware
app.use(async (req, res, next) => {
  // Set the user cookie to "guest" if it doesn't exist
  if (req.cookies.user == null) {
    res.cookie('user', 'guest');
    console.log("Guest mode");
  }

  // Set the res.locals.user variable based on the user cookie
  if (req.cookies.user == 'guest' || req.cookies.user == null) {
    res.locals.user = "guest";
  } else {
    res.locals.user = await userModel.getName(req.cookies.user);
  }

  next(); // Continue processing the request
});

// Mount controllers to handle routes with specific prefixes
app.use("/locations", locationController);
app.use("/bookings", bookingController);
app.use("/users", userController);
app.use("/auth", signupandloginController);

// Render the landing page for unauthenticated users
app.get("/landing_page", (req, res) => {
  res.render("landing_page");
});

// Redirect users based on their authentication status
app.get('/', (req, res) => {
  const user = req.cookies.user;

  if (user && user != "guest") {
    res.redirect("/home");
  } else {
    res.redirect("/landing_page");
  }
});

// Render the home page for authenticated users, displaying their bookings
app.get('/home', async (req, res, next) => {
  const bookings = await bookingModel.getBookings(req.cookies.user);

  res.render('HomePage', {
    title: 'Home',
    bookings,
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Handle other errors
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Set the port number for the server
const port = process.env.PORT || 3000;

// Start the server and log a message with the port number and URL
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}/`);
});