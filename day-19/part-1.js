// 5 hours? main hard part was coming up with the orientations
function orientations(scanner) {
    let orientations = new Array(24)
    for (let i = 0; i < orientations.length; i++) {
        orientations[i] = new Array
    }

    /*
    1,2,3
    2,-1,3
    -1,-2,3
    -2,1,3

    1,-2,-3
    -2,-1,-3
    -1,2,-3
    2,1,-3

    3,2,-1
    3,1,2
    3,-2,1
    3,-1,-2

    -3,2,1
    -3,-1,2
    -3,-2,-1
    -3,1,-2

    2,3,1
    -1,3,2
    -2,3,-1
    1,3,-2

    1,-3,2
    -2,-3,1
    -1,-3,-2
    2,-3,-1

    */

    scanner.forEach((beacon,i) => {
        orientations[0].push([beacon[0],beacon[1],beacon[2]])
        orientations[1].push([beacon[1],-beacon[0],beacon[2]])
        orientations[2].push([-beacon[0],-beacon[1],beacon[2]])
        orientations[3].push([-beacon[1],beacon[0],beacon[2]])
        orientations[4].push([beacon[0],-beacon[1],-beacon[2]])
        orientations[5].push([-beacon[1],-beacon[0],-beacon[2]])
        orientations[6].push([-beacon[0],beacon[1],-beacon[2]])
        orientations[7].push([beacon[1],beacon[0],-beacon[2]])
        orientations[8].push([beacon[2],beacon[1],-beacon[0]])
        orientations[9].push([beacon[2],beacon[0],beacon[1]])
        orientations[10].push([beacon[2],-beacon[1],beacon[0]])
        orientations[11].push([beacon[2],-beacon[0],-beacon[1]])
        orientations[12].push([-beacon[2],beacon[1],beacon[0]])
        orientations[13].push([-beacon[2],-beacon[0],beacon[1]])
        orientations[14].push([-beacon[2],-beacon[1],-beacon[0]])
        orientations[15].push([-beacon[2],beacon[0],-beacon[1]])
        orientations[16].push([beacon[1],beacon[2],beacon[0]])
        orientations[17].push([-beacon[0],beacon[2],beacon[1]])
        orientations[18].push([-beacon[1],beacon[2],-beacon[0]])
        orientations[19].push([beacon[0],beacon[2],-beacon[1]])
        orientations[20].push([beacon[0],-beacon[2],beacon[1]])
        orientations[21].push([-beacon[1],-beacon[2],beacon[0]])
        orientations[22].push([-beacon[0],-beacon[2],-beacon[1]])
        orientations[23].push([beacon[1],-beacon[2],-beacon[0]])
    });
    return orientations
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

// counts the max number of overlaps between two scanners
// returns the number of overlaps and the increments
function countOverlaps(scannerA, scannerB) {
    // line up each beacon in scannerA with each beacon in scannerB
    let returnObj = {
        maxMatches: null
    }
    for (let i = 0; i < scannerA.length; i++) {
        for(let ii = 0; ii < scannerB.length; ii++) {
            incrementX = scannerA[i][0] - scannerB[ii][0]
            incrementY = scannerA[i][1] - scannerB[ii][1]
            incrementZ = scannerA[i][2] - scannerB[ii][2]
            let scannerBCopy = JSON.parse(JSON.stringify(scannerB))
            let matches = 0
            for(let iii = 0; iii < scannerBCopy.length; iii++) {
                scannerBCopy[iii][0] += incrementX
                scannerBCopy[iii][1] += incrementY
                scannerBCopy[iii][2] += incrementZ
                for(let iv = 0; iv < scannerA.length; iv++) {
                    if (arrayEquals(scannerA[iv],scannerBCopy[iii])) matches += 1
                }
            }
            if(returnObj.maxMatches == null || matches > returnObj.maxMatches) {
                returnObj.maxMatches = matches
                returnObj.incrementX = incrementX
                returnObj.incrementY = incrementY
                returnObj.incrementZ = incrementZ
            }
        }
    }
    return returnObj
}

const readline = require('readline')
const fs = require('fs')
const { text } = require('stream/consumers')
const { listeners } = require('process')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let scanners = new Array
let scannerNumber
readInterface.on('line', function(line) {
    if (line.includes('scanner')) scannerNumber = line.slice(12).slice(0, -4)
    if (!scanners[scannerNumber]) scanners[scannerNumber] = new Array
    if(line.includes(','))
        scanners[scannerNumber].push( eval('[' + line + ']') )
}).on('close', function() {
    // skip the first scanner since it is the master scanner
    for(let i = 1; i < scanners.length; i++) {
        rotatedScanners = orientations(scanners[i])
        for(let ii = 0; ii < rotatedScanners.length; ii++) {
            let results = countOverlaps(scanners[0], rotatedScanners[ii])
            if (results.maxMatches >= 12) {
                console.log('scanner',i,results)
                // increment the beacons from the scanner with 12+ matches
                for(let iii = 0; iii < rotatedScanners[ii].length; iii++) {
                    rotatedScanners[ii][iii][0] += results.incrementX
                    rotatedScanners[ii][iii][1] += results.incrementY
                    rotatedScanners[ii][iii][2] += results.incrementZ
                }
                // add the beacons to the master scanner
                scanners[0] = scanners[0].concat(rotatedScanners[ii])
                // remove duplicates
                scanners[0] = scanners[0].map(JSON.stringify).reverse().filter((e, i, a) => a.indexOf(e, i+1) === -1).reverse().map(JSON.parse)
                // remove this scanner from the list              
                scanners.splice(i,1)
                i = 0
                console.log('scanners length',scanners.length,scanners[0].length)
                break
            }
        }
    }
})