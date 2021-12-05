// started 1:50am 12/5/2021
// finished 2:59am
function displayDiagram(diagram) {
    diagram.forEach(y => {
        y.forEach(x => {
            if (x == 0) process.stdout.write('.')
            else process.stdout.write(x.toString())
        })
        process.stdout.write('\n')
    })
}

function countOverlaps(diagram) {
    let overlaps = 0
    diagram.forEach(y => {
        y.forEach(x => {
            if (x > 1) overlaps += 1
        })
    })
    return overlaps
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let lines = new Array
readInterface.on('line', function(line) {
    let pointStrings = line.split(' -> ')
    lines.push({
        x1: parseInt(line.split(' -> ')[0].split(',')[0]),
        y1: parseInt(line.split(' -> ')[0].split(',')[1]),
        x2: parseInt(line.split(' -> ')[1].split(',')[0]),
        y2: parseInt(line.split(' -> ')[1].split(',')[1])
    })
}).on('close', function() {
    // determining the max coordinate
    let max = 0
    lines.forEach(coordinates => {
        if (coordinates.x1 > max) max = coordinates.x1
        if (coordinates.y1 > max) max = coordinates.y1
        if (coordinates.x2 > max) max = coordinates.x2
        if (coordinates.y2 > max) max = coordinates.y2
    });
    // creating a diagram of appropriate size
    let diagram = new Array(max + 1)
    for(let i = 0; i < diagram.length; i++) {
        diagram[i] = new Array(max + 1).fill(0)
    }
    // adding lines to diagram
    // todo: this could be consolidated
    lines.forEach(coordinates => {
        if (coordinates.y1 == coordinates.y2 && coordinates.x1 < coordinates.x2) {
            for (let i = coordinates.x1; i <= coordinates.x2; i++) diagram[coordinates.y1][i] += 1 
        }
        if (coordinates.y1 == coordinates.y2 && coordinates.x1 > coordinates.x2) {
            for (let i = coordinates.x2; i <= coordinates.x1; i++) diagram[coordinates.y1][i] += 1 
        }
        if (coordinates.x1 == coordinates.x2 && coordinates.y1 < coordinates.y2) {
            for (let i = coordinates.y1; i <= coordinates.y2; i++) diagram[i][coordinates.x1] += 1 
        }
        if (coordinates.x1 == coordinates.x2 && coordinates.y1 > coordinates.y2) {
            for (let i = coordinates.y2; i <= coordinates.y1; i++) diagram[i][coordinates.x1] += 1 
        }
    })
    displayDiagram(diagram)
    console.log(countOverlaps(diagram))
})