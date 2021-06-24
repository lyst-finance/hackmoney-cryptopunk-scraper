const dataUpdated = require('../data-updated.json')
const axios = require('axios')
const formatTimestamp = (times, isStart) => {

    const result = times.map(time => {
        let timestamp = time.replace(/\./g,':');
        timestamp = timestamp.split('')
        for( let i = 0; i < timestamp.length; i++){ 
            if(i > 16 && i < 20) {
                timestamp.splice(i, 1); 
            } 
            if(i === 17) {
                delete timestamp[i];
            }
        }
        timestamp = timestamp.join('')
        if(isStart === true){
            return {start : encodeURIComponent(timestamp)}
        } else {
            return {end : encodeURIComponent(timestamp)}
        }
    });
    return result    
}

const getEnd = (times) => {
    const result = times.map(time => {
        time = time.split('')
        for(let i = 0; i < time.length; i++){
            if(i === 9){
            time[i]++
            }
        }
        return time.join('')
    })
    return result 
}

let startTimes = dataUpdated.map(event => {return event.time})
let endTimes = getEnd(startTimes);
let query = formatTimestamp(startTimes, true);
endTimes = formatTimestamp(endTimes, false);

query.forEach(object => {
    endTimes.forEach(endTime => {
        object.end = endTime.end;
    })
})

for(times of query){
    console.log('time.start :', times.start, 'time.end', times.end)
}

const getData = async () => {
    for await (times of query){
        try{
            const answer = await axios.get(`https://api.nomics.com/v1/exchange-rates/history?key=3e8005d190e78b20a6d13e71bfbe00c704964a04&currency=ETH&start=${times.start}&end=${times.end}`)
            console.log(answer.data);
        } catch(error) {
            console.log(error)
        }
    }
}

getData();





// 2018-06-06T00:00:00Z
// 2021-03-27T17:55:00Z
//2021-03-27T17:55:000Z
// 2021-03-27T175:700
// 2021-03-27T17:55:47:000Z