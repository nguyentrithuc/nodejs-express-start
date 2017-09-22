const express = require('express')
var mongoose = require('mongoose')
var passport = require('passport')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var _ = require('lodash')
var cors = require('cors')

var config = require('./config');

var app = express()

app.set('port', 9000)
// Add middleware for api
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(passport.initialize())
// CORS support
app.use(cors())
// User login
app.use('/user', require('./controllers/UserController'))
// Connect to mongoDB
mongoose.Promise = Promise
mongoose.connect(config.database,{useMongoClient: true})
mongoose.connection.once('open',function(){
    app.models = require('./models/index')
    var routes = require('./routes')
    _.each(routes, function(controller, route){
        app.use(route, controller(app, route))
    })
    app.listen(app.get('port'), function(){
        console.log("The app is listening on port " + app.get('port'))
    })
})
