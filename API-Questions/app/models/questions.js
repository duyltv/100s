// set up a mongoose model

var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

var QuestionsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    A: {
        type: String,
        required: true
    },
    B: {
        type: String,
        required: true
    },
    C: {
        type: String,
        required: true
    },
    D: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Questions', QuestionsSchema);
