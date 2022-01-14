// 3:30pm

// from https://medium.com/@chenzhenxi/fastest-way-to-select-the-ntn-digit-in-integer-in-javascript-216fa6f9dd71
function math(ntn, number){
    var len = Math.floor( Math.log(number) / Math.LN10 ) - ntn;
    return ( (number / Math.pow(10, len)) % 10) | 0;
}

const readline = require('readline')
const fs = require('fs')
const { text } = require('stream/consumers')
const { listeners, nextTick } = require('process')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let instructions = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
let inputIndex = -1
let thisInstruction
readInterface.on('line', function(line) {
    thisInstruction = line.substring(0,3)
    if (thisInstruction == 'inp') inputIndex++
    instructions[inputIndex].push({
        instruction: thisInstruction,
        values: line.slice(4).split(' ')
    })
}).on('close', function() {  
    let w,x,y,z,inputSoFar
    let results = { temp: 'entry' }

    for(let input = 0; input < 14; input++) {
        console.log('input',input,Object.keys(results).length)
        //console.log(results)
        if (input == 2) {
            results = {'9,1,10,270': 99}
        }

        for (const [result, alreadyInput] of Object.entries(results)) {
            delete results[result]
            for (let digit = 1; digit <= 9; digit++) {
                // if this is the first input
                if (input == 0) {
                    inputSoFar = digit
                    w = 0
                    x = 0
                    y = 0
                    z = 0
                } else {
                    let splitResult = result.split(',')
                    inputSoFar = parseInt('' + alreadyInput + digit)
                    w = parseInt(splitResult[0])
                    x = parseInt(splitResult[1])
                    y = parseInt(splitResult[2])
                    z = parseInt(splitResult[3])
                }
                let thisInputInstructions = instructions[input]
                thisInputInstructions.forEach(instruction => {
                    switch (instruction.instruction) {
                        case 'inp':
                            eval(`${instruction.values[0]} = ${digit}`)
                            break
                        case 'add':
                            eval(`${instruction.values[0]} = ${instruction.values[0]} + ${instruction.values[1]}`)
                            break                
                        case 'mul':
                            eval(`${instruction.values[0]} = ${instruction.values[0]} * ${instruction.values[1]}`)
                            break
                        case 'div':
                            eval(`${instruction.values[0]} = Math.trunc(${instruction.values[0]} / ${instruction.values[1]})`)
                            break
                        case 'mod':
                            eval(`${instruction.values[0]} = ${instruction.values[0]} % ${instruction.values[1]}`)
                            break
                        case 'eql':
                            eval(`${instruction.values[0]} = (${instruction.values[0]} == ${instruction.values[1]}) ? 1 : 0`)
                            break
                    }
                })
                //if (z < 9000) {
                    if (results[`${w},${x},${y},${z}`]) {
                        if (inputSoFar > results[`${w},${x},${y},${z}`])
                            results[`${w},${x},${y},${z}`] = inputSoFar
                    }
                    else results[`${w},${x},${y},${z}`] = inputSoFar
                //}
            }   
        }
    }
    
    //console.log(results)
    console.log(Object.values(results).length)

    let maxInput = null
    let resultKeys = Object.keys(results)
    for (let i = 0; i < resultKeys.length; i++) {
        if (resultKeys[i].split(',')[3] == 0) {
            if (!maxInput) maxInput = results[resultKeys[i]]
            else {
                if (results[resultKeys[i]] > maxInput) maxInput = results[resultKeys[i]]
            }
        }
    }
    console.log(maxInput)
})