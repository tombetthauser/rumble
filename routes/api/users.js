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

require("dotenv").config();
const multer = require("multer");
var AWS = require("aws-sdk");
const AWS_BUCKET_NAME = require("../../config/keys").AWS_BUCKET_NAME;
const AWS_ACCESS_KEY_ID = require("../../config/keys").AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = require("../../config/keys").AWS_SECRET_ACCESS_KEY;
const AWS_REGION = require("../../config/keys").AWS_REGION;
const AWS_UPLOADED_FILE_URL_LINK = require("../../config/keys").AWS_UPLOADED_FILE_URL_LINK;


  var storage = multer.memoryStorage();
  var upload = multer({ storage: storage });



  

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

router.get("/seed", (req, res) => {
  console.log("test")
  // create some events
  const users = [
    { username: 'therock', email: "mail@mail.com", description: 'Throwing into a basket.', password: "password", password2: "password" },
    { username: 'mankind', email: "mail@mail.com", description: 'Michael Phelps is the fast fish.', password: "password", password2: "password" },
    { username: 'sportsballs', email: "mail@mail.com", description: 'Lifting heavy things up', password: "password", password2: "password" },
    { username: 'steveaustin', email: "mail@mail.com", description: 'Super fast paddles', password: "password", password2: "password" },
    { username: 'kidrock', email: "mail@mail.com", description: 'Throwing into a basket.', password: "password", password2: "password" },
    { username: 'chyna', email: "mail@mail.com", description: 'Michael Phelps is the fast fish.', password: "password", password2: "password" },
    { username: 'coronaChan', email: "mail@mail.com", description: 'Does this bat soup taste funny to you?', password: "password", password2: "password" },
    { username: 'kingcarona', email: "mail@mail.com", description: 'Super fast paddles', password: "password", password2: "password" },
    { username: 'akebono', email: "mail@mail.com", description: 'Throwing into a basket.', password: "password", password2: "password" },
    { username: 'bigbadbilly', email: "mail@mail.com", description: 'Michael Phelps is the fast fish.', password: "password", password2: "password" },
    { username: 'ericwrestle', email: "mail@mail.com", description: 'Lifting heavy things up', password: "password", password2: "password" },
    { username: 'machinegunsmelly', email: "mail@mail.com", description: 'Super fast paddles', password: "password", password2: "password" },
    { username: 'bonesaw', email: "mail@mail.com", description: 'Throwing into a basket.', password: "password", password2: "password" },
    { username: 'postmalone', email: "mail@mail.com", description: 'Michael Phelps is the fast fish.', password: "password", password2: "password" },
    { username: 'sixnine', email: "mail@mail.com", description: 'Lifting heavy things up', password: "password", password2: "password" },
    { username: 'takashi', email: "mail@mail.com", description: 'Super fast paddles', password: "password", password2: "password" }
  ];
  // use the Event model to insert/save
  User.deleteMany({}, () => {
    users.forEach(user => {
      let newUser = new User(user) 
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
        });
      });
    })
    // seeded!
    return res.send('Database seeded!');
  });
})

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
  const photoUrl = req.body.photoUrl;

  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        let biography = user.biography ? user.biography : ""
        let profile_url = user.profile_url ? user.profile_url: "";
        let liked_users = user.liked_users ? user.liked_users: [];
        const payload = { _id: user._id, username: user.username, biography, profile_url, liked_users};
        

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

router.get('/', (req, res) => {
  User.find().then(users => {
    let formattedUsers = {};
    users.forEach(user => formattedUsers[user._id] = user);
    res.json(formattedUsers);
  })
})

router.patch('/:userId', upload.single("file"), (req,res) =>{
  if(!req.file){
  const { errors, isValid } = validateUpdateProfileInput(req.body);
  if (!isValid) {
  return res.status(400).json(errors);
  }
    const filter = { _id: req.body._id }
    const update = req.body

    User.findOneAndUpdate(filter, update, {new: true}).then((user) => {
      res.json(user)})
    .catch(err => console.log(err))
  }else{
  //if (req.file){ 
    const file = req.file;
    console.log(req.file)
    const s3FileURL = AWS_UPLOADED_FILE_URL_LINK;

    let s3bucket = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION
    });

    console.log(AWS_ACCESS_KEY_ID);
    console.log(AWS_SECRET_ACCESS_KEY);

    //Where you want to store your file


    var params = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    s3bucket.upload(params, function(err, data) {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
      //  res.send({ data });
      //   var newFileUploaded = {
      //   description: req.body.description,
      //   profile_url: s3FileURL + file.originalname,
      //   s3_key: params.Key
      // };
      const filter = { _id: req.body._id };
      console.log(req.body)
      const update = { profile_url: s3FileURL + file.originalname};
      console.log(update)
      User.findOneAndUpdate(filter, update, {new: true})
      .then((user) => {
        
        console.log(user)
        res.json(user)})
      .catch(err => console.log(err))
       }
    });
  }
})


router.delete("/:userId", (req, res) => {
  User.deleteOne({ _id: req.params.userId }, function (err) {
    console.log(userId);
    if (err) return handleError(err);
    return res.status(200).json({});
  });
  return res.status(404).json({ msg: 'no user to delete' });
});

module.exports = router;