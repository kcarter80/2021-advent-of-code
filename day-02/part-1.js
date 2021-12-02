// started 9:02am 12/2/2021
// finished 9:19am
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
});

var instructions = new Array;

readInterface.on('line', function(line) {
    const splitLine = line.split(' ');
    instructions.push({
        instruction: splitLine[0],
        distance: parseInt(splitLine[1])
    });
}).on('close', function() {
    let horizontalPosition = 0
    let depth = 0
    for (let i = 0; i < instructions.length; i++) {
        switch(instructions[i].instruction) {
            case 'up':
                depth -= instructions[i].distance
                break;
            case 'down':
                depth += instructions[i].distance
                break;
            case 'forward':
                horizontalPosition += instructions[i].distance

        }
    }
    console.log(horizontalPosition,depth,horizontalPosition*depth)
});