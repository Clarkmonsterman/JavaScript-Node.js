const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    SurveyID: String,
    Directory: String,
    RewardCode: String,
    ImgVotes: Array,
    ImgScores: Array
});

module.exports = mongoose.model("Survey", SurveySchema);