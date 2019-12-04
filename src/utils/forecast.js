const request = require('request')

const url = ((latitute, longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/fc18819bf5c77df6b038d61299312a81/' + latitute + ',' + longitude 

    request({url:url, json:true},(error,response) =>{
        if (error) {
            callback('unable to connect to server',undefined)
        }
        else if (response.body.error){
                callback('no location detected',undefined)
        }
        else {
                 callback(undefined, response.body.daily.data[0].summary + ' it is currently '  +   response.body.currently.temperature + '  .precipitation chances is ' + response.body.currently.precipProbability)
        }
    })

})
module.exports = url