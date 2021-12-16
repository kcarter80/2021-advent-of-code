// started 12/15/2021 9:36 am
// finished 3:19 pm


// structure for information of each cell
class node {
    constructor(cost, distance, visited) {
        this.cost = cost
        this.distance = distance
        this.visited = visited
    }
}

function displayCave(cave) {
    cave.forEach(y => {
        y.forEach(x => {
            process.stdout.write(x.toString())
        })
        process.stdout.write('\n')
    })
}

function cost(cave,x,y) {
    while (true) {
        // find the unvisited node that is marked with the smallest tentative distance
        let currentNode = Object.keys(cave).filter( node => cave[node]['visited'] == false ).reduce(function(previousValue, currentValue) {
            return cave[previousValue].distance < cave[currentValue].distance ? previousValue : currentValue
        })
        let currentX = parseInt(currentNode.split(',')[0])
        let currentY = parseInt(currentNode.split(',')[1])

        //for(let i = 0; i<1000000000; i++) { let foo = 'bar' }


        // the algorithm can stop once the destination node has the smallest tentative distance among all "unvisited" nodes
        if (x == currentX && y == currentY) return cave[currentNode].distance

        // find the inbounds neighbors
        neighborNodes = []
        let caveLength = Math.sqrt(Object.keys(cave).length)
        if (currentX - 1 >= 0) neighborNodes.push(`${currentX - 1},${currentY}`)
        if (currentY - 1 >= 0) neighborNodes.push(`${currentX},${currentY - 1}`)
        if (currentX + 1 < caveLength) neighborNodes.push(`${currentX + 1},${currentY}`)
        if (currentY + 1 < caveLength) neighborNodes.push(`${currentX},${currentY + 1}`)

        // consider all of its unvisited neighbors and calculate their tentative distances through the current node
        neighborNodes.forEach( neighborNode => {
            if (cave[neighborNode].visited == false) {
                let tentativeDistance = cave[currentNode].distance + cave[neighborNode].cost
                if (tentativeDistance < cave[neighborNode].distance) cave[neighborNode].distance = tentativeDistance
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
    //console.log(cave)
    size = Math.sqrt(Object.keys(cave).length)
    console.log(cost(cave,size-1,size-1))
})