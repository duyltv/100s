// bundle our routes
var express = require('express')
var questions = express.Router()
var questionController = require('../controller/questions')

questions.get('/all', questionController.getAllQuestions)

questions.post('/add', questionController.addMultiQuesions)

module.exports = questions