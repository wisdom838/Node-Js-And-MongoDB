
var express=require("express");
var app=express();

var validator = require('express-validator'); // for serverside validations
var bodyParser=require('body-parser');

app.use(bodyParser.json());                       
app.use(bodyParser.urlencoded({extended:false}));
app.use(validator());

// mongodb connection
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/wisdomjobs';  //Set up default mongoose connection
mongoose.connect(mongoDB,{ useNewUrlParser: true }).then(() => console.log('Mongo DB connected Success fully.....'))
.catch(err => console.log(err));
mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library
var db = mongoose.connection;  //Get the default connection
//console.log(db);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));   //Bind connection to error event (to get notification of connection errors)
// mongodb connection End


// routing
var userscreate=require('./routers/user');  // get the file path
var profile=require('./routers/profile');
app.use('/user', userscreate);  // providing url routing
app.use('/profile', profile); 
app.get('/',(req,res)=>{
    console.log("WELCOME");
    res.send("WELCOME TO BOOK IT NOW");
})
// routing End

// Server Creation
var http=require('http');
var server=http.createServer(app);
port=process.env.port || 3002;
server.listen(port,function(){
console.log(`server started on port ${port}`);
});
// Server Creation End

