const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {console.log('connected to mongo')})
  .catch((err) => {console.log(err)})
  

app.get('/', (req, res) => {
  res.send("sup bitches");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}...`)
})