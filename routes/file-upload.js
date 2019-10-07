const express = require("express");
const router = express.Router();
const uploader = require("../configs/cloudinary-setup");

router.post("/menu", uploader.single("menu"), (req, res, next) => {
  // console.log(req.file);
  console.log("file is: ", req.file);
  console.log(req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.post("/logo", uploader.single("logo"), (req, res, next) => {
  // console.log('file is: ', req.file)
  console.log(req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

module.exports = router;
