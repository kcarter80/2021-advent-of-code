// 1 hour
class Burrow {
    spotAbove = {
        11: 2,
        15: 4,
        19: 6,
        23: 8
    }
    spotBelow = {
        2: 11,
        4: 15,
        6: 19,
        8: 23
    }
    constructor(positions,cost) {
        this.positions = positions
        this.cost = cost
    }

    drawBurrow() {
        const p = this.positions
        process.stdout.write('#############\n')
        process.stdout.write(`#${p[0]}${p[1]}${p[2]}${p[3]}${p[4]}${p[5]}${p[6]}${p[7]}${p[8]}${p[9]}${p[10]}#\n`)
        process.stdout.write(`###${p[11]}#${p[15]}#${p[19]}#${p[23]}###\n`)
        process.stdout.write(`  #${p[12]}#${p[16]}#${p[20]}#${p[24]}#  \n`)
        process.stdout.write(`  #${p[13]}#${p[17]}#${p[21]}#${p[25]}#  \n`)
        process.stdout.write(`  #${p[14]}#${p[18]}#${p[22]}#${p[26]}#  \n`)
        process.stdout.write(`  ######### ${this.cost}  \n\n`)
    }

    possibleMoves() {
        // at the end, there will only be one burrow, it will be the finished one,
        // and it's cost will be the lowest seen
        if (this.finishedBurrow()) console.log('All done!',this.cost)
        let burrows = []
        for(let i = 0; i < this.positions.length; i++) {
            if(this.positions[i] != '.') {
                let placesToGo = []
                // in a room, can only move into the hallway from here
                if([11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].includes(i)) {
                    // blocked by amphipod above
                    if ([12,13,14,16,17,18,20,21,22,24,25,26].includes(i) && this.positions[i-1] != '.') continue
                    // these are amphipods in their correct final position
                    if (this.positions[i] == 'A') {
                        if(i == 14) continue
                        if(i == 13 && this.positions[14] == 'A') continue
                        if(i == 12 && this.positions[13] == 'A' && this.positions[14] == 'A') continue
                        if(i == 11 && this.positions[12] == 'A' && this.positions[13] == 'A' && this.positions[14] == 'A') continue
                    }
                    if (this.positions[i] == 'B') {
                        if(i == 18) continue
                        if(i == 17 && this.positions[18] == 'B') continue
                        if(i == 16 && this.positions[17] == 'B' && this.positions[18] == 'B') continue
                        if(i == 15 && this.positions[16] == 'B' && this.positions[17] == 'B' && this.positions[18] == 'B') continue
                    }
                    if (this.positions[i] == 'C') {
                        if(i == 22) continue
                        if(i == 21 && this.positions[22] == 'C') continue
                        if(i == 20 && this.positions[21] == 'C' && this.positions[22] == 'C') continue
                        if(i == 19 && this.positions[20] == 'C' && this.positions[21] == 'C' && this.positions[22] == 'C') continue
                    }
                    if (this.positions[i] == 'D') {
                        if(i == 26) continue
                        if(i == 25 && this.positions[26] == 'D') continue
                        if(i == 24 && this.positions[25] == 'D' && this.positions[26] == 'D') continue
                        if(i == 23 && this.positions[24] == 'D' && this.positions[25] == 'D' && this.positions[26] == 'D') continue
                    }
                    // if we haven't "continued" the hallway are the only eligible spots
                    placesToGo = [0,1,3,5,7,9,10]
                // in the hallway, can only move to a proper spot in a room from here
                } else if([0,1,3,5,7,9,10].includes(i)) {
                    if (this.positions[i] == 'A') {
                        // may only go to spots in the room if the spots
                        // below are filled with proper amphipod
                        if      (this.positions[14] == ['A'] && this.positions[13] == ['A'] && this.positions[12] == ['A'])
                            placesToGo = [11]
                        else if (this.positions[14] == ['A'] && this.positions[13] == ['A'])
                            placesToGo = [12]
                        else if (this.positions[14] == ['A'])
                            placesToGo = [13]
                        else
                            placesToGo = [14]
                    }
                    if (this.positions[i] == 'B') {
                        // may only go to spots in the room if the spots
                        // below are filled with proper amphipod
                        if      (this.positions[18] == ['B'] && this.positions[17] == ['B'] && this.positions[16] == ['B'])
                            placesToGo = [15]
                        else if (this.positions[18] == ['B'] && this.positions[17] == ['B'])
                            placesToGo = [16]
                        else if (this.positions[18] == ['B'])
                            placesToGo = [17]
                        else
                            placesToGo = [18]
                    }
                    if (this.positions[i] == 'C') {
                        // may only go to spots in the room if the spots
                        // below are filled with proper amphipod
                        if      (this.positions[22] == ['C'] && this.positions[21] == ['C'] && this.positions[20] == ['C'])
                            placesToGo = [19]
                        else if (this.positions[22] == ['C'] && this.positions[21] == ['C'])
                            placesToGo = [20]
                        else if (this.positions[22] == ['C'])
                            placesToGo = [21]
                        else
                            placesToGo = [22]
                    }
                    if (this.positions[i] == 'D') {
                        // may only go to spots in the room if the spots
                        // below are filled with proper amphipod
                        if      (this.positions[26] == ['D'] && this.positions[25] == ['D'] && this.positions[24] == ['D'])
                            placesToGo = [23]
                        else if (this.positions[26] == ['D'] && this.positions[25] == ['D'])
                            placesToGo = [24]
                        else if (this.positions[26] == ['D'])
                            placesToGo = [25]
                        else
                            placesToGo = [26]
                    }
                }
                for (let ii = 0; ii < placesToGo.length; ii++) {
                    let cost = this.coastIsClear(i,placesToGo[ii])
                    if(cost) {
                        let positionsCopy = [...this.positions]
                        positionsCopy[i] = '.'
                        positionsCopy[placesToGo[ii]] = this.positions[i]
                        burrows.push(new Burrow(positionsCopy,this.cost + cost))
                    }
                }
            }
        }
        return burrows
    }

    // returns true if the burrow is properly arranged with all
    // amphipods in their final spots
    finishedBurrow() {
        return (
            this.positions[11] == 'A' && this.positions[12] == 'A' && this.positions[13] == 'A' && this.positions[14] == 'A'  &&
            this.positions[15] == 'B' && this.positions[16] == 'B' && this.positions[17] == 'B' && this.positions[18] == 'B'  &&
            this.positions[19] == 'C' && this.positions[20] == 'C' && this.positions[21] == 'C' && this.positions[22] == 'C'  &&
            this.positions[23] == 'D' && this.positions[24] == 'D' && this.positions[25] == 'D' && this.positions[26] == 'D'
        )
    }

    // returns the cost of a potential move, or false if it's not possible
    coastIsClear(currentPosition, position2) {
        // the current position may be updated in the while loop
        let cost = 0
        let costMultiplier
        if (this.positions[currentPosition] == 'A')
            costMultiplier = 1
        else if (this.positions[currentPosition] == 'B')
            costMultiplier = 10
        else if (this.positions[currentPosition] == 'C')
            costMultiplier = 100
        else costMultiplier = 1000
        while (currentPosition != position2) {
            // if in a room
            if([11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].includes(currentPosition)) {
                // if moving to the hallway
                if([0,1,2,3,4,5,6,7,8,9,10].includes(position2)) {
                    // if top of room
                    if([11,15,19,23].includes(currentPosition)) {
                        // must be trying to get into hallway, so move it just above room
                        currentPosition = this.spotAbove[currentPosition]
                        cost += 1 * costMultiplier
                    // not top of the room
                    } else {
                        // move it up one position
                        if (this.positions[currentPosition - 1] == '.') {
                            currentPosition -= 1
                            cost += 1 * costMultiplier
                        } else return false
                    }
                // moving down the room
                } else {
                    if (this.positions[currentPosition + 1] == '.') {
                        currentPosition += 1
                        cost += 1 * costMultiplier
                    } else return false
                }

            }

            // if in the hallway
            if([0,1,2,3,4,5,6,7,8,9,10].includes(currentPosition)) {
                let destination
                if ([0,1,3,5,7,9,10].includes(position2))
                    destination = position2
                // if trying to get into a room, try to move it above
                // that room on this iteration
                if ([11,12,13,14].includes(position2))
                    destination = 2
                if ([15,16,17,18].includes(position2))
                    destination = 4
                if ([19,20,21,22].includes(position2))
                    destination = 6
                if ([23,24,25,26].includes(position2))
                    destination = 8

                let spacesMoved = 0
                // make sure each space in the hallway between the 
                // currentPositionis and the destination is empty
                while (currentPosition != destination)  {
                    if (currentPosition > destination) currentPosition -= 1
                    else currentPosition += 1
                    spacesMoved += 1
                    if(this.positions[currentPosition] != '.') return false  
                }
                cost += spacesMoved * costMultiplier
            }

            // if at top of room, try to go down
            if([2,4,6,8].includes(currentPosition))
                if(this.positions[this.spotBelow[currentPosition]] == '.') {
                    currentPosition = this.spotBelow[currentPosition]
                    cost += 1 * costMultiplier
                } else
                    return false
        }
        return cost
    }
}

let burrows = [new Burrow([
    '.','.','.','.','.','.','.','.','.','.','.',
    'A','D','D','C','D','C','B','D','C','B','A','B','A','A','C','B'
//    '.','.','.','.','.','.','.','.','.','.','.',
//    'A','C','D','D','C','B','A','B'
],0)]

burrows[0].drawBurrow()

let j = 0
do {
    console.log('-----------------------------------')
    let movedBurrows = []
    for (let i = 0; i < burrows.length; i++) {
        movedBurrows = movedBurrows.concat(burrows[i].possibleMoves())
    }
    // stores the lowest cost found for this burrow so far
    let lowestCostBurrows = {}
    for (let i = 0; i < movedBurrows.length; i++) {
        let positionsString = movedBurrows[i].positions.toString()
        if(positionsString in lowestCostBurrows) {
            if (movedBurrows[i].cost < lowestCostBurrows[positionsString].cost)
                lowestCostBurrows[positionsString].cost = movedBurrows[i].cost
        } else { 
            lowestCostBurrows[positionsString] = movedBurrows[i]
            //movedBurrows[i].drawBurrow()
            //console.log(`'${movedBurrows[i].positions.toString().replaceAll(',',"','")}'`)
        }
    }
    burrows = Object.values(lowestCostBurrows)

    console.log(movedBurrows.length,Object.keys(lowestCostBurrows).length)
    j += 1
} while(j < 35)