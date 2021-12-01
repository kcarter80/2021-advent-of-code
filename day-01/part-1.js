// started 9:20pm
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
});

var depths = new Array;

readInterface.on('line', function(line) {
    // eesh. took me a while to debug that i needed to parse to an int
    depths.push(parseInt(line));
}).on('close', function() {
        let increases = 0
        for (var i = 0; i < depths.length; i++) {
                if (i==0) {
                    console.log(i,depths[i],'N/A')
                }
                else if (depths[i-1] < depths[i]) {
                    increases += 1
                    console.log(i,depths[i],'increased')
                }
                else {
                    console.log(i,depths[i],'decreased')
                }
        }
        console.log(increases);
});