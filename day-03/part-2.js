// started 9:28am 12/3/2021
// finished 10:10am
function reduceReport(report,position,keepMostCommon) {
    let oneAppearances = 0
    for (const element of report) {
        if (element.charAt(position) == '1') oneAppearances += 1
    }
    let reducedReport
    if (
        (oneAppearances >= report.length / 2 && keepMostCommon)
        ||
        (oneAppearances < report.length / 2 && !keepMostCommon)
    ) {
        reducedReport = report.filter(entry => entry.charAt(position) == '1')
    } else {
        reducedReport = report.filter(entry => entry.charAt(position) == '0')
    }
    if (reducedReport.length == 1) {
        return parseInt(reducedReport[0],2)
    } else {
        return reduceReport(reducedReport,position + 1,keepMostCommon)  
    }
  
}

const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input-1'),
});

let diagnosticReport = new Array
readInterface.on('line', function(line) {
    diagnosticReport.push(line)
}).on('close', function() {
    console.log(reduceReport(diagnosticReport,0,true) * reduceReport(diagnosticReport,0,false))
});