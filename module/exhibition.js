var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

exports.locations = function(req, res){
    
    console.log('Getting Locations from the service');
   
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('exhibitions').distinct('location', function(err, locations) {
            if(err) throw err;
            
            db.close();
           
            res.json({ message: 'Locations', isCompleted : 1, locations : locations });	

        });

    });
    
};

exports.exhibitions = function(req, res){
    
    console.log('Getting Locations from the service');
    var location = req.body.location;
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('exhibitions').find({location:location}).toArray(function(err, exhibitions) {
            if(err) throw err;
            
            db.close();
           
            res.json({ message: 'Locations', isCompleted : 1, exhibitions : exhibitions });	

        });

    });
    
};
