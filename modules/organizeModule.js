var fs = require('fs');
var LineByLineReader = require('line-by-line');

exports.organize = function (path) {
    return new Promise(function (resolve, reject) {

        var rooms = [];
        var roomsObj = [];

        lr = new LineByLineReader(path);

        lr.on('error', function (err) {
            console.log(err);
        });
    
        lr.on('line', function (line) {
            var line = line.split(';');
    
            if (line != "") {
                rooms.push(line);
            }  
        });
    
        lr.on('end', function () {  
    
            for (var i = 0; i<countLine(path); i++) {
                roomsObj[i];
                for (var z=0; z<rooms[i].length; z++) {
                    roomsObj[i] = new Array();
                }
            }
    
            for (var i = 0; i<countLine(path); i++) {
                for (var z=0; z<rooms[i].length; z++) {
                    
                    var data = rooms[i][z].split(',');
                    roomsObj[i][z] = {
                        "name": data[0],
                        "chance": data[1],
                        "time": data[2],
                        "score": data[2] / data[1]
                    };
                }
            }
    
            resolve(organize(roomsObj));
        });
      })
  };


  function countLine(path) {
    var fs = require('fs');
    filePath = path;
    fileBuffer =  fs.readFileSync(filePath);
    to_string = fileBuffer.toString();
    split_lines = to_string.split("\n");
    return split_lines.length-1;
}

function organize(data) {

    var stringToPrint = '';
    data.forEach(function (item) {

        item.sort(compare);

        item.forEach(function (row) {
            stringToPrint += row.name + ',';
            
        });

        stringToPrint += "\r\n";
    })

    return stringToPrint;

}

function compare(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
        comparison = 1;
    } else if (scoreA < scoreB) {
        comparison = -1;
    }
    return comparison;
}


function writeLine(string) {

    return new Promise(function (fulfill, reject){
        fs.writeFile(process.env.PWD + '/files/output.txt', string,  function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    });
}