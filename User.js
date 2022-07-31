const mongoose = require('mongoose');



const SurveySchema = new mongoose.Schema({
    SurveyID: String,
    Directory: String,
    RewardCode: String,
    ImgVotes: Array,
    ImgScores: Array
});


const UserSchema = new mongoose.Schema({
    UserName: String,
    PassWord: String,
    ServiceLevel: String,
    Surveys: [SurveySchema]

});


module.exports = mongoose.model("User", UserSchema);