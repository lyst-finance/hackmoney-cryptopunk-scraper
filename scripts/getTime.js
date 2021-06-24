const data = require('../data.json');
const fs = require('fs');
const fromUnixTime = require('date-fns/fromUnixTime');

async function main() {

    const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/gRR0KK-rRxTfSUdGd_g11RvpjrgCRN8a");
    
    let dataUpdated = []
    for await (item of data) {
        let result = await provider.getBlock(item.block);
        console.log('timestamp', result.timestamp);
        result = fromUnixTime(result.timestamp);
        item.time = result;
        dataUpdated.push(item);
        try {
            fs.writeFileSync('data-updated-copy.json', JSON.stringify(dataUpdated))
        }
        catch (err){
            console.log(err)
        }
        console.log(item);       
    }
    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });