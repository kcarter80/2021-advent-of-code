// 10 hours, but over 5 days
function noCuboidOverlap(cuboid1,cuboid2) {
    if (
        (cuboid1[0][1] < cuboid2[0][0] || cuboid1[0][0] > cuboid2[0][1]) || 
        (cuboid1[1][1] < cuboid2[1][0] || cuboid1[1][0] > cuboid2[1][1]) ||
        (cuboid1[2][1] < cuboid2[2][0] || cuboid1[2][0] > cuboid2[2][1])
    ) return true
    else return false
}

function nonOverlappingSegments(existingCuboid,cuboidToSplit) {
    let nonOverlappingSegments = new Array

    // if there's any volume to left
    if(cuboidToSplit[0][0] < existingCuboid[0][0]) {
        nonOverlappingSegments.push([
            [cuboidToSplit[0][0],existingCuboid[0][0]-1],   // just the x to the left
            [cuboidToSplit[1][0],cuboidToSplit[1][1]],      // all the y
            [cuboidToSplit[2][0],cuboidToSplit[2][1]]       // all the z
        ])
    }

    // if there's any volume to the right
    if(cuboidToSplit[0][1] > existingCuboid[0][1]) {
        nonOverlappingSegments.push([
            [existingCuboid[0][1]+1,cuboidToSplit[0][1]],   // see above
            [cuboidToSplit[1][0],cuboidToSplit[1][1]],
            [cuboidToSplit[2][0],cuboidToSplit[2][1]]
        ])
    }

    // if there's any volume below
    if(cuboidToSplit[1][0] < existingCuboid[1][0]) {
        nonOverlappingSegments.push([
            // already have the left and right x, so just need inside the new cuboid x-es
            [ Math.max(existingCuboid[0][0],cuboidToSplit[0][0]), Math.min(existingCuboid[0][1],cuboidToSplit[0][1]) ],
            [cuboidToSplit[1][0],existingCuboid[1][0]-1],   // just the y below
            [cuboidToSplit[2][0],cuboidToSplit[2][1]]           // all the z
        ])
    }

    // if there's any volume above
    if(cuboidToSplit[1][1] > existingCuboid[1][1]) {
        nonOverlappingSegments.push([
            // already have the left and right x, so just need inside the new cuboid x-es
            [ Math.max(existingCuboid[0][0],cuboidToSplit[0][0]), Math.min(existingCuboid[0][1],cuboidToSplit[0][1]) ],
            [existingCuboid[1][1]+1,cuboidToSplit[1][1]],   // just the y above
            [cuboidToSplit[2][0],cuboidToSplit[2][1]]           // all the z
        ])
    }

    // if there's any volume in z-only "bottom"
    if(cuboidToSplit[2][0] < existingCuboid[2][0]) {
        nonOverlappingSegments.push([
            // already have the left and right x,
            // already have the below and above y,
            // so just need inside the new cuboid x-es and y-s
            [ Math.max(existingCuboid[0][0],cuboidToSplit[0][0]), Math.min(existingCuboid[0][1],cuboidToSplit[0][1]) ],
            [ Math.max(existingCuboid[1][0],cuboidToSplit[1][0]), Math.min(existingCuboid[1][1],cuboidToSplit[1][1]) ],
            [cuboidToSplit[2][0],existingCuboid[2][0]-1]
        ])
    }

    // if there's any volume in z-only "top"
    if(cuboidToSplit[2][1] > existingCuboid[2][1]) {
        nonOverlappingSegments.push([
            // already have the left and right x,
            // already have the below and above y,
            // so just need inside the new cuboid x-es and y-s
            [ Math.max(existingCuboid[0][0],cuboidToSplit[0][0]), Math.min(existingCuboid[0][1],cuboidToSplit[0][1]) ],
            [ Math.max(existingCuboid[1][0],cuboidToSplit[1][0]), Math.min(existingCuboid[1][1],cuboidToSplit[1][1]) ],
            [existingCuboid[2][1]+1,cuboidToSplit[2][1]]
        ])
    }
    return nonOverlappingSegments
}

const readline = require('readline')
const fs = require('fs')
const { text } = require('stream/consumers')
const { listeners } = require('process')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-2'),
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
    let cuboids = new Array
    // the first step is assumed to be an "ON" step
    cuboids.push(rebootSteps[0].dimensions)
    // remove the first step since we already added it
    rebootSteps.shift()
    rebootSteps.forEach(rebootStep => {
        if (rebootStep.on) {
            // strategy: when overlaps occur with a previously vetted 
            // cuboids, break up the new entrant into new cuboids
            let i = 0
            let cuboidsToAdd = [rebootStep.dimensions]
            while(i < cuboids.length) {
                let existingCuboid = cuboids[i]
                let ii = 0
                while(ii < cuboidsToAdd.length) {
                    let newCuboid = cuboidsToAdd[ii]
                    // check if new cuboid overlaps with the cuboid we're currently looking at
                    if (noCuboidOverlap(newCuboid,existingCuboid)) {
                        //console.log('this existing cuboid is clear of the new cuboid')
                        ii++
                    } else {
                        //console.log('overlap!')
                        // remove this cuboid to add
                        cuboidsToAdd.splice(ii,1)
                        // get nonoverlapping segments
                        let replacementCuboids = nonOverlappingSegments(existingCuboid,newCuboid)
                        cuboidsToAdd = replacementCuboids.concat(cuboidsToAdd)
                        ii += replacementCuboids.length
                    }
                }
                i++
            }
            cuboids = cuboids.concat(cuboidsToAdd)  
        } else {
            let i = 0
            while(i < cuboids.length) {
                let existingCuboid = cuboids[i]
                let offCuboid = rebootStep.dimensions
                if (noCuboidOverlap(existingCuboid,offCuboid)) {
                    //console.log('nothing to turn off')
                    i++
                } else {
                    // the existing cuboid and the off cuboid have an overlap
                    //console.log('something to turn off')
                    // remove the old cuboid
                    let oldCuboid = cuboids.splice(i,1)[0]
                    let replacementCuboids = nonOverlappingSegments(offCuboid,oldCuboid)
                    // replace the old cuboid with cuboids of the allowed space
                    // prepend the new ones, since we're going to increment i and
                    // don't want to miss existing cuboids
                    cuboids = replacementCuboids.concat(cuboids)
                    i += replacementCuboids.length
                }
            }
        }
    })
    //console.log(cuboids)
    let volume = 0
    cuboids.forEach(cuboid => {
        volume += (1+cuboid[0][1]-cuboid[0][0]) * (1+cuboid[1][1]-cuboid[1][0]) * (1+cuboid[2][1]-cuboid[2][0])
    })
    console.log(volume)
})