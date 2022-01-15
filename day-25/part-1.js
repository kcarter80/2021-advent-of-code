// 2 hours

function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
}

function drawMap(map, maxX, maxY) {
    for (let y = 0; y <= maxY; y++) {
        for(let x = 0; x <= maxX; x++) {
            process.stdout.write(map[`${x},${y}`])
        }
        process.stdout.write('\n')
    }
    process.stdout.write('\n')
}

function takeEastStep(map,maxX,maxY) {
    let newMap = Object.assign({}, map);
    let destinationX
    for (let y = 0; y <= maxY; y++) {
        for(let x = 0; x <= maxX; x++) {
            if (map[`${x},${y}`] == '>') {
                destinationX = x + 1
                if (destinationX > maxX) destinationX = 0
                if (map[`${destinationX},${y}`] == '.') {
                    newMap[`${x},${y}`] = '.'
                    newMap[`${destinationX},${y}`] = '>'
                } else {
                    newMap[`${x},${y}`] = '>'
                }
            } 
        }
    }
    return newMap   
}

function takeSouthStep(map,maxX,maxY) {
    let newMap = Object.assign({}, map);
    let destinationY
    for (let y = 0; y <= maxY; y++) {
        for(let x = 0; x <= maxX; x++) {
            if (map[`${x},${y}`] == 'v') {
                destinationY = y + 1
                if (destinationY > maxY) destinationY = 0
                if (map[`${x},${destinationY}`] == '.') {
                    newMap[`${x},${y}`] = '.'
                    newMap[`${x},${destinationY}`] = 'v'
                } else {
                    newMap[`${x},${y}`] = 'v'
                }
            } 
        }
    }
    return newMap     
}


const readline = require('readline')
const fs = require('fs')
const { text } = require('stream/consumers')
const { listeners, nextTick } = require('process')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let map = {}
let maxX = null
let maxY = null
let y = 0
readInterface.on('line', function(line) {
    line.split('').forEach( (position, index) => {
        map[`${index},${y}`] = position 
        maxX = index
    })
    maxY = y++
}).on('close', function() {
    let oldMap
    let turn = 0
    do {
        turn += 1
        //drawMap(map,maxX,maxY)
        oldMap = Object.assign({}, map)
        map = takeEastStep(map,maxX,maxY)
        map = takeSouthStep(map,maxX,maxY)
    } while(!shallowEqual(oldMap,map))
    console.log('turn:',turn)
})
