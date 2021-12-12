// started 12/11/2021 11:44 pm
// paused 12/11/2021 12:00 am
// resumed 12/12/2021 7:00 am
// finished 12/12/2021 7:35 am
function hasAnyLowerCaseCaveBeenVisitedTwice(path) {
    visitedLowerCaseCaves = {}
    for (let i = 0; i < path.length; i++) {
        if(path[i].toLowerCase() == path[i]) {
            if (path[i] in visitedLowerCaseCaves) {
                return true
            }
            else visitedLowerCaseCaves[path[i]] = true
        }
    }
    return false
}

function findPaths(path,caves) {
    let paths = []
    // loop through the caves reachable from the cave at the end of this path
    caves[path[path.length-1]].forEach(cave => {
        // if it's an uppercase cave
        if(cave.toUpperCase() == cave) {
            paths = paths.concat(findPaths(path.concat(cave),caves))
        // this is a lowercase cave
        } else {
            // nevervisit the start cave
            if(cave != 'start') {
                // if this is the end cave
                if(cave == 'end') { 
                    paths.push(path.concat(cave))
                } else {
                    // if no lower case caves have been visited twice
                    if (!hasAnyLowerCaseCaveBeenVisitedTwice(path)) {
                        paths = paths.concat(findPaths(path.concat(cave),caves))
                    // a lower case cave HAS been visited twice
                    } else {
                        // if this lowercase cave has not already appeared
                        if (!path.includes(cave)) {
                            paths = paths.concat(findPaths(path.concat(cave),caves))
                        }
                    }
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
    console.log(findPaths([ 'start'],caves).length)
})