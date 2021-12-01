// finished 10pm
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
});

var depths = new Array;

readInterface.on('line', function(line) {
    depths.push(parseInt(line));
}).on('close', function() {
        let increases = 0, i = 0;
        while (depths[i+3] != undefined) {
            if (depths[i] < depths[i+3]) {
                increases += 1
                console.log(i,depths[i],'increased')
            } else if (depths[i] == depths[i+3]) {
                console.log(i,depths[i],'no change')
            }
            else {
                console.log(i,depths[i],'decreased')
            }
            i+=1
        }
        console.log(increases);
});