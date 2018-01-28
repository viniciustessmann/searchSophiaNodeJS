var fs = require('fs');
var formidable = require('formidable');
var LineByLineReader = require('line-by-line');

exports.readInput = function () {
  return new Promise(function (resolve, reject) {
      fs.readFile(process.env.PWD + '/files/input.txt', 'utf-8', function (err, data) {
        if (err) return reject(err) 
        resolve(data) 
      })
    })
};

exports.readOutput = function () {
  return new Promise(function (resolve, reject) {
      fs.readFile(process.env.PWD + '/files/output.txt', 'utf-8', function (err, data) {
        if (err) return reject(err) 
        resolve(data) 
      })
    })
};

exports.writeOutput = function (string) {
  return new Promise(function (resolve, reject) {
      fs.writeFile(process.env.PWD + '/files/output.txt', string,  function(err) {
        if(err) {
            return console.log(err);
        }
        resolve(true)
    }); 
  });
};

exports.uploadFile = function (req) {
  return new Promise(function (resolve, reject) {

        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {

            var oldpath = files.filetoupload.path;
            var newpath = process.env.PWD + '/files/input.txt'
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                resolve(true)
            });
        });
  });
}

exports.organize = function (path) {
  return new Promise(function (resolve, reject) {
    
  });
}
