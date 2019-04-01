const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8d2a8512ca8bc895894b18bf1bca8c2e/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = body.currently
            const today = body.daily.data[0]
            callback(undefined, {
                summary: currently.summary,
                forecast: 'It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain. ' +
                'The high today is ' + today.temperatureMax + ', with a low of ' + today.temperatureMin
            })
        }
    })
}

module.exports = forecast