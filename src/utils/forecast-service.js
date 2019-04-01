const forecast = require('./forecast')
const geocode = require('./geocode')

const getWeather = (address, callback) => {
    if (!address) {
        callback({
            error: 'Please provide and address!'
        })
    }

    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return callback({ error })
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return callback({ error })
            }

            return callback({
                address,
                location,
                forecast: data.forecast
            })
        })
    })
}

module.exports = {
    getWeather
}