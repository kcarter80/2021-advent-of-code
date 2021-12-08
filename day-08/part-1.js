// started 12/8/2021 6:50am
// finished 7:14am
const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let count = 0
readInterface.on('line', function(line) {
    let outputValues = line.split(' | ')[1].split(' ')
    outputValues.forEach(value => {
        if ([2,3,4,7].includes(value.length)) count += 1
    })
}).on('close', function() {
    console.log(count)
})