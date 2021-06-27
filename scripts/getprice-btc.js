const btcusd = require('../btcusd-formatted.json')
const punkData = require('../punk-data.json')
const fs = require('fs');


btcusd.forEach(arr => {
    arr[0] = arr[0].substring(0,10)
});


for(let i = 0; i < btcusd.length; i ++){
    for(let j = 0; j < btcusd[i].length; j++){
        punkData.forEach(event => {
            if(event.time === btcusd[i][j]){
                const BTCDaily = btcusd[i][j + 1].toFixed(2)
                event.priceInBTC = event.priceInUSD / BTCDaily
                event.priceInBTC = event.priceInBTC.toFixed(10)
            }
        });
    }
    try {
        fs.writeFileSync('punk-data-RAW-270621.json', JSON.stringify(punkData))
    }
    catch (err){
        console.log(err)
    }
}

console.log(punkData, 'punkData');

