const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    biography: {
      type: String,
      required: true
    },
    liked_users :{
      type: Array,
      ref: "likes"
    },
    profile_url: {
      type: String
    }
  })

module.exports = User = mongoose.model('users', UserSchema); // convention User or users? refer to passport.js model