const express = require('express')
var mongoose = require('mongoose')
var auth = require('./auth')()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var cors = require('cors')

var config = require('./config');

var app = express()

app.set('port', 9000)
// Add middleware for api
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
// Authenticate request
app.use(auth.initialize())
// CORS support
app.use(cors())
// User login
app.use('/user', require('./controllers/UserController'))
// Connect to mongoDB
mongoose.Promise = Promise
mongoose.connect(config.database,{useMongoClient: true})

mongoose.connection.once('open',function(){
    // Application routes
    var dishRoutes = require('./routes/dishRoutes');
    var locationRoutes = require('./routes/locationRoutes');
    var storeRoutes = require('./routes/storeRoutes');
    dishRoutes(app);
    locationRoutes(app);
    storeRoutes(app);

    app.listen(app.get('port'), function(){
        console.log("The app is listening on port" + app.get('port'));
    });
});
