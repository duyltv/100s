// bundle our routes
var passport = require('passport')
var Questions = require('../models/questions')
var mongoose = require('mongoose')
var _ = require('lodash')

module.exports.getAllQuestions = (req, res) => {

    Questions.find({}).exec((err, data) => {
        if (err)
            res.status(400).send({ err })
        else  {
            var result = _.shuffle(data)
            res.status(200).send({
                'message': 'success',
                'data': [
                    result[0],result[1],result[2],result[3],result[4],result[5],result[6],result[7],result[8],result[9]
                ]
            })
        }
    })
}

const validQuesion = (qsTemp) => {
    return new Questions({
                _id: new mongoose.Types.ObjectId,
                question: qsTemp.question,
                A: qsTemp.A,
                B: qsTemp.B,
                C: qsTemp.C,
                D: qsTemp.D,
                result: qsTemp.result,
            })
}

module.exports.addMultiQuesions = (req, res) => {
    const { questions } = req.body

    if(_.isEmpty(questions)) 
        res.status(400).send({ 'Message': 'BAD_REQUEST'}) 

    _.map(questions, qs => {
        if(_.isEmpty(qs)) 
            res.status(400).send({ 'Message': 'LACK_OF_ELEMENTS'})
        else if (_.every(_.values(qs), null)) {

            let question = validQuesion(qs)
            question.save(err => {
                if (err) res.status(400).send({ 'Message': 'INSERT_FAILED'})
            })
        } else res.status(400).send({ 'Message': 'INFO_ERROR'})
    })

    res.status(201).json({
        'Message': 'SUCCESS',
        'Data': questions
    })
}



