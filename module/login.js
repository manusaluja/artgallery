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
        console.log(inserted);
        console.dir("Successfully inserted to the User collection : " + JSON.stringify(user));
        db.close();
        res.json({ message: 'User Registered', isCompleted : 1, user : inserted });	

    });

});
    
};
exports.validate = function(req, res)
{
console.log('Validating');
    var login = req.body;
    console.log(login);
    MongoClient.connect('mongodb://localhost:27017/art',function(err,db)
 {
    if(err) throw err;
        console.log('connected to the art database.');
        db.collection('users').findOne({email: login.user, password: login.pass}, function(err, document){
            console.log(document);
            db.close();
            if(document){
            res.json({ message: 'User Found', isCompleted : 1, user : document });	

            } else{
                res.json({ message: 'User Not Found', isCompleted : 0 });	

            }
        });
        //findone(queryParams, cb(params){});
       
});
};
                        