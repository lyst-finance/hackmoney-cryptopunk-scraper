const bidData = require('../bid-data.json');
const punkData = require('../punk-data-RAW.json');
const fs = require('fs')
const _ = require('lodash');

const getBoughtByIndex = (missingData) => {

    const punkIndexes = missingData.map(event => {
        return {
            punkIndex: event.punkIndex,
            boughtBlock: event.block
        }
    });
  
    const sortedIndexes = punkIndexes.sort((a, b) => {
        return a.punkIndex - b.punkIndex
    });
    
    console.log(sortedIndexes, 'SORTED INDEXES', sortedIndexes.length);
    try{
        fs.writeFileSync('punks-1995.json', JSON.stringify(sortedIndexes))
    }
    catch (err){
        console.log(err)
    }
    

}
    
const missingData = punkData.filter(event => {
    if(event.priceInETH == 0.0){
        return event
    }
});

getBoughtByIndex(missingData);


