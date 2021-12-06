// started 4:56am 12/6/2021
// finished 5:09am
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

//let fishes = [3,4,3,1,2]
let fishes = [1,1,1,2,1,1,2,1,1,1,5,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,4,1,1,1,1,3,1,1,3,1,1,1,4,1,5,1,3,1,1,1,1,1,5,1,1,1,1,1,5,5,2,5,1,1,2,1,1,1,1,3,4,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,5,4,1,1,1,1,1,5,1,2,4,1,1,1,1,1,3,3,2,1,1,4,1,1,5,5,1,1,1,1,1,2,5,1,4,1,1,1,1,1,1,2,1,1,5,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,3,1,1,3,1,3,1,4,1,5,4,1,1,2,1,1,5,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,1,1,5,4,1,2,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,4,1,1,1,2,1,4,1,1,1,1,1,1,1,1,1,4,2,1,2,1,1,4,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,3,2,1,4,1,5,1,1,1,4,5,1,1,1,1,1,1,5,1,1,5,1,2,1,1,2,4,1,1,2,1,5,5,3]

let daysPast = 0

let zeroes = countOccurrences(fishes,0)
let ones = countOccurrences(fishes,1)
let twos = countOccurrences(fishes,2)
let threes = countOccurrences(fishes,3)
let fours = countOccurrences(fishes,4)
let fives = countOccurrences(fishes,5)
let sixes = countOccurrences(fishes,6)
let sevens = countOccurrences(fishes,7)
let eights = countOccurrences(fishes,8)

while (daysPast <= 256) {
    console.log(zeroes+ones+twos+threes+fours+fives+sixes+sevens+eights)
    
    const former_zeroes = zeroes
    zeroes = ones
    ones = twos
    twos = threes
    threes = fours
    fours = fives
    fives = sixes
    sixes = sevens + former_zeroes
    sevens = eights
    eights = former_zeroes

    daysPast++
}