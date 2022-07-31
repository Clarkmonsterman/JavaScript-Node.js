 
const mongoose = require('mongoose');


const path = require('path');
const fs = require('fs');
const Survey = require(__dirname + "/Survey.js");
const User = require(__dirname + "/User.js");
//joining path of directory 
const directoryPath = path.join(__dirname, '/public/images/');
console.log(directoryPath);

main().catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://localhost:27017/Demo');

}


class Vote {
    constructor(surveyid, imgid, votes){
        this.surveyid = surveyid;
        this.imgid = imgid;
        this.votes = votes;
    }
}


class Score {
    constructor(surveyid, imgid, scores){
        this.surveyid = surveyid;
        this.imgid = imgid;
        this.scores = scores;
    }
}


function setUp(){


    try{
        console.log("Inside Setup");

        

        var img_scores = [];
        var img_votes = [];
      
        
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            
            function createSurveys(size, iter){
                var size = size;
                var iter = iter;
                
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    var file_name = file.split(/(\\|\/)/g).pop()
                
                    if(file_name.includes("cat")){
                        //console.log(file_name);
                        //console.log("Size inside iter: ");
                        if(iter == 0){
                            let catScore = new Score("Demo",file,0);
                            img_scores.push(catScore)
                            size = size + 1;
                            
                        } else {
                            
                            let votes = Array(size).fill(0);
                            let catVote = new Vote("Demo",file,votes);
                            img_votes.push(catVote)
                            console.log(catVote);
                        }
                    }
                    //console.log(size);
                    //console.log(iter);

                });
                //console.log("Sizes outside for each: ");
                iter = iter + 1;
                //console.log(size);
                //console.log(iter);
                if(iter == 1){
                    createSurveys(size, iter);
                }
                
            }   

            createSurveys(0, 0);
  
            const CatSurvey = new Survey({
                SurveyID: "Demo", 
                Directory: __dirname + '/images',
                RewardCode: "Thank you for Completing the Demo!!!",
                ImgScores: img_scores,
                ImgVotes: img_votes
    
            });

            CatSurvey.save();
            console.log(CatSurvey);


            const Admin = new User({
                UserName: "TimboSlicerr",
                PassWord: "Qty56f6$tLbwLf",
                ServiceLevel: "God" 
    
            });
            
            
            Admin.Surveys.push(CatSurvey);
            console.log(Admin);
            Admin.save();

            
            //mongoose.connection.close();

        });

   } catch(error){
        console.log(error);

   }

    
}





function testFunction0(){
    console.log("Run if no Survey's Found");
}


function testFunction1(){
    console.log("Run if Survey's Found");
}





module.exports.Find = find;


function find(){    

    var size;
      Survey.find(function(err, surveys){
        if(err){
            
            console.log(err);
        } else {
            
            console.log(surveys);
            console.log(surveys.length);
            var size = surveys.length;
            if(size > 0){
                testFunction1();
            } else {
                testFunction0();
                setUp();
                
            }
        
        }
        return size;
    });
      
    

}

module.exports.Update = Update;

function Update(Ranks){

    console.log("Inside Update");
   // console.log(Ranks);
   // console.log(Ranks['http://localhost:3000/images/cat1.jpeg']);
   // console.log(Survey);

    var scores = {};
    var votes = {};
    var update = false;

    Survey.find(function(err, surveys){
        if(err){
            console.log(err);
        } else {
            //console.log(surveys);
            //console.log(surveys[0]._id);
            var id = surveys[0].id.toString();
            console.log(id);
            var scores_array = surveys[0].ImgScores;
            var votes_array = surveys[0].ImgVotes;

            //console.log(scores_array);
            //console.log(scores_array[0].surveyid);
            //console.log(votes_array);
            //console.log(votes_array[0].surveyid);
           

            if(surveys[0].ImgScores > 0){
                console.log("Updating Scores with Previous Values");                
                RunUpdate(Ranks, scores_array, votes_array, id);
            } else {
                RunUpdate(Ranks, scores_array, votes_array, id);
                //console.log("Setting Initial Scores");
            }
    
        }
    });


}


function RunUpdate(Ranks, scores_array, votes_array, id_0){

    
    console.log("Updating the Database!!!");
    //console.log(Ranks);
    // console.log(votes_array[0].votes.length);
    var rank_size = Object.keys(Ranks).length;

    


    
    
    var i = 0;
    Object.keys(Ranks).forEach(function(key) {
        //console.log(key);
        //console.log(Ranks[key]);
        var rank = Ranks[key];
        //console.log("Rank: " + rank)
        
        scores_array[i].scores = rank_size - Ranks[key] + 1 + scores_array[i].scores;
        //console.log( votes_array[i].votes[rank-1]);
        votes_array[i].votes[rank-1] = votes_array[i].votes[rank-1] + 1;
        i = i + 1;
        //console.log(votes_array);
        
    });

    console.log(scores_array);
    console.log(votes_array);

    // needs to be fixed



    

    Survey.updateOne({_id:id_0}, {ImgScores: scores_array},
        function(err, res){
            if(err){
                console.log(err);
            } else {
                console.log(res);
                console.log("Successfully updated the document!");
            }
        });


    Survey.updateOne({_id:id_0},  {ImgVotes: votes_array},
        function(err, res){
            if(err){
                console.log(err);
            } else {
                console.log(res);
                console.log("Successfully updated the document!!");
            }
        });


}

  
    

