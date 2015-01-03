var express = require('express'),
    app = express(),
    register = require('./module/login'),
    uploadImage = require('./module/uploadImage'),
    artService = require('./module/artservice'),
    exhibitionService = require('./module/exhibition')
    bodyParser = require('body-parser');  //for query params 

app.use(express.static('www'));        //it is for view part

var multipart = require('connect-multiparty');   // file upload
var multipartMiddleware = multipart();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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
router.post('/saveArt',artService.saveArt);
router.post('/deleteArt',artService.deleteArt);
router.post('/getAllArts',artService.getAllArts);
router.post('/saveExhibition',artService.saveExhibition);
router.post('/postComment', artService.postComment);
router.post('/getComments', artService.getComments);
router.post('/like', artService.like);
router.get('/homepage',artService.homepage);
router.get('/locations', exhibitionService.locations);
router.post('/exhibitions', exhibitionService.exhibitions);
router.post('/saveOrder', artService.saveOrder);
router.post('/viewOrder',artService.viewOrder);
app.post('/uploadImage',multipartMiddleware, uploadImage.save)
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
router.post('/login',register.validate);
app.use('/api', router);
app.set('port', 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
