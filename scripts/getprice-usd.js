const punkData = require('../punk-data-ethusd.json')
const data = require('../data-updated-copy.json')
const fs = require('fs');



punkData.forEach(event => {
    event.priceInUSD = event.priceInETH * event.priceInUSD;
    event.priceInUSD = event.priceInUSD.toFixed(2);
});

try {
    fs.writeFileSync('punk-data.json', JSON.stringify(punkData))
}
catch (err){
    console.log(err)
}

console.log(punkData)

