// started 8:50am 12/3/2021
// finished 9:28am
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
});

let oneAppearances;
let diagnosticReportEntries = 0;
readInterface.on('line', function(line) {
    diagnosticReportEntries += 1
    // initialize array elements to 0
    if (typeof oneAppearances == 'undefined') oneAppearances = Array(line.length).fill(0)
    for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) == '1') oneAppearances[i] += 1
    }
}).on('close', function() {
    let gammaRateString = '';
    let epsilonRateString = '';
    for (let i = 0; i < oneAppearances.length; i++) {
        if (oneAppearances[i] > diagnosticReportEntries / 2) {
            gammaRateString += '1'
            epsilonRateString += '0'
        } else {
            gammaRateString += '0'
            epsilonRateString += '1'
        }
    }
    console.log(
        gammaRateString,parseInt(gammaRateString, 2),
        epsilonRateString,parseInt(epsilonRateString,2),
        parseInt(gammaRateString, 2)*parseInt(epsilonRateString, 2))
});