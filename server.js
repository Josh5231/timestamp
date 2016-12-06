var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

var months = [
   "January","February","March",
    "April","May","June",
    "July", "August","September",
    "October","November","December"
    ];

//A simple array to log the last 20 calls
var log = [];

//This just makes the log a little more readable
var logToHtml=function()
    {
        var out="<html><body><h3 style='text-align:center'>Log:</h3><ol style='border:1px solid black'>";
        log.forEach((cv,ind)=>{
           out+="<li>IP( "+cv.ip+" ) - Path( "+cv.path+" ) - Time( "+cv.time+" )</li>";
        });
        out+="</ol></body></html>";
        return out;
    };

//run logIt on all incoming requests    
app.use(function logIt(req, res, next) {
 var d = new Date();
 log.push( { ip:req.ip, path:req.path, time:d.toTimeString() } ); 
 if(log.length>20){ log.shift(); } //limit log.length to 20
 next();
});

app.use("/css",express.static(__dirname+"/css")); //Deliver css files if requested

//app.use(express.static('public'));
//Send index.html for root 
app.get(['/','/index','/index.html'], (req, res) => {
    res.sendFile("index.html",{root: __dirname + '/'});
});

//Display the "log" 
app.get('/log',(req,res)=>{
   res.send(logToHtml()); 
});

//Store URL input in "timeInput"
app.get("/:timeInput",(req,res)=>{
    //Grab input and put into a variable
   var input=req.params.timeInput;
   
   //1.Check if its a unix time
   if( isNaN(+input) ){ //Natural Date
        if( isNaN(Date.parse(input)) ) //If Date.parse(input) outputs NaN, IE not a valid date
            {
            res.send({ unix:null, natural:null });
            }
        else //if a valid date
            {
            res.send({ unix:Date.parse(input), natural:input });
            }
   }
   else //unix time
   {
     var d = new Date();
     d.setTime(+input);
     var out = { unix:+input, natural:months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear() };
     res.send(out);  
   }
});

app.listen(port, function () {
  console.log('App running on port '+port+"!");
});