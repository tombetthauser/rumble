const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
.connect(db, { useUnifiedTopology: false, useNewUrlParser: true })
.then(() => {console.log('connected to mongo')})
.catch((err) => {console.log(err)})

require("./models/User");
const users = require('./routes/api/users');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);

app.get('/', (req, res) => {
  res.send("sup bitches");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}...`)
})