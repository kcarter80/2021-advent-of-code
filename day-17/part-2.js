// started 12/16/2021 10:55 pm
// finished 12/16/2021 11:13 pm
function hitsTargetArea(velocity, targetArea) {
    let location = {
        x: 0,
        y: 0
    }
    let maxHeight = 0
    let successful = false
    while(location.x <= targetArea.endX && location.y >= targetArea.beginY) {
        /*
        console.log(location,
            targetArea,
            location.x >= targetArea.beginX,
            location.x <= targetArea.endX,
            location.y >= targetArea.beginY,
            location.y <= targetArea.endY)
        */
        if(location.x >= targetArea.beginX
            && location.x <= targetArea.endX
            && location.y >= targetArea.beginY
            && location.y <= targetArea.endY)
            return maxHeight
    
        location.x += velocity.x
        location.y += velocity.y
        if ( velocity.x >= 1 ) velocity.x -= 1
        if ( velocity.x <= -1 ) velocity.x += 1
        velocity.y -= 1
        
        if (location.y > maxHeight) maxHeight = location.y
    }
    return null
}

function findHighestTrajectory(targetArea) {
    let maxVeloX = targetArea.endX + 1
    let maxVeloY = 2000
    let minVeloY = targetArea.beginY
    let velocities = []

    for (var thisVeloX = maxVeloX; thisVeloX > 0; thisVeloX--) {
        for (var thisVeloY = maxVeloY; thisVeloY >= minVeloY; thisVeloY--) {
            let thisVelo = {
                x: thisVeloX,
                y: thisVeloY
            }
            let maxHeight = hitsTargetArea(thisVelo, targetArea)
            if (maxHeight != null)
                velocities.push(thisVelo)
        }
    }
    return velocities  
}

//target area: x=20..30, y=-10..-5
//target area: x=102..157, y=-146..-90
console.log(findHighestTrajectory({
    beginX: 102,
    endX: 157,
    beginY: -146,
    endY:-90
}).length)