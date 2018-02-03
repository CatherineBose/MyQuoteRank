var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const port =8000;



//body parser middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Connect to mongoose and routes
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

// Set static folder
app.use(express.static(__dirname+'/client/dist'));

//sets port to connect to
app.listen(port, function(){
    console.log("server is running at port: "+port)
})