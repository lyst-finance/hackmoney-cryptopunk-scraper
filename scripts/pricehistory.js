const ethusd = require('../ethusd.json')
const btcusd = require('../btc-coingecko.json')
const fromUnixTime = require('date-fns/fromUnixTime');
const fs = require('fs');

const coingeckoDates = () => {
    let date;
    for(let i = 0; i < btcusd.length; i++){
        for(let j = 0; j < btcusd[i].length; j++){
            if(j === 0){
                let timestamp = btcusd[i][j];
                timestamp = timestamp.toString()
                timestamp = timestamp.substring(0,10)
                timestamp = parseInt(timestamp)
                timestamp = fromUnixTime(timestamp)
                btcusd[i][j] = timestamp;
            }
        }
    }
    try {
        fs.writeFileSync('btcusd-formatted.json', JSON.stringify(btcusd))
    }
    catch (err){
        console.log(err)
    }
}

coingeckoDates();
console.log(btcusd)
