// 6 hours?
class Burrow {
    constructor(positions,cost) {
        this.positions = positions
        this.cost = cost
    }

    drawBurrow() {
        const p = this.positions
        process.stdout.write('#############\n')
        process.stdout.write(`#${p[0]}${p[1]}${p[2]}${p[3]}${p[4]}${p[5]}${p[6]}${p[7]}${p[8]}${p[9]}${p[10]}#\n`)
        process.stdout.write(`###${p[11]}#${p[13]}#${p[15]}#${p[17]}###\n`)
        process.stdout.write(`  #${p[12]}#${p[14]}#${p[16]}#${p[18]}#  \n`)
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
                // in a room
                if([11,12,13,14,15,16,17,18].includes(i)) {
                    // blocked by amphipod at top of room
                    if ([12,14,16,18].includes(i) && this.positions[i-1] != '.') continue
                    // these are amphipods in their correct final position
                    if (this.positions[i] == 'A') {
                        if(i == 12) continue
                        if(i == 11 && this.positions[12] == 'A') continue
                    }
                    if (this.positions[i] == 'B') {
                        if(i == 14) continue
                        if(i == 13 && this.positions[14] == 'B') continue
                    }
                    if (this.positions[i] == 'C') {
                        if(i == 16) continue
                        if(i == 15 && this.positions[16] == 'C') continue
                    }
                    if (this.positions[i] == 'D') {
                        if(i == 18) continue
                        if(i == 17 && this.positions[18] == 'D') continue
                    }
                    // if we haven't "continued" the hallway are the only eligible spots
                    placesToGo = [0,1,3,5,7,9,10]
                // in the hallway
                } else if([0,1,3,5,7,9,10].includes(i)) {
                    if (this.positions[i] == 'A') {
                        // go to top of room only if bottom
                        // is filled with proper amphipod
                        if(this.positions[12] == ['A'])
                            placesToGo = [11]
                        else
                            placesToGo = [12]
                    }
                    if (this.positions[i] == 'B') {
                        if(this.positions[14] == ['B'])
                            placesToGo = [13]
                        else
                            placesToGo = [14]
                    }
                    if (this.positions[i] == 'C') {
                        if(this.positions[16] == ['C'])
                            placesToGo = [15]
                        else
                            placesToGo = [16]
                    }
                    if (this.positions[i] == 'D') {
                        if(this.positions[18] == ['D'])
                            placesToGo = [17]
                        else
                            placesToGo = [18]
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
            this.positions[11] == 'A' && this.positions[12] == 'A' &&
            this.positions[13] == 'B' && this.positions[14] == 'B' &&
            this.positions[15] == 'C' && this.positions[16] == 'C' &&
            this.positions[17] == 'D' && this.positions[18] == 'D'
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
            // move up from bottom of room if possible
            if([12,14,16,18].includes(currentPosition)) {
                if (this.positions[currentPosition - 1] == '.') {
                    currentPosition -= 1
                    cost += 1 * costMultiplier
                }
                else return false
            }
            // top of room
            if([11,13,15,17].includes(currentPosition)) {
                // if trying to go down room
                if (currentPosition + 1 == position2)
                    if (this.positions[position2] == '.') {
                        currentPosition = position2
                        cost += 1 * costMultiplier
                    }
                    else return false
                // must be trying to get into hallway, so move it just above room
                else {
                    currentPosition = currentPosition-9
                    cost += 1 * costMultiplier
                }
            }

            // if in the hallway
            if([0,1,2,3,4,5,6,7,8,9,10].includes(currentPosition)) {
                let destination
                if ([0,1,3,5,7,9,10].includes(position2))
                    destination = position2
                // if trying to get into a room, try to move it above
                // that room on this iteration
                if ([11,12].includes(position2))
                    destination = 2
                if ([13,14].includes(position2))
                    destination = 4
                if ([15,16].includes(position2))
                    destination = 6
                if ([17,18].includes(position2))
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
                if(this.positions[currentPosition + 9] == '.') {
                    currentPosition = currentPosition + 9
                    cost += 1 * costMultiplier
                } else
                    return false
        }
        return cost
    }
}

let burrows = [new Burrow([
//    '.','.','.','.','.','.','.','.','.','.','.',
//    'B','A','C','D','B','C','D','A'
    '.','.','.','.','.','.','.','.','.','.','.',
    'A','C','D','D','C','B','A','B'
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
        }
    }
    burrows = Object.values(lowestCostBurrows)
    console.log(movedBurrows.length,Object.keys(lowestCostBurrows).length)
    j += 1
} while(j < 20)