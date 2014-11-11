var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


exports.saveArt = function(req, res){
    
    console.log('Adding Art from the service');
    var art = req.body;
    var artistId = art.artistId;
    art._id = new BSON.ObjectID(art._id);
    console.log(art);
    
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('art_objects').save(art, function(err, inserted) {
            if(err) throw err;
            console.log(inserted);
            console.dir("Successfully inserted to the Art collection : " + JSON.stringify(art));
            db.close();
            MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('art_objects').find({artistId : artistId}).toArray(function(err, arts) {
            if(err) throw err;
            
            db.close();
            res.json({ message: 'Arts', isCompleted : 1, artsArray : arts });	

        });

    });
            //res.json({ message: 'Art Added', isCompleted : 1, user : inserted });	

        });

    });
    
};

exports.deleteArt = function(req, res){
    console.log('Deleting Art from the service');
    var art = req.body;
    
    console.log(art);
    art._id = new BSON.ObjectID(art._id);
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('art_objects').remove({_id:art._id}, function(err, inserted) {
            if(err) throw err;
            console.log(inserted);
            console.dir("Successfully Deleted from the Art collection : " + JSON.stringify(art));
            db.close();
            res.json({ message: 'Art Deleted', isCompleted : 1 });	

        });

    });
    
};
exports.saveExhibition = function(req, res){
    
    console.log('Adding Exhibition from the service');
    var exhibtion = req.body;
    var artistId = exhibtion.artistId;

    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('exhibitions').save(exhibtion, function(err, insertedEx) {
            if(err) throw err;
            console.log(insertedEx);
            console.dir("Successfully inserted to the Exhibition collection : " + JSON.stringify(insertedEx));
            db.close();
            MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('exhibitions').find({artistId : artistId}).toArray(function(err, exhibitionArray) {
            if(err) throw err;
            
            db.close();
            res.json({ message: 'Exhibitions', isCompleted : 1, exhibitionArray : exhibitionArray });	

        });

    });
            //res.json({ message: 'Art Added', isCompleted : 1, user : inserted });	

        });

    });
    
};

exports.getAllArts = function(req, res){

    var query = {artistId : req.body.artistId};
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('art_objects').find(query).toArray(function(err, arts) {
            if(err) throw err;
            
            db.close();
            res.json({ message: 'Arts', isCompleted : 1, artsArray : arts });	

        });

    });

};

exports.postComment = function(req, res){

     var comment = req.body;
    var artReqId = comment.artId;
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
        db.collection('comments').insert(comment, function(err, arts) {
            if(err) throw err;
            var query = {artId : artReqId }
            db.collection('comments').find(query).toArray(function(err, commentsArray){
            if(err) throw err;
                
                
                res.json({ message: 'Comments', isCompleted : 1, comments : commentsArray });	
            });
            

        });



    });
                        
}

exports.getComments = function(req, res){

     var artReqId = req.body.artId;
console.log(req.body);
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;

        console.log('connected to the art database.');
            var query = {artId : artReqId }
            db.collection('comments').find(query).toArray(function(err, commentsArray){
            if(err) throw err;
               res.json({ message: 'Comments', isCompleted : 1, comments : commentsArray });	
            });
            
        });
                        
}


exports.homepage = function(req, res){

    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
        if(err) throw err;
        console.log('connected to the art database.');
        var artists = {};
        var arts = {}
        db.collection('users').find().toArray(function(err, artistsArray) {
            if(err) throw err;
             
            db.collection('art_objects').find().toArray(function(err, artistworks) {
                        if(err) throw err;
            res.json({ message: 'Homepage', isCompleted : 1, artistsArray : artistsArray, arts: artistworks });	                
                        
            });
            
        });

       
        


    });

};
