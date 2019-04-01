const getWeather = (address, callback) => {
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return callback({ error: data.error }, undefined)
            } else {
                return callback(undefined, data)
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value
    getWeather(location, (error, data) => {
        if (error) {
            messageOne.textContent = error.error
            messageTwo.textContent = ''
            return
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    })

})