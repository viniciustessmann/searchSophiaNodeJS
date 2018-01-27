var fs = require('fs');

module.exports = function (path) {
    fs.readFile( path, function (err, data) {
        if (err) {
            throw err; 
        }
        console.log(data.toString());
    });   
}