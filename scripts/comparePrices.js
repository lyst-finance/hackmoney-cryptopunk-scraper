const ethusd = require('../ethusd-formatted.json')
const btcusd = require('../btc-coingecko.json')
const data = require('../punk-data-total.json')
const fs = require('fs');

data.forEach(event => {
    event.time = event.time.substring(0,10)
});

ethusd.forEach(arr => {
    arr[0] = arr[0].substring(0,10)
    // console.log(arr)
});



for(let i = 0; i < ethusd.length; i ++){
    for(let j = 0; j < ethusd[i].length; j++){
        data.forEach(event => {
            if(event.time === ethusd[i][j]){
                event.priceInUSD = ethusd[i][j + 1].toFixed(2)
            }
        });
    }
    try {
        fs.writeFileSync('punk-data-ethusd.json', JSON.stringify(data))
    }
    catch (err){
        console.log(err)
    }
}

