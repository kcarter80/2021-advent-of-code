// started 9:20pm 12/9/2021
// finished 10:18pm

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let navigationSubsystem = new Array
readInterface.on('line', function(line) {
    navigationSubsystem.push(line)
}).on('close', function() {
    let scores = 0
    for (let i = 0; i < navigationSubsystem.length; i++) {
        let eligibleClose = new Array
        for (let ii = 0; ii < navigationSubsystem[i].length; ii++) {
            if (navigationSubsystem[i][ii] == '(') { eligibleClose.push(')'); continue }
            if (navigationSubsystem[i][ii] == '[') { eligibleClose.push(']'); continue }
            if (navigationSubsystem[i][ii] == '{') { eligibleClose.push('}'); continue }
            if (navigationSubsystem[i][ii] == '<') { eligibleClose.push('>'); continue }
            if (
                (navigationSubsystem[i][ii] == ')' && eligibleClose.at(-1) != ')')
                ||
                (navigationSubsystem[i][ii] == ']' && eligibleClose.at(-1) != ']')
                ||
                (navigationSubsystem[i][ii] == '}' && eligibleClose.at(-1) != '}')   
                ||
                (navigationSubsystem[i][ii] == '>' && eligibleClose.at(-1) != '>')
            ) {
                /*
                ): 3 points.
                ]: 57 points.
                }: 1197 points.
                >: 25137 points.
                */
                console.log(`Expected ${eligibleClose.at(-1)}, but found ${navigationSubsystem[i][ii]} instead.`)
                if (navigationSubsystem[i][ii] == ')') scores += 3
                if (navigationSubsystem[i][ii] == ']') scores += 57
                if (navigationSubsystem[i][ii] == '}') scores += 1197
                if (navigationSubsystem[i][ii] == '>') scores += 25137
                break
            } else  {
                eligibleClose.pop()
            }
        }
    }
    console.log(scores)
})