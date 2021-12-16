// start 12/15/2021 10:00 pm
// paused 12/15/2021 11:20 pm
// restarted 12/16/2021 7:30 am
// finished 12/16/2021 8:27 am

function literalLength(literal) {
    let groupStart = 0
    while(literal[groupStart] == '1') {
        groupStart += 5
    }
    return groupStart+5  
}

function literalValue(literal) {
    let literalValue = ''
    let groupStart = 0
    let group = literal.substring(groupStart,groupStart+5)
    while(literal[groupStart] == '1') {
        literalValue += group.substring(1,5).toString()
        groupStart += 5
        group = literal.substring(groupStart,groupStart+5)
    }
    literalValue += group.substring(1,5).toString()
    return parseInt(literalValue,2) 
}

function processPacket(packet) {
    let packetVersion = parseInt(packet.substring(0,3),2)
    versionSum += packetVersion
    let packetType = parseInt(packet.substring(3,6),2)
    
    console.log('pv:', packetVersion,'pt:',packetType)

    // Packets with type ID 4 represent a literal value
    if (packetType == 4) {
        console.log('!!!',
            literalValue(packet.slice(6)),
            literalLength(packet.slice(6))+6)
        return {
            packetVersionSum: packetVersion,
            charactersUsed: literalLength(packet.slice(6)) + 6
        }
    } else {
        // this is an operator packet
        let lengthTypeID = parseInt(packet.substring(6,7),2)
        console.log('  lt',lengthTypeID)
        // If the length type ID is 0, then the next 15 bits are a number that represents 
        // the total length in bits of the sub-packets contained by this packet.
        if (lengthTypeID == 0) {
            let subPacketsLength = parseInt(packet.substring(7,22),2)
            let subPacketsString = packet.substring(22,22+subPacketsLength)
            let subPacketsCharactersUsed = 0
            let packetVersionSum = 0
            while(subPacketsCharactersUsed < subPacketsLength) {
                let processPacketResult = processPacket(subPacketsString.slice(subPacketsCharactersUsed))
                subPacketsCharactersUsed += processPacketResult.charactersUsed
                packetVersionSum += processPacketResult.packetVersionSum
            }
            return {
                packetVersionSum: packetVersionSum,
                charactersUsed: 7 + 15 + subPacketsLength
            }
        // If the length type ID is 1, then the next 11 bits are a number that represents 
        // the number of sub-packets immediately contained by this packet.
        } else {
            let numSubPackets = parseInt(packet.substring(7,18),2)
            let subPacketsProcessed = 0
            let subPacketsCharactersUsed = 0
            let subPacketsString = packet.substring(18)
            let packetVersionSum = 0
            while (subPacketsProcessed < numSubPackets) {
                let processPacketResult = processPacket(subPacketsString.slice(subPacketsCharactersUsed))
                subPacketsCharactersUsed += processPacketResult.charactersUsed
                packetVersionSum += processPacketResult.packetVersionSum
                subPacketsProcessed++
            }
            return {
                packetVersionSum: packetVersionSum,
                charactersUsed: 7 + 11 + subPacketsCharactersUsed
            }
        }
    }

}

//const input = 'D2FE28'
//const input = '38006F45291200'
//const input = 'EE00D40C823060'
//const input = '8A004A801A8002F478'
//const input = '620080001611562C8802118E34'
//const input = 'C0015000016115A2E0802F182340'
//const input = 'A0016C880162017C3686B18A3D4780'
const input = '40541D900AEDC01A88002191FE2F45D1006A2FC2388D278D4653E3910020F2E2F3E24C007ECD7ABA6A200E6E8017F92C934CFA0E5290B569CE0F4BA5180213D963C00DC40010A87905A0900021B0D624C34600906725FFCF597491C6008C01B0004223342488A200F4378C9198401B87311A0C0803E600FC4887F14CC01C8AF16A2010021D1260DC7530042C012957193779F96AD9B36100907A00980021513E3943600043225C1A8EB2C3040043CC3B1802B400D3CA4B8D3292E37C30600B325A541D979606E384B524C06008E802515A638A73A226009CDA5D8026200D473851150401E8BF16E2ACDFB7DCD4F5C02897A5288D299D89CA6AA672AD5118804F592FC5BE8037000042217C64876000874728550D4C0149F29D00524ACCD2566795A0D880432BEAC79995C86483A6F3B9F6833397DEA03E401004F28CD894B9C48A34BC371CF7AA840155E002012E21260923DC4C248035299ECEB0AC4DFC0179B864865CF8802F9A005E264C25372ABAC8DEA706009F005C32B7FCF1BF91CADFF3C6FE4B3FB073005A6F93B633B12E0054A124BEE9C570004B245126F6E11E5C0199BDEDCE589275C10027E97BE7EF330F126DF3817354FFC82671BB5402510C803788DFA009CAFB14ECDFE57D8A766F0001A74F924AC99678864725F253FD134400F9B5D3004A46489A00A4BEAD8F7F1F7497C39A0020F357618C71648032BB004E4BBC4292EF1167274F1AA0078902262B0D4718229C8608A5226528F86008CFA6E802F275E2248C65F3610066274CEA9A86794E58AA5E5BDE73F34945E2008D27D2278EE30C489B3D20336D00C2F002DF480AC820287D8096F700288082C001DE1400C50035005AA2013E5400B10028C009600A74001EF2004F8400C92B172801F0F4C0139B8E19A8017D96A510A7E698800EAC9294A6E985783A400AE4A2945E9170'
let binaryString = ''
// TODO: make version sum non-global
let versionSum = 0
for (var i = 0; i < input.length; i++) {
    // convert the hex characters into 4 digit binary strings
    binaryString += parseInt(input[i],16).toString(2).padStart(4,'0')
}
console.log(processPacket(binaryString))
console.log(versionSum)