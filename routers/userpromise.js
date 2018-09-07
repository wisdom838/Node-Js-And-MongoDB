var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Usermodel = require('../models/User'); //schema  
router.get('/', function (req, res) {
  res.send('User inserted successfully');
});

// insert data into mongodb:
router.post('/create', (req, res) => {

//validations
req.checkBody("name", "Enter a name.").notEmpty();
req.checkBody("name", "Enter length of name between 5 to 10 chars.").isLength({ min: 5, max:10 });
req.checkBody("name", "Enter  alphabates only .").matches(/^[a-zA-Z]{5,10}$/, "i");  //allows only alphabates of length 5 and maximum 10
req.checkBody("email", "Enter email address.").notEmpty();
req.checkBody("email", "Enter a valid email address.").isEmail();
req.checkBody("mobile", "Enter a mobile number.").notEmpty();
req.checkBody("mobile", "Enter a mobile number only numbers.").matches(/^[0-9]{10}$/, "i");  //allows only numbers and 10 letters only
req.checkBody("gender", "Enter a gender.").notEmpty();

var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } //validations end
  else 
  {
    mongoose.model('users').findOne({ email: req.body.email }, function (err, user) { // for checking user exist!
      if (user) {
        res.send("User already Exist");
      }
      else {
         //console.log(req.body);
        var username = req.body.name;
        var usereamil = req.body.email;
        var usermobile = req.body.mobile;
        var usergender = req.body.gender;
  
        mongoose.model('users').create({
          name: username,
          email: usereamil,
          mobile: usermobile,     // name, email,mobile,gender are database fields
          gender: usergender      // username, useremail,usermobile,usergender are from frontend body
        }, function (err, user) {
          if (err) {
            res.send("User not created")
          }
          else {
            var jsondata = {
              "status": 200,
              "message": "user created successfully"
            }
            res.send(jsondata);
          }
        })
      }
    });
  }
})


//getting data from database
router.get("/userslist", (req, res) => {
  Usermodel.find({}).then( user => {
    //mongoose.model('users').count({name:"hari"}, function(err, count) {    // getting records count based on condition
    Usermodel.count({}, function (err, count) {   // getting total records count
    var jsonlist = {
       "status": "200",
       "message": "data displayed successfully",
       "data": user,
       "count": count
        }
        res.send(jsonlist);
      });
  }).catch(err => console.log(err));
})


// update data from database
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  Usermodel.findByIdAndUpdate(id, req.body, function (err, userupdate) {
    
    if (err) {
      res.send("no data found belongs to id");
    }
    else {
      var jsonupdate = {
        "status": "200",
        "message": "data updated successfully with id:" + id,
        "data": userupdate
      }
      res.send(jsonupdate);
    }
  });
});


// delete data from database
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Usermodel.findByIdAndRemove(id,req.body).then( userdelete => {
      var jsondel = {
        "status": "200",
        "message": "data deleted successfully with id:" + id,
        "data": userdelete
      }
      res.send(jsondel);
   
  }).catch(err => console.log(`Error:${err}`));
});

// delete all rercords
router.delete('/delete/all', (req, res) => {
  //const id = req.params.id;
  Usermodel.remove({}, function (err, userdelete) {
    console.log(err);
    if (err) {
      res.send("no data found belongs to deleteAll");
    }
    else {
      var jsondel = {
        "status": "200",
        "message": "All Records deleted successfully:",
        "data": userdelete
      }
      res.send(jsondel);
    }
  });
});

module.exports = router;



