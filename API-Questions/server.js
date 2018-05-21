var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var passport = require('passport')
var config = require('./config/database') // get db config file
var port = process.env.PORT || 10001
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var cors = require('cors')
var flash = require('connect-flash')
var update = require('./app/controller/questions')
var cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))

var corsOptions = {
  origin: true,
  credentials: false,
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Cache-Control, organic'
}

app.use(cors(corsOptions))

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.use(session({
  cookie: {
    maxAge: 3600000 * 24 * 14 // 14 day.
  },
  resave: false,
  saveUninitialized: false,
  secret: '4107eaebd361f3477b630f4ed7452418',
  store: new mongoStore({
    url: config.database,
    collection: 'sessions'
  }, function () {
    console.log('Persistent Sessions initiated')
  })
}))

app.use(function noCache(req, res, next) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', 0)
  next()
})

app.use(flash())

// connect to database
mongoose.connect(config.database)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.on('connected', console.error.bind(console, 'MongoDB connection OK!'))

var questions = require('./app/routers/questions')
app.use('/questions/', questions)

app.listen(port)
console.log('Server on: http://localhost:' + port)
