/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fs = require('fs');

exports.save = function(req, res) {
    console.log('In the save method of upload Image.');
    console.log(req.files.file.path);


    fs.readFile(req.files.file.path, function(err, data) {
        // ...
        var newPath = '.\\public\\img\\intel\\' + req.files.file.name;
        fs.writeFile(newPath, data, function(err) {
            if(err) throw err;
            console.log('uploaded');
            var imgPath =req.files.file.name; 
           res.send(200,imgPath);
            //res.redirect("back");
        });
    });

};
