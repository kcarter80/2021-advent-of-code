// took 14 minutes after completing part 1

// each pair contains either a value or an array
class pair {
    constructor(parent,firstChild,secondChild) {
        this.parent = parent
        if(typeof firstChild == 'number') {
            this.firstChild = firstChild
        } else {
            this.firstChild = new pair(this,firstChild[0],firstChild[1])
        }
        if(typeof secondChild == 'number') {
            this.secondChild = secondChild
        } else {
            this.secondChild = new pair(this,secondChild[0],secondChild[1])
        }
    }

    displayString() {
        let displayString = "["
        if(typeof this.firstChild == 'number') displayString += this.firstChild.toString()
        else displayString += this.firstChild.displayString()
        displayString += ","
        if(typeof this.secondChild == 'number') displayString += this.secondChild.toString()
        else displayString += this.secondChild.displayString()
        displayString += "]"
        return displayString
    }

    findMaxChildDepth() {
        let firstChildDepth, secondChildDepth
        if (typeof this.firstChild == 'number')
            firstChildDepth = 0
        else
            firstChildDepth = 1 + this.firstChild.findMaxChildDepth()
        if (typeof this.secondChild == 'number')
            secondChildDepth = 0
        else
            secondChildDepth = 1 + this.secondChild.findMaxChildDepth()
        return Math.max(firstChildDepth,secondChildDepth)
    }

    findLeftMostNumber(pair) {
        let thisPair = pair
        while (typeof thisPair.firstChild == 'object')
            thisPair = thisPair.firstChild
        return thisPair[0]
    }

    findRightMostNumber(pair) {
        let thisPair = pair
        while (typeof thisPair.secondChild == 'object')
            thisPair = thisPair.secondChild
        return thisPair[1]
    }

    findLeftMostFourDeepChild() {
        // all possible locations for a four deep child in order of 
        let fourDeepLocationStrings = [
            ['firstChild','firstChild','firstChild','firstChild'],
            ['firstChild','firstChild','firstChild','secondChild'],
            ['firstChild','firstChild','secondChild','firstChild'],
            ['firstChild','firstChild','secondChild','secondChild'],
            ['firstChild','secondChild','firstChild','firstChild'],
            ['firstChild','secondChild','firstChild','secondChild'],
            ['firstChild','secondChild','secondChild','firstChild'],
            ['firstChild','secondChild','secondChild','secondChild'],
            ['secondChild','firstChild','firstChild','firstChild'],
            ['secondChild','firstChild','firstChild','secondChild'],
            ['secondChild','firstChild','secondChild','firstChild'],
            ['secondChild','firstChild','secondChild','secondChild'],
            ['secondChild','secondChild','firstChild','firstChild'],
            ['secondChild','secondChild','firstChild','secondChild'],
            ['secondChild','secondChild','secondChild','firstChild'],
            ['secondChild','secondChild','secondChild','secondChild']
        ]

        for (let i = 0; i < fourDeepLocationStrings.length; i++) {
            let locationString = fourDeepLocationStrings[i]
            if (typeof this[locationString[0]] == 'object')
                if (typeof this[locationString[0]][locationString[1]] == 'object')
                    if (typeof this[locationString[0]][locationString[1]][locationString[2]] == 'object')
                        if (typeof this[locationString[0]][locationString[1]][locationString[2]][locationString[3]] == 'object')
                            return this[locationString[0]][locationString[1]][locationString[2]][locationString[3]]
        }
        return null
    }

    splitLeftMostEligible() {
        let locationStrings = [
            ['firstChild'],
            ['firstChild','firstChild'],
            ['firstChild','firstChild','firstChild'],
            ['firstChild','firstChild','firstChild','firstChild'],
            ['firstChild','firstChild','firstChild','secondChild'],
            ['firstChild','firstChild','secondChild'],
            ['firstChild','firstChild','secondChild','firstChild'],
            ['firstChild','firstChild','secondChild','secondChild'],
            ['firstChild','secondChild'],
            ['firstChild','secondChild','firstChild'],
            ['firstChild','secondChild','firstChild','firstChild'],
            ['firstChild','secondChild','firstChild','secondChild'],
            ['firstChild','secondChild','secondChild'],
            ['firstChild','secondChild','secondChild','firstChild'],
            ['firstChild','secondChild','secondChild','secondChild'],
            ['secondChild'],
            ['secondChild','firstChild'],
            ['secondChild','firstChild','firstChild'],
            ['secondChild','firstChild','firstChild','firstChild'],
            ['secondChild','firstChild','firstChild','secondChild'],
            ['secondChild','firstChild','secondChild'],
            ['secondChild','firstChild','secondChild','firstChild'],
            ['secondChild','firstChild','secondChild','secondChild'],
            ['secondChild','secondChild'],
            ['secondChild','secondChild','firstChild'],
            ['secondChild','secondChild','firstChild','firstChild'],
            ['secondChild','secondChild','firstChild','secondChild'],
            ['secondChild','secondChild','secondChild'],
            ['secondChild','secondChild','secondChild','firstChild'],
            ['secondChild','secondChild','secondChild','secondChild']
        ]

        for (let i = 0; i < locationStrings.length; i++) {
            try {
                let thisChild = eval('this' + "['" + locationStrings[i].join("']['") + "']")
                if (typeof thisChild == 'number' && thisChild >= 10) {
                    let thisParent
                    if (locationStrings[i].length == 1)
                        thisParent = this
                    else {
                        thisParent = eval('this' + "['" + locationStrings[i].slice(0,-1).join("']['") + "']")
                    }

                    let newChild = new pair(thisParent,
                        Math.floor(thisChild/2),
                        Math.ceil(thisChild/2))
                    // not sure if the child is left or right
                    if (thisParent.firstChild == thisChild) thisParent.firstChild = newChild
                    else thisParent.secondChild = newChild
                    
                    return true
                }                
            } catch(error) {
                // do nothing just continue through loop
            }
        }

        return false
    }

    explode(explodePair) {    
        let leftValueAdded = false
        let rightValueAdded = false
        let thisPair = explodePair
        let thisParent = explodePair.parent
        while(thisParent != null) {
            // this is the first parent, and the explode pair is the first child
            if (thisParent.firstChild == explodePair) {
                // check the other child if it's a number
                if (typeof thisParent.secondChild == 'number') {
                    thisParent.secondChild += explodePair.secondChild
                    rightValueAdded = true
                } else {
                    // the sibling MUST be a number since we're four deep
                    thisParent.secondChild.firstChild += explodePair.secondChild
                    rightValueAdded = true
                }
            } else if (thisParent.secondChild == explodePair) {
                // the sibling MUST be a number since we're four deep and we'd have caught the left child pair first
                thisParent.firstChild += explodePair.firstChild
                leftValueAdded = true
            // we're at least one level up
            } else {
                // came from the left
                if (thisParent.firstChild == thisPair) {
                    if (!rightValueAdded) {
                        // so now we dive down to the right
                        
                        // if the first thing we encounter is a number
                        if (typeof thisParent.secondChild == 'number') {
                            thisParent.secondChild += explodePair.secondChild
                            rightValueAdded = true
                        } else {
                            let divePair = thisParent.secondChild
                            // and keep going left until a number is encountered
                            while(typeof divePair.firstChild != 'number')
                                divePair = divePair.firstChild
                            divePair.firstChild += explodePair.secondChild
                            rightValueAdded = true
                        }                      
                    }
                // came from the right
                } else {
                    if (!leftValueAdded) {
                        // so now we dive down to the left

                        // if the first thing we encounter is a number
                        if (typeof thisParent.firstChild == 'number') {
                            thisParent.firstChild += explodePair.firstChild
                            leftValueAdded = true
                        } else {
                            let divePair = thisParent.firstChild
                            // and keep going right until a number is encountered
                            while(typeof divePair.secondChild != 'number')
                                divePair = divePair.secondChild
                            divePair.secondChild += explodePair.firstChild
                            leftValueAdded = true
                        }  
                    }
                }

            }
            // go up a level
            thisPair = thisPair.parent
            thisParent = thisPair.parent
            //console.log(leftValueAdded,rightValueAdded)
        }
 
        if (explodePair.parent.firstChild == explodePair)
            explodePair.parent.firstChild = 0
        else
            explodePair.parent.secondChild = 0
        return null
    }

    reduce() {
        let reduced = false
        let lmfdc = this.findLeftMostFourDeepChild()
        if (lmfdc) {
            this.explode(lmfdc)
            reduced = true
        } else {
            reduced = this.splitLeftMostEligible()
        }
        if (reduced) this.reduce()
    }

    magnitude() {
        let leftMag
        let rightMag
        if (typeof this.firstChild == 'number') leftMag = 3 * this.firstChild
        else leftMag = 3 * this.firstChild.magnitude()
        if (typeof this.secondChild == 'number') rightMag = 2 * this.secondChild
        else rightMag = 2 * this.secondChild.magnitude()
        return leftMag + rightMag
    }
}

const readline = require('readline')
const fs = require('fs')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let snailfishArrays = new Array
readInterface.on('line', function(line) {
    snailfishArrays.push(eval(line))
}).on('close', function() {
    let sn, magnitude
    let max = null
    for(let i = 0; i < snailfishArrays.length; i++) {
        for(let ii = 0; ii < snailfishArrays.length; ii++) {
            if (i != ii) {
                sn = new pair(null,snailfishArrays[i],snailfishArrays[ii])
                sn.reduce()
                magnitude = sn.magnitude()
                if (max == null || max < magnitude)
                    max = magnitude
            }
       }
    }
    console.log(max)
})