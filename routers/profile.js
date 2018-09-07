
var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
       //cb(null, file.fieldname + '-' +  Date.now() + '.' + mime.extension(file.mimetype));//npm install --save mime 
    }
});

var upload = multer({ storage: storage }).single('profileImage');
router.post('/image', function (req, res) {
    
    upload(req, res, function (err) {
        console.log(req.body);
        if (err) {
            // An error occurred when uploading
        }
        res.json({
            success: true,
            message: 'Image uploaded Successfully!'
        });
 // Everything went fine
    })
});

module.exports = router;