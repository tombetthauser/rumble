const User = require('../models/User.js');
const Conversation = require('../models/chat/Conversation.js');


exports.matchOrLike = function (req, res) {
    let currentUserId = req.user._id;
    let otherUserId = req.body.recipientId;///recipient id was set on the axios post 


       console.log(currentUserId);
       console.log(otherUserId);


    User.findOne({ _id: otherUserId }).exec((err, otherUser) => {
        if (err) throw err;
        console.log('matchOrLike hit');
        if (otherUser && otherUser.liked_users.includes(currentUserId)) {
            Conversation.find({ participants: [currentUserId, otherUserId] }).exec((err, foundConversation) => {
                if (err) throw err;
                if (!foundConversation) {
                    let newConvo = new Conversation({ participants: [currentUserId, otherUserId] });
                    newConvo.save((err, savedConvo) => {
                        return res.status(200).json({ conversation: savedConvo });
                    });
                } else {
                    // only if we see a person again
                    return res.status(200).json({});
                }
            });
        } else {
            // const currentUser = Object.assign({}, req.user);
            console.log(req.user);
            // const filter = { _id: currentUser._id }
            // currentUser.liked_users.push(recipientId);
            // const update = Object.assign({}, currentUser, { liked_users: currentUser.liked_users.push(recipientId)}) // user object with the pushed id
            // User.findOneAndUpdate(filter, currentUser, {new: true}).then(user => {
            //     return res.status(200).json({ user });
            // })
            User.findOne({ _id: req.user._id }).exec((err, foundCurrentUser) => {
                if (err) throw err;
                console.log('attempted find');
                // console.log(filter);
                if (foundCurrentUser) {
                  console.log(foundCurrentUser);
                    foundCurrentUser.liked_users.push(req.body.recipientId);
                    foundCurrentUser.save((err, savedUser) => {
                    if (err) throw err;
                        return res.status(200).json(savedUser);
                    });
                } else {
                    console.log('no currentUser found');
                    return res.status(404).json({ error: "no user found"});
                }
                
            })
        }
        
    })
    
};
  //   const filter = { _id: req.body._id }
  //   const update = req.body

  //   User.findOneAndUpdate(filter, update, {new: true}).then((user) => {
  //     res.json(user)})
  //   .catch(err => console.log(err))
  // }else{