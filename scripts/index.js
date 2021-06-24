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

const getPunkIndexes = async (filter, start, end) => {
  let totalIndexes = []

  while(start > cryptoPunkGenesis){
    const events = await contract.queryFilter(filter, start, end)
    let punkIndexes = events.map(event => {return event.args.punkIndex});
    punkIndexes = punkIndexes.map(punkIndex => { 
      let result = ethers.utils.formatUnits(punkIndex._hex);
      result = result.replace(/\./g, '')
      return parseInt(result, 10)});
    console.log(punkIndexes)
    punkIndexes.forEach(punkIndex => {totalIndexes.push(punkIndex)})
    start = start - 1000000;
    end = end - 1000000;
  }
  return totalIndexes 
}

const getTransferBlocks = async (filter, start, end) => {
  let totalBlocks = []

  while(start > cryptoPunkGenesis){
    const events = await contract.queryFilter(filter, start, end)
    const blockNumbers = events.map(event => {return event.blockNumber})    
    console.log(blockNumbers);
    blockNumbers.forEach(blockNumber => {totalBlocks.push(blockNumber)})
    start = start - 1000000;
    end = end - 1000000;
  }  
  return totalBlocks;
}

// let punkIndexes = await getPunkIndexes(filter, startBlock, endBlock);
// console.log('punkIndexes', punkIndexes)

let blocks = await getTransferBlocks(filter, startBlock, endBlock);
blocks = blocks.sort((a, b) => b - a);

let dates = []
for await (block of blocks) {
  let result = await provider.getBlock(block);
  result = fromUnixTime(result.timestamp);
  dates.push(result);
  console.log(dates);
  try {
    fs.writeFileSync('dates.json', JSON.stringify(dates))
  }
  catch (err){
    console.log(err)
  }
}


  
 }


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });