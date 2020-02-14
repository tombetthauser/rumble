require("dotenv").config();
const path = require("path");
const cors = require("cors");
//const fileUploadRoutes = require("./routes/api/fileUploadRoutes");
const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
require("./models/User");
const users = require("./routes/api/users");
const chatRoutes = require("./routes/api/chat");
const app = express();
app.use(cors());

//config.connectDB();

mongoose
.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {console.log('connected to mongo')})
.catch((err) => {console.log(err)})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

//app.use("/api/document", fileUploadRoutes);



app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send("Backend running");
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.status(err.status || 500);
//   res.render("error");
// });



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}...`)
})

module.exports = app;