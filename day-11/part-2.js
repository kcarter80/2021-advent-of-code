// started 12/10/2021 11:21 pm
// finished 12/10/2021 11:27 pm
function displayOctopodes(octopodes) {
    octopodes.forEach(y => {
        y.forEach(x => {
            process.stdout.write(x.toString())
        })
        process.stdout.write('\n')
    })
}

function executeStep(octopodes) {
    let numFlashes = 0
    for(let y = 0; y < octopodes.length; y++) {
        for(let x = 0; x < octopodes[0].length; x++) {
            octopodes[y][x] += 1
            if (octopodes[y][x] > 9) numFlashes++
        }
    }
    while(numFlashes > 0) {
        numFlashes = 0
        for(let y = 0; y < octopodes.length; y++) {
            for(let x = 0; x < octopodes[0].length; x++) {
                if(octopodes[y][x] != 'F' && octopodes[y][x] > 9) {
                    octopodes[y][x] = 'F'
                    numFlashes++
                    if(y-1 >= 0) {
                        if (x-1 >= 0 && octopodes[y-1][x-1] != 'F') octopodes[y-1][x-1]++
                        if (octopodes[y-1][x] != 'F') octopodes[y-1][x]++
                        if (x+1 < octopodes.length && octopodes[y-1][x+1] != 'F') octopodes[y-1][x+1]++
                    }
                    if (x-1 >= 0 && octopodes[y][x-1] != 'F') octopodes[y][x-1]++
                    if (x+1 < octopodes.length && octopodes[y][x+1] != 'F') octopodes[y][x+1]++
                    if(y+1 < octopodes.length) {
                        if (x-1 >= 0 && octopodes[y+1][x-1] != 'F') octopodes[y+1][x-1]++
                        if (octopodes[y+1][x] != 'F') octopodes[y+1][x]++
                        if (x+1 < octopodes.length && octopodes[y+1][x+1] != 'F') octopodes[y+1][x+1]++
                    }
                }
            }
        } 
    }
    let flashes = 0
    for(let y = 0; y < octopodes.length; y++) {
        for(let x = 0; x < octopodes[0].length; x++) {
            if (octopodes[y][x] == 'F') {
                octopodes[y][x] = 0
                flashes++
            }
        }
    }
    return {'octopodes': octopodes, 'flashes': flashes}
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let size = 10
// creates a size by size array
let octopodes = new Array(size)
for (let i = 0; i < octopodes.length; i++) {
    octopodes[i] = new Array(size);
}
let y = 0
readInterface.on('line', function(line) {
    for (let x = 0; x < line.length; x++) {
        octopodes[y][x] = parseInt(line[x])
    }
    y++
}).on('close', function() {
    let i = 1
    let executionResult = executeStep(octopodes)
    while(executionResult['flashes'] != 100) {
        executionResult = executeStep(octopodes)
        octopodes = executionResult['octopodes']
        i++
    }
    console.log(i)
})