var MongoClient = require('mongodb').MongoClient;
exports.save = function(req, res){
    console.log('Adding Order from the service');
    var user = req.body;
    console.log(user);
    
    MongoClient.connect('mongodb://localhost:27017/art', function(err, db) {
    if(err) throw err;
    
    console.log('connected to the art database.');
    db.collection('users').insert(user, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted to the User collection : " + JSON.stringify(user));

        return db.close();
    });

});
    
    res.json({ message: 'User Registered', isCompleted : 1 });	
};