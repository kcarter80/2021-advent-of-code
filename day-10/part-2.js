// started 10:18pm 12/9/2021
// paused 10:49pm
// restarted 7:16am 12/10/2021
// finished 8:00am

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let navigationSubsystem = new Array
readInterface.on('line', function(line) {
    navigationSubsystem.push(line)
}).on('close', function() {
    let scores = new Array
    for (let i = 0; i < navigationSubsystem.length; i++) {
        let eligibleClose = new Array
        for (let ii = 0; ii < navigationSubsystem[i].length; ii++) {
            if (navigationSubsystem[i][ii] == '(') eligibleClose.push(')')
            else if (navigationSubsystem[i][ii] == '[') eligibleClose.push(']')
            else if (navigationSubsystem[i][ii] == '{') eligibleClose.push('}')
            else if (navigationSubsystem[i][ii] == '<') eligibleClose.push('>')
            else if (
                (navigationSubsystem[i][ii] == ')' && eligibleClose.at(-1) != ')')
                ||
                (navigationSubsystem[i][ii] == ']' && eligibleClose.at(-1) != ']')
                ||
                (navigationSubsystem[i][ii] == '}' && eligibleClose.at(-1) != '}')   
                ||
                (navigationSubsystem[i][ii] == '>' && eligibleClose.at(-1) != '>')
            ) {
                console.log(`Expected ${eligibleClose.at(-1)}, but found ${navigationSubsystem[i][ii]} instead.`)
                break
            } else  {
                eligibleClose.pop()
            }
            // if we've come to the end of a chunk
            if (ii == navigationSubsystem[i].length-1) {
                if (eligibleClose.length > 0) {
                    let score = 0
                    eligibleClose.reverse().forEach(character => {
                        score *= 5
                        /*
                        ): 1 point.
                        ]: 2 points.
                        }: 3 points.
                        >: 4 points.
                        */
                       if (character == ')') score += 1
                       if (character == ']') score += 2
                       if (character == '}') score += 3
                       if (character == '>') score += 4
                    })
                    scores.push(score)
                }
            }
        }
    }
    console.log(scores.sort((a,b) => a - b)[scores.length/2 - .5])
})