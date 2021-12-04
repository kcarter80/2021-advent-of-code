// started 9:30am 12/4/2021
// finished 10:08am
function isWinningBoard(bingoBoard,bingoNumbers) {
    for(let i = 0; i < bingoBoard.length; i++) {
        if (bingoNumbers.includes(bingoBoard[i][0]))
            if (bingoNumbers.includes(bingoBoard[i][1]))
                if (bingoNumbers.includes(bingoBoard[i][2]))
                    if (bingoNumbers.includes(bingoBoard[i][3]))
                        if (bingoNumbers.includes(bingoBoard[i][4]))
                            return true
    }
    for(let i = 0; i < bingoBoard.length; i++) {
        if (bingoNumbers.includes(bingoBoard[0][i]))
            if (bingoNumbers.includes(bingoBoard[1][i]))
                if (bingoNumbers.includes(bingoBoard[2][i]))
                    if (bingoNumbers.includes(bingoBoard[3][i]))
                        if (bingoNumbers.includes(bingoBoard[4][i]))
                            return true
    }
    return false
}

function sumUnmarkedNumbers(bingoBoard,bingoNumbers) {
    let sum = 0
    for(let i = 0; i < bingoBoard.length; i++) {
        for(let ii = 0; ii < bingoBoard[0].length; ii++) {
            //console.log(bingoBoard[i][ii],bingoNumbers,bingoNumbers.includes(bingoBoard[i][ii]))
            if (!bingoNumbers.includes(bingoBoard[i][ii]))
                sum += bingoBoard[i][ii]
        }
    }
    return sum
}

const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
});

let bingoNumbers
let bingoBoards = new Array
let i = 0

readInterface.on('line', function(line) {
    if (i == 0) {
        bingoNumbers = line.split(',').map(x => parseInt(x))
    } else {
        // if this is a new board
        if ((i - 2) % 6 == 0) {
            bingoBoards.push(new Array)
        }
        // if this line isn't blank
        if (line != '') {
            // add this board line to the last board
            bingoBoards[bingoBoards.length - 1]
                .push(line.split(' ')
                .map(x => parseInt(x))
                .filter(Number.isFinite))
        }
    }
    i++
}).on('close', function() {
    let winningBoardIndexes = []
    for (let i = 1; i <= bingoNumbers.length; i++) {
        for (let ii = 0; ii < bingoBoards.length; ii++) {
            if (!winningBoardIndexes.includes(ii)) {
                if (isWinningBoard(bingoBoards[ii],bingoNumbers.slice(0,i))) {
                    winningBoardIndexes.push(ii)
                    if (winningBoardIndexes.length == bingoBoards.length)
                        console.log(bingoNumbers[i-1] * sumUnmarkedNumbers(bingoBoards[ii],bingoNumbers.slice(0,i)))
                }
            }
        }
    }
    //console.log(winningBoardIndexes)
})