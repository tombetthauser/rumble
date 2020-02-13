// "use strict";

// const mongoose = require("mongoose");

// module.exports = {
//   database: process.env.MONGO_DB,

//   // connect function to create a mongoDB connection
//   connectDB: function() {
//     mongoose.connect(this.database, { useUnifiedTopology: true, useNewUrlParser: true }));
//   }
// };
// // on mongo connection open event print a console statement
// mongoose.connection.on("open", function() {
//   console.log("Connected to Database (MongoDB) ");
// });

// 'use strict'

// const mongoose = require('mongoose');

// module.exports = {
//     'database': process.env.MONGO_DB,

//     // connect function to create a mongoDB connection
//     'connectDB' : function () {
//         mongoose.connect(this.database) //{useUnifiedTopology: true,useNewUrlParser: true})
//         // .then(() => {console.log('connected to mongo')})
//         // .catch((err) => {console.log(err)})
//     },
// }
// // on mongo connection open event print a console statement
// mongoose.connection.on('open', function () {
//     console.log('Connected to Database (MongoDB) ');
// })