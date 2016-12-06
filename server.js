var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

var months = [
   "January","February","March",
    "April","May","June",
    "July", "August","September",
    "October","November","December"
    ];


app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile("index.html",{root: __dirname + '/'});
});

app.get('/index.css',function (req, res) {
    res.sendFile("index.css",{root: __dirname + '/'});
});

app.get("/:timeInput",(req,res)=>{
   var input=req.params.timeInput;
   
   //1.Check if its a unix time
   if( isNaN(+input) ){ //Natural Date
        if( isNaN(Date.parse(input)) )
            {
            res.send("Error: Invalid input.");
            }
        else
            {
            var out = { unix:Date.parse(input), natural:input };
            res.send(out);
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
})