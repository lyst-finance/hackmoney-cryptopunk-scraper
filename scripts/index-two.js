const hre = require("hardhat");
const ethers = require('ethers');
const EthDater = require('ethereum-block-by-date'); 
const fromUnixTime = require('date-fns/fromUnixTime');
const fs = require('fs');

async function main() {
   
const cryptoPunksABI = require('../abis/cryptoPunksMarketABI.json')
const cryptoPunksAddress = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";
const cryptoPunkGenesis = 3914495;
const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/gRR0KK-rRxTfSUdGd_g11RvpjrgCRN8a");
const contract = new ethers.Contract(cryptoPunksAddress, cryptoPunksABI, provider)

const dater = new EthDater(provider)
const now = await dater.getDate()
let endBlock = now.block;
let startBlock = endBlock - 1000000;

const filter =  contract.filters.PunkBought();


const getData = async (filter, start, end) => {
  let totalData = [];
  
  while(start > cryptoPunkGenesis){
    const events = await contract.queryFilter(filter, start, end)
    const data = events.map(event => {
        const blockNumber = event.blockNumber;
        let punkIndex = event.args.punkIndex;
        let value = event.args.value;
        value = ethers.utils.formatUnits(value._hex);
        punkIndex = ethers.utils.formatUnits(punkIndex._hex)
        .replace(/\./g, '');
        punkIndex = parseInt(punkIndex, 10)
        return {
            block: blockNumber,
            time: '',
            punkIndex : punkIndex,
            priceInETH : value
        }
    });
    data.forEach(array => {totalData.push(array)})
    
    start = start - 1000000;
    end = end - 1000000;
    console.log('Truncating ... ', data)
    
  }
  try {
    fs.writeFileSync('data.json', JSON.stringify(totalData))
  }
  catch (err){
    console.log(err)
  }
  return totalData;
}

let data = await getData(filter, startBlock, endBlock);
console.log('DATA : ', data)



// blocks = blocks.sort((a, b) => b - a);

// let dates = []
// for (const block of blocks) {
//   let result = await provider.getBlock(block)
//   result = fromUnixTime(result.timestamp)
//   dates.push(result);
//   console.log(dates);  
// }
//   try {
//     fs.writeFileSync('dates.json', JSON.stringify(dates))
//   }
//   catch (err){
//     console.log(err)
//   }
 }


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });