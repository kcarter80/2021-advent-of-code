// 1 hour
function getMinAndMax(image) {
    let min,max
    Object.keys(image).forEach(key => {
        let splitKey = key.split(',')
        let x = parseInt(splitKey[0])
        let y = parseInt(splitKey[1])
        if (min == null || x < min) min = x
        if (y < min) min = y
        if (max == null || x > max) max = x
        if (y > max) max = y
    })
    return {
        min: min,
        max: max
    }
}

function displayImage(image) {
    let minAndMax = getMinAndMax(image)
    for(let y = minAndMax.min; y <= minAndMax.max; y++) {
        for(let x = minAndMax.min; x <= minAndMax.max; x++) {
            process.stdout.write(image[`${y},${x}`])
        }
        process.stdout.write('\n')
    }
    process.stdout.write('\n')
}

function pixelValue(image,x,y,infinityPixel) {
    values = new Array

    keys = [
        `${y-1},${x-1}`,`${y-1},${x}`,`${y-1},${x+1}`,
        `${y},${x-1}`,`${y},${x}`,`${y},${x+1}`,
        `${y+1},${x-1}`,`${y+1},${x}`,`${y+1},${x+1}`
    ]

    for(let i = 0; i < keys.length; i++) {
        if (keys[i] in image) values[i] = image[keys[i]] == '#' ? 1:0
        else values[i] = infinityPixel
    }

    return parseInt( values.join(''), 2)
}

function enhanceImage(image,imageEnhancementAlgorithm,infinityPixel) {
    let minAndMax = getMinAndMax(image)
    let enhancedImage = new Object
    for(let y = minAndMax.min - 2; y <= minAndMax.max + 2; y++) {
        for(let x = minAndMax.min - 2; x <= minAndMax.max + 2; x++)
            enhancedImage[`${y},${x}`] = imageEnhancementAlgorithm[pixelValue(image,x,y,infinityPixel)]
    }
    return enhancedImage
}

const readline = require('readline')
const fs = require('fs')
const { text } = require('stream/consumers')
const { listeners } = require('process')
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
})

let lineNumber = 0
let imageEnhancementAlgorithm
let image = new Object
readInterface.on('line', function(line) {
    if (lineNumber == 0) imageEnhancementAlgorithm = line
    else if(lineNumber >= 2) {
        for (var i = 0; i < line.length; i++) {
            image[`${lineNumber-2},${i}`] = line[i]
        }
    }
    lineNumber++
}).on('close', function() {
    displayImage(image)
    let enhancedImage = image
    let infinityPixel = 0
    for (let i = 0; i < 50; i++) {
        // infinity pixel toggles
        if (imageEnhancementAlgorithm[0] == '#') {
            if (i % 2 == 1) {
                infinityPixel = 1
            } else if (imageEnhancementAlgorithm[511] == '.') {
                infinityPixel = 0
            }
        }
        console.log('infinity pixel',infinityPixel)
        enhancedImage = enhanceImage(enhancedImage,imageEnhancementAlgorithm,infinityPixel)
        displayImage(enhancedImage)
    }
    console.log('lit pixels',Object.values(enhancedImage).reduce((a, v) => (v === '#' ? a + 1 : a), 0))
})