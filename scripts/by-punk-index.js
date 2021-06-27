const fs = require('fs');
const punksGrouped = require('../punks-1995.json')
const punkData = require('../punk-data.json')
const bidData = require('../bid-data.json');
const { forEach } = require('lodash');

const getHighestBidder = () => {
    punksGrouped.forEach(event => {     
            const lookupBlock = getClosestBlock(event)  
            const missingETH = getmissingETH(lookupBlock);
            assignETH(event, missingETH);          
    });  
}

const getClosestBlock = (event) => {
    
    const goal = event.boughtBlock;
       
    let bidBlocks = bidData.filter(bid => {
        if(bid.blockNumber <= goal){
            return bid
            }
        });
    bidBlocks = bidBlocks.map(event => event.blockNumber);

    //find closest block to missing PunkBought block
    const closestBlock = bidBlocks.reduce((prev, curr) => {
        return (Math.abs(curr - goal) < Math.abs(prev - goal)
        ? curr : prev)
    });
    
    return closestBlock  
}

const getmissingETH = (lookupBlock) => {
    console.log('lookup Block', lookupBlock)
    
    for(let i = 0; i < bidData.length; i++){
        if(bidData[i].blockNumber === lookupBlock){
            console.log(
                lookupBlock, 
                bidData[i].blockNumber,
                bidData[i].priceInEth)
            return bidData[i].priceInEth
        }      
    }
}

const assignETH = (target, eth) => {
    
    punkData.forEach(event => {
        if(event.block === target.boughtBlock){         
            event.priceInETH = eth
        }
    })
}

const filtered = punksGrouped.filter(el => {
    if(el != null){
        return el
    }
})

getHighestBidder();

punkData.forEach(event => console.log(
    event.block, event.priceInETH, event.punkIndex, event.time
    ))

    try {
        fs.writeFileSync('punk-data-eth-total.json', JSON.stringify(punkData))
    }
    catch (err){
        console.log(err)
    }