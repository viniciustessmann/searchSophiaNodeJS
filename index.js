var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-type": "text/plan"});
    res.write('Helo world!');
    res.end();
});

server.listen(3000, function(){
    console.log('Server run in http://localhost:3000');
});