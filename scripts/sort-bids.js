const bidData = require('../bid-data.json');
const punkData = require('../punk-data-RAW.json');

const totalData = []

const getBidsAtIndex = (indexMatch) => {
    const result = bidData.filter(bid => {
        if(bid.punkIndex === indexMatch){
            return bid
        }
    })
    return result 
}

punkData.forEach(event => {
    bidData.forEach(bid => {
        if(bid.punkIndex == event.punkIndex){
            const result = getBidsAtIndex(bid.punkIndex);
            totalData.push(result);
        }
    })
});


console.log(totalData);