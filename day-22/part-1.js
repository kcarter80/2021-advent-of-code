// .5 hours

const readline = require('readline')
const fs = require('fs')
const { text } = require('stream/consumers')
const { listeners } = require('process')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})


let rebootSteps = []
readInterface.on('line', function(line) {
    let dimensions = line.split(' ')[1].split(',')
    for(let i = 0; i<=2; i++) {
        dimensions[i] = dimensions[i].split('..')
        dimensions[i][0] = parseInt(dimensions[i][0].substring(2))
        dimensions[i][1] = parseInt(dimensions[i][1])        
    }
    rebootSteps.push({
        on: line[1] == 'n',
        dimensions: dimensions
    })
}).on('close', function() {
    let reactor = new Object
    rebootSteps.forEach(rebootStep => {
        console.log(rebootStep)
        for(let x = rebootStep['dimensions'][0][0]; x <= rebootStep['dimensions'][0][1]; x++)
            for(let y = rebootStep['dimensions'][1][0]; y <= rebootStep['dimensions'][1][1]; y++)
                for(let z = rebootStep['dimensions'][2][0]; z <= rebootStep['dimensions'][2][1]; z++) {
                    if(x >= -50 && x <= 50 && y >= -50 && y <= 50 && z >= -50 && z <= 50)
                        reactor[`${x},${y},${z}`] = rebootStep['on']
                }
    })
    console.log(Object.values(reactor).filter(value => value).length)
})