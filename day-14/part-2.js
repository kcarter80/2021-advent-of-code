// started 12/13/2021 9:46 pm
// paused 12/13/2021 10:30 pm
// restarted 12/14/2021 7:18 am
// finished 12/14/2021 9:40 am
function processStep(state) {
    let countAdjustments = {}
    // looping through every pair
    Object.keys(state['pairs']).forEach(pair => {
        // removing this pair since it's going to be polymerized
        if (state['pairs'][pair]['count'] > 0) {
            if (pair in countAdjustments) {
                countAdjustments[pair] -= state['pairs'][pair]['count']
            } else {
                countAdjustments[pair] = -state['pairs'][pair]['count']
            }
        }
        // adding pairs made by this pair
        state['pairs'][pair]['makes'].forEach(newPair => {
            if (newPair in countAdjustments) countAdjustments[newPair] += state['pairs'][pair]['count']
            else countAdjustments[newPair] = state['pairs'][pair]['count']
        })
        // also need to add the letter added by this polymerization for scorekeeping later
        if (state['pairs'][pair]['count']) {
            const addedLetter = state['pairs'][pair]['makes'][0][1]
            if (addedLetter in letters) letters[addedLetter] += state['pairs'][pair]['count']
            else letters[addedLetter] = state['pairs'][pair]['count']
        }    
    })
    Object.keys(countAdjustments).forEach(pair => {
        state['pairs'][pair]['count'] += countAdjustments[pair]
    })

    return state
}

function score(letters) {
    let max = 0
    let min = null
    Object.keys(letters).forEach( letter => {
        if (min == null) min = letters[letter]
        if (letters[letter] < min) {
            min = letters[letter]
        }
        if (letters[letter] > max) {
            max = letters[letter]
        }
    })
    return max - min
}

const readline = require('readline')
const fs = require('fs')
const { count } = require('console')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1')
})

let pairs = {}
let letters = {}
let polymer
readInterface.on('line', function(line) {
    if (line.length) {
        if (line.includes('>')) {
            let splitLine = line.split(' -> ')
            pairs[splitLine[0]] = { count: 0, makes: [splitLine[0][0] + splitLine[1],splitLine[1] + splitLine[0][1]] }
        } else {
            polymer = line
        }
    }
}).on('close', function() {
    // get the initial polymer's pair counts and letter counts
    for (let i = 0; i < polymer.length; i++){
        if(i < polymer.length -1) pairs[polymer[i] + polymer[i+1]]['count']++
        
        if(polymer[i] in letters) letters[polymer[i]]++
        else letters[polymer[i]] = 1
    }

    let state = {
        letters: letters,
        pairs: pairs
    }
    for(let i = 0; i < 40; i++) {
        state = processStep(state)
        console.log(state['letters'])
    }
    console.log(score(state['letters']))
})