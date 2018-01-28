var http         = require('http'),
    fileModule   = require('./modules/fileModule'),
    file         = require('./modules/fileToDownload'),
    org          = require('./modules/organizeModule');

var server = http.createServer(function(req, res){

    if (req.url == '/fileupload') {

        fileModule.uploadFile(req).then(function(data){

            org.organize(process.env.PWD + '/files/input.txt').then(function(data) {

                fileModule.writeOutput(data).then(function(){

                    fileModule.readOutput().then(function(data){

                        res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename="output.txt"'});
                        res.end(data);
                    });        
                });
            });
        });

        
        // var form = new formidable.IncomingForm();


        // form.parse(req, function(err, fields, files) {

        //     var oldpath = files.filetoupload.path;
        //     var newpath = process.env.PWD + '/files/input.txt'
        //     fs.rename(oldpath, newpath, function (err) {
        //         if (err) throw err;

        //         res.write('Upload file now');
        //         // file(newpath);
        //         res.end();
        //     });
        // });
    } else {

        res.write("<h1>Where's Sophia</h1>");
        res.write("<label>Input TXT</label>");
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload" required accept=".txt"><br><br>');
        res.write('<input type="submit" value="Send">');
        res.write('</form>');
        res.end();
    }
});

server.listen(3000, function(){
    console.log('Server run in http://localhost:3000');
});
