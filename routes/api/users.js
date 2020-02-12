const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUpdateProfileInput = require('../../validation/update-profile');

const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require('passport');

router.get('/test', (req, res) => res.json({ msg: "Ay, wuts good" }));

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({

      _id: req.user._id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

router.post("/login", (req, res) => {
  console.log("login triggered");
  // res.json({ msg: "login res" });
  const { errors, isValid } = validateLoginInput(req.body);

  console.log(errors);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;
  const biography = req.body.biography;

  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        let biography = user.biography ? user.biography : "HELLO"
        const payload = { _id: user._id, username: user.username, biography };
        

        jwt.sign( //incrypts the payload and sets it as a header 
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

router.post("/register", (req, res) => {
  console.log("register triggered")

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res
        .status(400)
        .json({ email: "This email address is already registered." });
    } else {
      // Otherwise create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.patch('/:userId', (req,res) => {
  const { errors, isValid } = validateUpdateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
    const filter = { _id: req.body._id }
    const update = req.body
    User.findOneAndUpdate(filter, update, {new: true}).then((user) => {
      res.json(user)})
    .catch(err => console.log(err))
})



module.exports = router;