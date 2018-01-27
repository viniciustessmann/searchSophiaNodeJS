var LineByLineReader = require('line-by-line');
var fs = require('fs');

module.exports = function (path) {
    
    var rooms = [];
    var roomsObj = [];
    var count = countLine(path);
    var stringToPrint = '';

    lr = new LineByLineReader(path);

    lr.on('error', function (err) {
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        var line = line.split(';');

        if (line != "") {
            rooms.push(line);
        }  
    });

    lr.on('end', function () {  

        for (var i = 0; i<count; i++) {
            roomsObj[i];
            for (var z=0; z<rooms[i].length; z++) {
                roomsObj[i] = new Array();
            }
        }

        for (var i = 0; i<count; i++) {
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

        organize(roomsObj);
    });
}

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

        item.sort(dynamicSort("score"));

        item.forEach(function (row) {
            stringToPrint += row.name + ',';
            
        });

        stringToPrint += "\r\n";
    })

    writeLine(stringToPrint);

}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 0 : 1;
        return result * sortOrder;
    }
}

function writeLine(string) {

    var fs = require('fs');
    fs.writeFile(process.env.PWD + '/files/output.txt', string, function(err) {
    }); 
}