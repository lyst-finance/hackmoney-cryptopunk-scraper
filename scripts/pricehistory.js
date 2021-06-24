const ethusd = require('../ethusd.json')
const fromUnixTime = require('date-fns/fromUnixTime');
const fs = require('fs');

const coingeckoDates = () => {
    let date;
    for(let i = 0; i < ethusd.length; i++){
        for(let j = 0; j < ethusd[i].length; j++){
            if(j === 0){
                let timestamp = ethusd[i][j];
                timestamp = timestamp.toString()
                timestamp = timestamp.substring(0,10)
                timestamp = parseInt(timestamp)
                timestamp = fromUnixTime(timestamp)
                ethusd[i][j] = timestamp;
            }
        }
    }
    try {
        fs.writeFileSync('ethusd-formatted.json', JSON.stringify(ethusd))
    }
    catch (err){
        console.log(err)
    }
}

coingeckoDates();
console.log(ethusd)
