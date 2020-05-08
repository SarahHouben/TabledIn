const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const config = require('./config');
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});
const storage = cloudinaryStorage({
  cloudinary,
  folder: "TabledIn", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png", "jpeg", "pdf", "raw"],
  filename: function(req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});
const uploader = multer({ storage });
module.exports = uploader;
