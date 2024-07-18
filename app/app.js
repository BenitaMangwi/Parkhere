const express = require('express');
const path = require('path'); // Added for serving static files

const locationController = require('./controllers/locationController');
const bookingController = require('./controllers/bookingController');
const userController = require('./controllers/userController')

const app = express();

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

app.get("/landing_page", (req, res) => {
  res.render("landing_page");
});


app.get("/home", function(req, res) {
  res.render("home_page");
});

app.use((req, res, next) => {
  next(createError(404));
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});