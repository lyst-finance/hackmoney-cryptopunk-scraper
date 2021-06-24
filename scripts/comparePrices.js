const ethusd = require('../ethusd-formatted.json')
const data = require('../data-updated-copy.json')
const fs = require('fs');

data.forEach(event => {
    event.time = event.time.substring(0,10)
});

ethusd.forEach(arr => {
    arr[0] = arr[0].substring(0,10)
});

console.log(data)
console.log(ethusd);

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

console.log(data)