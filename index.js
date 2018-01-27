var http       = require('http'),
    formidable = require('formidable'),
    fs         = require('fs'),
    file       = require('./modules/file');

var server = http.createServer(function(req, res){

    if (req.url == '/fileupload') {

        var base = process.env.PWD
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            
            var oldpath = files.filetoupload.path;
            var newpath = base + '/files/input.txt'
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                
                file(newpath);

                res.end();
            });
        });
    } else {
        
        res.write("<h1>Where's Sophia</h1>");
        res.write("<label>Input TXT</label>");
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload" accept=".txt"><br><br>');
        res.write('<input type="submit" value="Send">');
        res.write('</form>');
        res.end();
    }
});

server.listen(3000, function(){
    console.log('Server run in http://localhost:3000');
});