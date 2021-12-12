// started 12/11/2021 9:30 pm
// finished 12/11/2021 11:44 pm
function findPaths(path,caves) {
    let paths = []
    // loop through the caves reachable from the cave at the end of this path
    caves[path[path.length-1]].forEach(cave => {
        // if it's an uppercase cave
        if(cave.toUpperCase() == cave) {
            paths = paths.concat(findPaths(path.concat(cave),caves))
        // this is a lowercase cave
        } else {
            // if the lowercase cave has not already appeared
            if (!path.includes(cave)) {
                if(cave != 'end') { 
                    paths = paths.concat(findPaths(path.concat(cave),caves))
                } else {
                    paths.push(path.concat(cave))
                }
            }
        }
    })
    return paths
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1')
})

let caves = {}

readInterface.on('line', function(line) {
    let cavesThisLine = line.split('-')

    if (!(cavesThisLine[0] in caves)) {
        caves[cavesThisLine[0]] = [cavesThisLine[1]]
    } else {
        caves[cavesThisLine[0]].push(cavesThisLine[1])
    }
    if (!(cavesThisLine[1] in caves)) {
        caves[cavesThisLine[1]] = [cavesThisLine[0]]
    } else {
        caves[cavesThisLine[1]].push(cavesThisLine[0])
    }
}).on('close', function() {
    let path=['start']
    console.log(findPaths(path,caves).length)
})