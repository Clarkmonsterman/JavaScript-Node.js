
const express = require("express");
const mongoose = require('mongoose');
const db = require(__dirname + "/db.js");
const Survey = require(__dirname + "/Survey.js");
const User = require(__dirname + "/User.js");
const bodyParser = require("body-parser");
const app = express();

db.Find();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(express.static(__dirname + '/public'));


Ranks = {};

//db.Update(Ranks);


app.get("/", function(req, res){
 
  res.sendFile(__dirname + "/index.html");

});



app.get("/demo", function(req, res){
  res.sendFile(__dirname + "/demo2.html");

});

app.post("/demo_results", function(req, res){
  //console.log(res);


 
  Ranks = req.body;

  async function Update(){
    
    const update = await db.Update(Ranks);
    
    main().catch(err => console.log(err));
    

    setTimeout(() => {
      
    
    Survey.find(function(err, surveys){
        if(err){
            console.log(err);
        } else {
            console.log("After Update!");
            console.log(surveys);

  
            var scores_array = surveys[0].ImgScores;
            var votes_array = surveys[0].ImgVotes;

            console.log(scores_array);
            //console.log(scores_array[0].surveyid);
            console.log(votes_array);
            //console.log(votes_array[0].surveyid);
           
        }
    });

  }, 0)

}

  Update();

  
  //res.sendFile(__dirname + "/demo_results.html");

});



app.get("/create_account", function(req, res){
  res.sendFile(__dirname + "/create_account.html");

});



app.get("/sign_in", function(req, res){
  res.sendFile(__dirname + "/sign_in.html");

});




app.get("/purpose", function(req, res){
  res.sendFile(__dirname + "/purpose.html");

});




app.get("/help", function(req, res){
  res.sendFile(__dirname + "/help.html");

});


app.listen(3000, function(){
  console.log("Server started on port 3000");
});



async function main() {
await mongoose.connect('mongodb://localhost:27017/Demo');

}