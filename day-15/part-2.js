// started 12/15/2021 3:19 pm
// finished 9:57 pm

// structure for information of each cell
class node {
    constructor(cost, distance, visited) {
        this.cost = cost
        this.distance = distance
        this.visited = visited
    }
}

function drawCave(cave) {
    let size = Math.sqrt(Object.keys(cave).length)
    let csses = [] 
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let thisNode = cave[`${x},${y}`]
            if (thisNode.visited) process.stdout.write("\u001b[1;31m")
            process.stdout.write(thisNode.cost.toString())
            if (thisNode.visited) process.stdout.write("\u001b[0m")
        }
        process.stdout.write('\n')
    }
}

function enlargeCave(cave) {
    let size = Math.sqrt(Object.keys(cave).length)
    for (let x = 0; x < size*5; x++) {
        for (let y = 0; y < size*5; y++) {
            if (x >= size || y >= size) {
                let equivalentX = x - Math.floor(x/size) * size
                let equivalentY = y - Math.floor(y/size) * size
                let cost = cave[`${equivalentX},${equivalentY}`].cost + Math.floor(x/size) + Math.floor(y/size)
                if (cost > 9) cost = cost - 9
                cave[`${x},${y}`] = new node(cost, Number.MAX_VALUE, false)
            }
        }
    }
    return cave
}

function cost(cave,x,y) {
    let buckets = { 0: ['0,0']}
    let time1 = 0
    let time7 = 0
    let time3 = 0
    let start, finish
    let caveLength = Math.sqrt(Object.keys(cave).length)
    while (true) {
        //drawCave(cave)
        //console.log(buckets)
        // find the unvisited node that is marked with the smallest tentative distance
        let i = 0
        while(!(i in buckets)) i++
        let currentNode = buckets[i].pop()
        let currentX = parseInt(currentNode.split(',')[0])
        let currentY = parseInt(currentNode.split(',')[1])
        if (currentX == x && currentY == y) return cave[`${x},${y}`].distance 
        if (buckets[i].length == 0) delete buckets[i]

        // find the inbounds neighbors
        neighborNodes = []     
        if (currentX - 1 >= 0) neighborNodes.push(`${currentX - 1},${currentY}`)
        if (currentY - 1 >= 0) neighborNodes.push(`${currentX},${currentY - 1}`)
        if (currentX + 1 < caveLength) neighborNodes.push(`${currentX + 1},${currentY}`)
        if (currentY + 1 < caveLength) neighborNodes.push(`${currentX},${currentY + 1}`)

        // consider all of its unvisited neighbors and calculate their tentative distances through the current node
        neighborNodes.forEach( neighborNode => {
            if (cave[neighborNode].visited == false) {
                let tentativeDistance = cave[currentNode].distance + cave[neighborNode].cost
                if (tentativeDistance < cave[neighborNode].distance) {                   
                    // if this neighbor already had a distance
                    if(cave[neighborNode].distance != Number.MAX_VALUE) {
                        // then move it from its old distance bucket
                        console.log('UPDATING',neighborNode,cave[neighborNode].distance,tentativeDistance)
                        if (buckets[neighborNode.distance].length == 1) delete buckets[neighborNode.distance]
                        else buckets[neighborNode.distance] = buckets[neighborNode.distance].filter( node => node != neighborNode )
                    }
                    // add this neighbor to the proper distance bucket
                    if (tentativeDistance in buckets)
                        buckets[tentativeDistance].push(neighborNode)
                    else
                        buckets[tentativeDistance] = [neighborNode]
                    // update the cave
                    cave[neighborNode].distance = tentativeDistance
                }
            } 
        })

        // When we are done considering all of the unvisited neighbors of the current node,
        // mark the current node as visited and remove it from the unvisited set.
        // A visited node will never be checked again.
        cave[currentNode].visited = true
    }
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let y = 0
let cave = {}
readInterface.on('line', function(line) {
    for (let x = 0; x < line.length; x++) {
        cave[`${x},${y}`] = new node(parseInt(line[x]), Number.MAX_VALUE, false)
    }
    y++
}).on('close', function() {
    // don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total
    cave['0,0'].distance = 0  
    cave = enlargeCave(cave)
    //console.log('englarged')
    size = Math.sqrt(Object.keys(cave).length)
    console.log(cost(cave,size-1,size-1))
})