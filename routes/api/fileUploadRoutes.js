// // 'use strict'
// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const DOCUMENT = require("../../models/Document");
// const multer = require("multer");
// var AWS = require("aws-sdk");
// const AWS_BUCKET_NAME = require("../../config/keys").AWS_BUCKET_NAME;
// const AWS_ACCESS_KEY_ID = require('../../config/keys').AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = require('../../config/keys').AWS_SECRET_ACCESS_KEY;
// const AWS_REGION = require('../../config/keys').AWS_REGION;
// const AWS_UPLOADED_FILE_URL_LINK = require('../../config/keys').AWS_UPLOADED_FILE_URL_LINK;


// // Multer ships with storage engines DiskStorage and MemoryStorage
// // And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

// // Get all Documents s Routes
// router.route("/").get((req, res, next) => {
//   DOCUMENT.find(
//     {},
//     null,
//     {
//       sort: { createdAt: 1 }
//     },
//     (err, docs) => {
//       if (err) {
//         return next(err);
//       }
//       res.status(200).send(docs);
//     }
//   );
// });

// // Route to get a single existing GO data (needed for the Edit functionality)
// router.route("/:id").get((req, res, next) => {
//   DOCUMENT.findById(req.params.id, (err, go) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(go);
//   });
// });

// // route to upload a pdf document file
// // In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
// router.post("/upload", upload.single("file"), function(req, res) {
//   const file = req.file;
//   const s3FileURL = AWS_UPLOADED_FILE_URL_LINK;

//   let s3bucket = new AWS.S3({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     region: AWS_REGION
//   });

//   console.log(AWS_ACCESS_KEY_ID);
//   console.log(AWS_SECRET_ACCESS_KEY);

//   //Where you want to store your file

//   var params = {
//     Bucket: AWS_BUCKET_NAME,
//     Key: file.originalname,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     ACL: "public-read"
//   };

//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       res.status(500).json({ error: true, Message: err });
//     } else {
//       res.send({ data });
//       var newFileUploaded = {
//         description: req.body.description,
//         profile_url: s3FileURL + file.originalname,
//         s3_key: params.Key
//       };
//       var document = new DOCUMENT(newFileUploaded);
//       document.save(function(error, newFile) {
//         if (error) {
//           throw error;
//         }
//       });
//     }
//   });
// });

// // Route to edit existing record's description field
// // Here, I am updating only the description in this mongo record. Hence using the "$set" parameter
// router.route("/edit/:id").put((req, res, next) => {
//   DOCUMENT.findByIdAndUpdate(
//     req.params.id,
//     { $set: { description: Object.keys(req.body)[0] } },
//     { new: true },
//     (err, updateDoc) => {
//       if (err) {
//         return next(err);
//       }
//       res.status(200).send(updateDoc);
//     }
//   );
// });

// // Router to delete a DOCUMENT file
// router.route("/:id").delete((req, res, next) => {
//   DOCUMENT.findByIdAndRemove(req.params.id, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     //Now Delete the file from AWS-S3
//     // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
//     let s3bucket = new AWS.S3({
//       accessKeyId: AWS_ACCESS_KEY_ID,
//       secretAccessKey: AWS_SECRET_ACCESS_KEY,
//       region: AWS_REGION
//     });

//     let params = {
//       Bucket: AWS_BUCKET_NAME,
//       Key: result.s3_key
//     };

//     s3bucket.deleteObject(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send({
//           status: "200",
//           responseType: "string",
//           response: "success"
//         });
//       }
//     });
//   });
// });

// module.exports = router;
