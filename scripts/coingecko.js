
const data = require('../data-updated-copy.json')
const axios = require('axios')
const fs = require('fs');


const formatTime = (timestamps) => {
    console.log(timestamps)     
    const result = timestamps.map(timestamp => {
        timestamp = timestamp.split('')
        let formatted = [];
        for(let i = 0; i < timestamp.length; i++){
            if(i < 10 ){
                formatted.push(timestamp[i])
            }
        }
        formatted = formatted.join('');
        let year = formatted.substring(0,4);
        let month = formatted.substring(4,8);
        let day = formatted.substring(8);
        return day + month + year      
    })
    return result 
}


let timestamps = data.map(event => {return event.time});
timestamps = formatTime(timestamps);


// https://api.coingecko.com/api/v3/coins/ethereum/history?date=01-01-2021

const getData = async () => {
    for await (times of timestamps){
        console.log(times);
        try{
            const answer = await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/history?date=01-01-2021`)
            console.log(answer.data);
        } catch(error) {
            console.log(error)
        }
    }
}

getData();