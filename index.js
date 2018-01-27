var http       = require('http'),
    formidable = require('formidable'),
    fs         = require('fs'),
    file       = require('./modules/fileToDownload');

var server = http.createServer(function(req, res){

    if (req.url == '/fileupload') {

        var lines;
        var base = process.env.PWD
        var form = new formidable.IncomingForm();
        var data;

        form.parse(req, function(err, fields, files) {

            var oldpath = files.filetoupload.path;
            var newpath = base + '/files/input.txt'
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                
                file(newpath);
                var readStream = fs.createReadStream(base + '/files/output.txt', 'utf8');

                readStream.on('data', function(chunk) {  
                    data += chunk;
                }).on('end', function() {

                    var dataPrint = data.replace("undefined", "");

                    res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename="output.txt"'});
                    res.end(dataPrint);
                });
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