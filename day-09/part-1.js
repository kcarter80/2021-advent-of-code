// started 9:40pm 12/9/2021
// finished 10:15pm

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let heightmap = new Array
readInterface.on('line', function(line) {
    heightmap.push(line)
}).on('close', function() {
    let riskLevelsSum = 0
    for(let i in heightmap) {
        i = parseInt(i)
        for (let ii in heightmap[i]) {
            ii = parseInt(ii)
            let thisHeight = parseInt(heightmap[i][ii])
            if (
                (heightmap[i-1] == undefined || parseInt(heightmap[i-1][ii]) > thisHeight) &&      
                (heightmap[i+1] == undefined || parseInt(heightmap[i+1][ii]) > thisHeight) &&
                (heightmap[i][ii-1] == undefined || parseInt(heightmap[i][ii-1]) > thisHeight) &&
                (heightmap[i][ii+1] == undefined || parseInt(heightmap[i][ii+1]) > thisHeight)
            ) {
                riskLevelsSum += 1 + thisHeight
            }
          }
    }
    console.log(riskLevelsSum)
})

