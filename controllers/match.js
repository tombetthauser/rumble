const User = require('../models/User.js');
const Conversation = require('../models/chat/Conversation.js');
const ChatServerClient = require('../util/chat_server_client');

exports.matchOrLike = function (req, res) {
    let currentUserId = req.user._id;
    let otherUserId = req.body.recipientId;///recipient id was set on the axios post 

    //    console.log(currentUserId);
    //    console.log(otherUserId);

    User.findOne({ _id: otherUserId }).exec((err, otherUser) => {
        if (err) throw err;
        // console.log('matchOrLike hit');

        if (otherUser) {
            // we have another user to like

            // add otherUser._id to currentUser.likes
            User.findOne({ _id: req.user._id }).exec((err, foundCurrentUser) => {
                if (err) throw err;
                if (foundCurrentUser) {
                    foundCurrentUser.liked_users.push(req.body.recipientId);
                    foundCurrentUser.save((err, savedUser) => {
                        if (err) throw err;

                        // is it a match?
                        if (otherUser.liked_users.includes(currentUserId)) {
                            Conversation.findOne({ participants: [currentUserId, otherUserId] }).exec((err, foundConversation) => {
                                if (err) throw err;
                                console.log(foundConversation)
                                if (!foundConversation) {
                                    // lets start the conversation
                                    let newConvo = new Conversation({ participants: [currentUserId, otherUserId] });
                                    newConvo.save((err, savedConvo) => {

                                        const chat = new ChatServerClient();
                                        console.log("savedConvo", savedConvo);
                                        chat.dispatchNewConversation(savedConvo);

                                        return res.status(200).json({ conversation: savedConvo, user: req.user });
                                    });
                                } else {
                                    // only if we see a person again
                                    return res.status(200).json(savedUser);
                                }
                            });
                        } else {
                            return res.status(200).json(savedUser);
                        }
                    });
                } else {
                    console.log('no currentUser found');
                    return res.status(404).json({ error: "no user found" });
                }

            })

        } else {
            return res.status(422).json({ msg: 'unprocessable matchOrLike' })
        }
        
    })
    
};
  //   const filter = { _id: req.body._id }
  //   const update = req.body

  //   User.findOneAndUpdate(filter, update, {new: true}).then((user) => {
  //     res.json(user)})
  //   .catch(err => console.log(err))
  // }else{