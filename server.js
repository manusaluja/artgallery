var express = require('express'),
    app = express(),
    register = require('./module/login');
    uploadImage = require('./module/uploadImage');
    bodyParser = require('body-parser');
app.use(express.static('www'));
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; 		// set our port

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api111!' });	
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/welcome', function(req, res) {
	res.json({ message: 'hooray! hooray!hooray!' });	
});

router.post('/register',register.save);

app.post('/uploadImage',multipartMiddleware, uploadImage.save)
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
router.post('/login',register.validate);
app.use('/api', router);


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
