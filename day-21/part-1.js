// 1.5 hours
class DiracDice {
    constructor(start1,start2) {
        this.position1 = start1
        this.position2 = start2
        this.score1 = 0
        this.score2 = 0
        this.whoseTurn = 1
        this.lastRoll = 0
        this.totalRolls = 0
    }

    #position(turnEndSum) {
        if (turnEndSum < 11) return turnEndSum
        else if (turnEndSum % 10 == 0) return 10
        else return turnEndSum % 10
    }

    // returns true if the game is not over
    executeTurn() {
        let dieRolls = 0
        let dieRollsSum = 0
        while(dieRolls < 3) {
            this.totalRolls++
            dieRolls++
            if (this.lastRoll == 100) this.lastRoll = 1
            else this.lastRoll += 1
            dieRollsSum += this.lastRoll
        }
        if (this.whoseTurn == 1) {
            this.position1 = this.#position(this.position1 + dieRollsSum)
            this.score1 += this.position1
            this.whoseTurn = 2
        } else {
            this.position2 = this.#position(this.position2 + dieRollsSum)
            this.score2 += this.position2
            this.whoseTurn = 1
        }
        if (this.score1 >= 1000 || this.score2 >= 1000) {
            return false
        } else {
            return true
        }
    }
}

let game = new DiracDice(4,3)

while (game.executeTurn()) {}
console.log(game)
console.log(Math.min(game.score1,game.score2),Math.min(game.score1,game.score2) * game.totalRolls)