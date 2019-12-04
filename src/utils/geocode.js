const request = require('request')


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYmx1ZWN1Y3VtYmVyIiwiYSI6ImNrM3B1OGcxcjA0N20za21rbTVjZHRsb2QifQ.0ZSG-Egeo4l8noumr_ZYUw'

    request({url:url, json:true}, (error, response) => {
        console.log(response.body.features.length)
        if (error) {
            callback('unable to connect to server',undefined)
        }
        else if (response.body.features.length === 0) {
            callback('unable to find location',undefined)
        }
        else {
            callback(undefined, {
                latitute: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}


module.exports = geocode