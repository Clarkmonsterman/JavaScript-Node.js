


function find(){

    const mongoose = require('mongoose');
    var size;
    var stuff = "Not Clear";

    main().catch(err => console.log(err));

    async function main() {
    await mongoose.connect('mongodb://localhost:27017/Demo');
    
    }

    




    const SurveySchema = new mongoose.Schema({
        SurveyID: String,
        Directory: String,
        RewardCode: String,
        ImgNames: Array,
        ImgRanks: Array
    });



    const Survey = mongoose.model("Survey", SurveySchema);

    
    Survey.find(function(err, surveys){
        if(err){
            console.log(err);
        } else {
            
            mongoose.connection.close();
            console.log(surveys);
            //console.log(typeof(surveys));
            console.log(surveys.length);
            return size = surveys.length;
            
            
            
            

    
            surveys.forEach(function(survey){
                console.log(survey.SurveyID);
            });
        }
        
    });
     


    return size;

}


const mongoose = require('mongoose');
var size;
var stuff = "Not Clear";

main().catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://localhost:27017/Demo');

}






const SurveySchema = new mongoose.Schema({
    SurveyID: String,
    Directory: String,
    RewardCode: String,
    ImgNames: Array,
    ImgRanks: Array
});



const Survey = mongoose.model("Survey", SurveySchema);


function getSurveys(){
    var query = Survey.find();
    return query;
}



var query =  getSurveys();
query.exec(function(err,surveys){
    var size;
   if(err){
      return console.log(err);
   } else {
   surveys.forEach(function(survey){
        console.log(survey);
        console.log(surveys.length);
        size = surveys.length;
        });
    }
});

console.log(size);







