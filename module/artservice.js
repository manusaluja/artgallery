var MongoClient = require('mongodb').MongoClient;
exports.saveArt = function(req, res){
    console.log('Adding Art from the service');
    var art = req.body;
    console.log(art);
    
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
    if(err) throw err;
    
    console.log('connected to the art database.');
    db.collection('art_objects').insert(art, function(err, inserted) {
        if(err) throw err;
        console.log(inserted);
        console.dir("Successfully inserted to the Art collection : " + JSON.stringify(art));
        db.close();
        res.json({ message: 'Art Added', isCompleted : 1, user : inserted });	

    });

});
    
};
        exports.validate = function(req, res)
        {
                console.log('Validating');
                    var login = req.body;
                    console.log(login);

        };
