// started 12/13/2021 8:50 am
// finished 8:52 am
// compares two hashes for equality
function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length && ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y)
}

function addDot(dots,x,y) {
    if(x in dots) {
        dots[x][y] = true
    } else {
        dots[x] = {[y]: true}
    }
    return dots
}

function removeDot(dots,x,y) {
    delete dots[x][y]
    if (Object.keys(dots[x]).length == 0)
        delete dots[x]
    return dots
}

function countDots(dots) {
    let dotCount = 0
    Object.keys(dots).forEach(x => {
        Object.keys(dots[x]).forEach(y => {
            dotCount++
        })
    })
    return dotCount
}

function displayTransparency(dots) {
    let maxX = 0
    let maxY = 0

    Object.keys(dots).forEach(x => {
        const parsedX = parseInt(x)
        if (parsedX > maxX) maxX = parsedX
        Object.keys(dots[x]).forEach(y => {
            const parsedY = parseInt(y)
            if (parsedY > maxY) maxY = parsedY
        })
    })
    for(let y = 0; y <= maxY; y++) {
        for(let x = 0; x <= maxX; x++) {
            if (x.toString() in dots && y.toString() in dots[x.toString()])
                process.stdout.write('#')
            else
                process.stdout.write('.')
        }
        process.stdout.write('\n')
    }
    console.log(countDots(dots))
}

function makeFold(dots,axis,value) {
    Object.keys(dots).forEach(x => {
        const parsedX = parseInt(x)
        Object.keys(dots[x]).forEach(y => {
            const parsedY = parseInt(y)
            if (axis == 'y' && parsedY > value) {
                dots = removeDot(dots,parsedX,parsedY)
                dots = addDot(dots,x,parsedY - (parsedY - value)*2)
            }
            if (axis == 'x' && parsedX > value) {
                dots = removeDot(dots,parsedX,parsedY)
                dots = addDot(dots,parsedX - (parsedX - value)*2,y)
            }
        })
    })
    return dots
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1')
})

let dots = {}
let folds = new Array
readInterface.on('line', function(line) {
    if (line.includes(',')) {
        let splitLine = line.split(',')
        dots = addDot(dots,splitLine[0],splitLine[1])
    }
    if (line.includes('fold')) {
        let splitLine = line.split('=')
        folds.push({axis: splitLine[0][splitLine[0].length-1],value: parseInt(splitLine[1])})
    }   
}).on('close', function() {
    console.log(dots,folds)
    folds.forEach(fold => {
        dots = makeFold(dots,fold['axis'],fold['value'])
    })
    displayTransparency(dots)
})