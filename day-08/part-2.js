// started 12/8/2021 7:14am
// finished 9:30am

// compares two hashes for equality
function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length && ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y)
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let numberSum = 0
readInterface.on('line', function(line) {
    // step 1:
    // count how many times each letter appears
    const appearances = {
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0
    }
    let letters = {
        'a':{...appearances},
        'b':{...appearances},
        'c':{...appearances},
        'd':{...appearances},
        'e':{...appearances},
        'f':{...appearances},
        'g':{...appearances}
    }
    line.split(' | ')[0].split(' ').forEach(signal => {     
        for (let letter in letters) {
            if (signal.includes(letter)) letters[letter][signal.length] += 1
        }
    })

    // step 2:
    // translate letters based on number of appearances
    // luckily, each letter has a unique signature of length appearances
    let translation = {}
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 0,'3': 1,'4': 0,'5': 3,'6': 3,'7': 1 }))] = 'a'
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 0,'3': 0,'4': 1,'5': 1,'6': 3,'7': 1 }))] = 'b'
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 1,'3': 1,'4': 1,'5': 2,'6': 2,'7': 1 }))] = 'c'
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 0,'3': 0,'4': 1,'5': 3,'6': 2,'7': 1 }))] = 'd'
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 0,'3': 0,'4': 0,'5': 1,'6': 2,'7': 1 }))] = 'e'
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 1,'3': 1,'4': 1,'5': 2,'6': 3,'7': 1 }))] = 'f'
    translation[Object.keys(letters).find(
        key => deepEqual(letters[key],{ '2': 0,'3': 0,'4': 0,'5': 3,'6': 3,'7': 1 }))] = 'g'
    // once we have the translated letters, the output numbers can be deduced from the output letter strings
    let lettersToNumbers = {
        'abcefg':'0',
        'cf':'1',
        'acdeg':'2',
        'acdfg':'3',
        'bcdf':'4',
        'abdfg':'5',
        'abdefg':'6',
        'acf':'7',
        'abcdefg':'8',
        'abcdfg':'9'
    }
    let outputs = line.split(' | ')[1].split(' ')
    let number = ''
    outputs.forEach( output => {
        let translatedOutput = ''
        for (let i = 0; i < output.length; i++) {
            // executing the letter translation
            translatedOutput += translation[output[i]]
        }
        // alphabetizing
        translatedOutput = translatedOutput.split('').sort().join('')
        number += lettersToNumbers[translatedOutput]
    })
    numberSum += parseInt(number)
}).on('close', function() {
    console.log(numberSum)
})