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
    { username: "Dwayne", email: "mail@mail.com", biography: "Remember when the whole world could smell what The Rock was cooking?", password: "password", password2: "password", profile_url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Dwayne_Johnson_2%2C_2013.jpg"},
    { username: "Chyna", email: "mail@mail.com", biography: "University of Tampa grad looking to make new arm wrestling friends.", password: "password", password2: "password", profile_url: "https://thenypost.files.wordpress.com/2019/08/chyna_getty.gif"},
    { username: "Randy", email: "mail@mail.com", biography: "This Macho Man still has a lifetime supply of slim jims to share with new friends.", password: "password", password2: "password", profile_url: "https://d2mjvz2lqjkhe7.cloudfront.net/as/assets-mem-com/cmi/7/9/0/1/4681097/20110525_084911_e_orig.jpg/-/randy-poffo-largo-fl-obituary.jpg"},
    { username: "Steve", email: "mail@mail.com", biography: "Even when your stone cold its easy to get lonely as we grow old.", password: "password", password2: "password", profile_url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Austin_by_Gage_Skidmore.jpg"},
    { username: "Terry", email: "mail@mail.com", biography: "Looking for new friends, fun and an a occaisional match to stay young at heart.", password: "password", password2: "password", profile_url: "https://s.yimg.com/uu/api/res/1.2/GBi4ioTdBU5pI_mj2qdoOA--~B/aD0xODAwO3c9MjcwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/people_218/f4ad8855ecce83db4bad5aab2cc047e8"},
    { username: "Paul", email: "mail@mail.com", biography: "Big Show has a big heart and a big friend zone where all are welcome.", password: "password", password2: "password", profile_url: "https://m.media-amazon.com/images/M/MV5BMTQ5NjE1OTY4NF5BMl5BanBnXkFtZTcwMjUxMDMxNw@@._V1_.jpg"},
    { username: "Mick", email: "mail@mail.com", biography: "If God built me a ladder to heaven, I would climb it and elbow drop the world.", password: "password", password2: "password", profile_url: "https://arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/TTKV7AUOG5EJRGFUA6TX2I5JU4.jpg"},
    { username: "James", email: "mail@mail.com", biography: "I used to be the Ultimate Warrior, but my only war now is against depression.", password: "password", password2: "password", profile_url: "https://www.gannett-cdn.com/-mm-/116eb12287558f9884b0e58dead79620a45394d9/c=0-0-3000-1692/local/-/media/USATODAY/USATODAY/2014/04/09//1397019733000-AP-WWE-Hall-of-Fame-Induction-Ceremony.jpg?width=3000&height=1692&fit=crop&format=pjpg&auto=webp"},
    { username: "Ricky", email: "mail@mail.com", biography: "My names Ricky The Dragon and I'm always down to fly away with a new friend.", password: "password", password2: "password", profile_url: "https://www.miamiherald.com/sports/fighting/qyfkn6/picture27071983/alternates/FREE_1140/FullSizeRender(8)"},
    { username: "Leon", email: "mail@mail.com", biography: "Big Van Vander just wants to walk on the sand and hold some hands.", password: "password", password2: "password", profile_url: "https://www.wwe.com/f/2019/01/20160402_hof_1920x1080_exclusive_vader--8edb9828958b636850ff02c4f55b949c.jpg"},
    { username: "Jeff", email: "mail@mail.com", biography: "Not a pro wrestler but always looking for a good workout for these guns.", password: "password", password2: "password", profile_url: "https://media.gq.com/photos/59692ae28e996a4571a3919c/16:9/w_2560%2Cc_limit/jeff%252520bezos%252520jacked.jpg"},
    { username: "Richard", email: "mail@mail.com", biography: "Ric Flair may be loosing some hair but I'm still ready to meet new people.", password: "password", password2: "password", profile_url: "https://thenypost.files.wordpress.com/2019/05/ric-flair-931.jpg?quality=90&strip=all"},
    { username: "John", email: "mail@mail.com", biography: "Not quite retired yet but it never hurts to make some new friends.", password: "password", password2: "password", profile_url: "https://www.ewrestlingnews.com/wp-content/uploads/2016/07/106246003-1573763560496gettyimages-939806266.jpeg"},
    { username: "Mark", email: "mail@mail.com", biography: "I used to be The Undertaker, now I'm undertaking the search for purpose after retirement.", password: "password", password2: "password", profile_url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/The_Undertaker_April_2014.jpg"},
    { username: "Guy", email: "mail@mail.com", biography: "I may not technically be a pro wrestler but these cheesefries are gangster.", password: "password", password2: "password", profile_url: "https://2zwmzkbocl625qdrf2qqqfok-wpengine.netdna-ssl.com/wp-content/uploads/2019/02/guy_fieri2.jpg"},
    { username: "Brock", email: "mail@mail.com", biography: "I'm still a wrestler, just don't ask me about UFC or I'll bite you.", password: "password", password2: "password", profile_url: "https://www.ocregister.com/wp-content/uploads/2018/07/LDN-L-UFC226-55-07081.jpg"}
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