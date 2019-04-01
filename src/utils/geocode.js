const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lsdml1c3RlZmFuMSIsImEiOiJjanR2eGR1eHcxazl0NGducDhleGJodzlzIn0.OnFfVRKCKbndoUrFJsll0w&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const feature = body.features[0]
            const longitude = feature.center[0]
            const latitude = feature.center[1]
            callback(undefined, {
                latitude,
                longitude,
                location: feature.place_name
            })
        }
    })
}

module.exports = geocode