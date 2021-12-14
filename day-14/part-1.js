// started 12/13/2021 9:11 pm
// finished 12/13/2021 9:45 pm
function processStep(polymer,pairInsertionRules) {
    for (let i = 1; i < polymer.length; i++){
        //console.log('evaluating',i,polymer[i-1]+polymer[i])
        if (pairInsertionRules[polymer[i-1]+polymer[i]]) {
            polymer = polymer.slice(0, i) + pairInsertionRules[polymer[i-1]+polymer[i]] + polymer.slice(i)
            i++
        }
    }
    return polymer
}

function score(polymer) {
    let charMap = {};
    // create character map
    for (let char of polymer) {
        if (charMap[char]) charMap[char]++
        else charMap[char] = 1
    }
    let max = 0
    let min = null
    for (let char in charMap) {
        if (min == null) min = charMap[char]
        if (charMap[char] < min) {
            min = charMap[char]
        }
        if (charMap[char] > max) {
            max = charMap[char]
        } 
    }
    //console.log(min,max)
    return max - min
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1')
})

let polymer
let pairInsertionRules = {}
readInterface.on('line', function(line) {
    if (line.length) {
        if (line.includes('>')) {
            let splitLine = line.split(' -> ')
            pairInsertionRules[splitLine[0]] = splitLine[1]
        } else {
            polymer = line
        }
    }
}).on('close', function() {
    for(let i = 0; i < 10; i++) {
        polymer = processStep(polymer,pairInsertionRules)
        //console.log(polymer)
    }
    console.log(score(polymer))
})