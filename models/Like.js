const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  liked_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
   },

  likee_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = Like = mongoose.model('likes', UserSchema); 