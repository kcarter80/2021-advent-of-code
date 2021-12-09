// started 10:15pm 12/8/2021
// paused 10:28pm
// restarted 7:09am 12/9/2021
// finished 8:41am
function defineBasin(heightmap,y,x,basinKeys) {
    let aboveBasinKeys = {}
    let belowBasinKeys = {}
    let leftBasinKeys = {}
    let rightBasinKeys = {}
    let doAbove = false, doBelow = false, doLeft = false, doRight = false
    let thisHeight = heightmap[y][x]
    // check above
    if (!(`${y-1},${x}` in basinKeys)) {
        if(heightmap[y-1] != undefined
            && heightmap[y-1][x] != 9
            && heightmap[y-1][x] >= thisHeight) {
            
            basinKeys[`${y-1},${x}`] = true
            doAbove = true
        }
    }
    // check below
    if (!(`${y+1},${x}` in basinKeys)) {
        if(heightmap[y+1] != undefined
            && heightmap[y+1][x] != 9
            && heightmap[y+1][x] >= thisHeight) {

            basinKeys[`${y+1},${x}`] = true
            doBelow = true
        }
    }
    // check left
    if (!(`${y},${x-1}` in basinKeys)) {
        if(heightmap[y][x-1] != undefined
            && heightmap[y][x-1] != 9
            && heightmap[y][x-1] >= thisHeight) {

            basinKeys[`${y},${x-1}`] = true
            doLeft = true
        }
    }
    // check right
    if (!(`${y},${x+1}` in basinKeys)) {
        if(heightmap[y][x+1] != undefined
            && heightmap[y][x+1] != 9
            && heightmap[y][x+1] >= thisHeight) {

            basinKeys[`${y},${x+1}`] = true
            doRight = true
        }
    }
    if (doAbove) aboveBasinKeys = defineBasin(heightmap,y-1,x,basinKeys)
    if (doBelow) belowBasinKeys = defineBasin(heightmap,y+1,x,basinKeys)
    if (doLeft) leftBasinKeys = defineBasin(heightmap,y,x-1,basinKeys)
    if (doRight) rightBasinKeys = defineBasin(heightmap,y,x+1,basinKeys)
    
    return{...basinKeys, ...aboveBasinKeys, ...belowBasinKeys, ...leftBasinKeys, ...rightBasinKeys}
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let heightmap = new Array
readInterface.on('line', function(line) {
    heightmap.push(line)
}).on('close', function() {
    let basinSizes = new Array
    for(let i in heightmap) {
        i = parseInt(i)
        for (let ii in heightmap[i]) {
            ii = parseInt(ii)
            let thisHeight = parseInt(heightmap[i][ii])
            if (
                (heightmap[i-1] == undefined || parseInt(heightmap[i-1][ii]) > thisHeight) &&      
                (heightmap[i+1] == undefined || parseInt(heightmap[i+1][ii]) > thisHeight) &&
                (heightmap[i][ii-1] == undefined || parseInt(heightmap[i][ii-1]) > thisHeight) &&
                (heightmap[i][ii+1] == undefined || parseInt(heightmap[i][ii+1]) > thisHeight)
            ) {
                let basinKeys = {}
                basinKeys[`${i},${ii}`] = true
                basinSizes.push(Object.keys(defineBasin(heightmap,i,ii,basinKeys)).length)
                
            }
          }
    }
    basinSizes.sort((a, b) => b - a)
    console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])
})