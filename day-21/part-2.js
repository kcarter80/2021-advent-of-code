// 2 hours

function position(turnEndSum) {
    if (turnEndSum < 11) return turnEndSum
    else return turnEndSum - 10
}

// position1,position2,score1,score2,whoseTurn
let gameStates = {
    '4,3,0,0,0': 1
}
let winners = {
    0: 0,
    1: 0
}

let universes = 1
/*
3, 111
4, 112,121,211
5, 113,131,311,122,212,221
6, 123,132,213,231,312,321,222
7, 331,313,133,322,232,223
8, 322,232,223
9, 333
*/
const possibleRolls = [
    3,
    4,4,4,
    5,5,5,5,5,5,
    6,6,6,6,6,6,6,
    7,7,7,7,7,7,
    8,8,8,
    9
]
while(Object.keys(gameStates).length) {
    let nextGameStates = new Object
    Object.keys(gameStates).forEach( gameState => {
        // this is the number of games currently in this state
        let numGamesInThisState = gameStates[gameState]
        // breaking up the game state into it's constituent components
        let splitGameState = gameState.split(',').map(x => parseInt(x))
        // when the dice rolls, the current universe is vaporized and replaced with a bunch of new ones
        universes -= numGamesInThisState
        for (let i = 0; i < possibleRolls.length; i++) {
            universes += numGamesInThisState
            // there will be a "next game state" for all three dice possibilities
            let nextGameState = gameState.split(',').map(x => parseInt(x))
            // set the new position after this dice roll
            nextGameState[splitGameState[4]] = position(splitGameState[splitGameState[4]] + possibleRolls[i])
            // set the new score
            nextGameState[splitGameState[4]+2] += nextGameState[splitGameState[4]]
            // if a winner has emerged
            if (nextGameState[splitGameState[4]+2] >= 21) {
                winners[splitGameState[4]] += numGamesInThisState
            } else {
                // set the next player
                nextGameState[4] = nextGameState[4] ? 0 : 1
                // add to nextGameStates
                let joinedNextGameState = nextGameState.join()
                // need to increment the new game state * number of games in current state
                if (joinedNextGameState in nextGameStates) nextGameStates[joinedNextGameState] += numGamesInThisState
                else nextGameStates[joinedNextGameState] = numGamesInThisState
            }
        }
    })
    gameStates = nextGameStates
}
console.log(winners)

