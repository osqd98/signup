//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;
   //console.log(firstName, lastName, email);

   const data = {
     members: [
       {
         email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/e47e14ed99";

   const options = {
     method : "POST",
     auth : "OsamaQd:c62cdf578f4cf86145d67e3d8a21fb87-us21"
   };

   const request = https.request(url, options, function(response) {

     if (response.statusCode == 200) {
       res.sendFile(__dirname + "/success.html");
     }else {
       res.sendFile(__dirname + "/failure.html");
     }

     response.on("data", function(data){
       console.log(JSON.parse(data));
     });
   });

   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

//API key
// c62cdf578f4cf86145d67e3d8a21fb87-us21

//list
//e47e14ed99


//706bd195-3465-4076-9c03-bf6813082a7a api heroku
