const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecastService = require('./utils/forecast-service')

const app = express()
const PORT = process.env.PORT || 3000

// Define paths for Express Config
const partialsPath = path.join(__dirname, '../templates/partials')
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup handlesbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Silviu Stefan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Silviu Stefan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This page was created with HBS',
        name: 'Silviu Stefan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Silviu Stefan',
        errorMessage: 'Help article not found!'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address!'
        })
    }

    forecastService.getWeather(req.query.address, (data) => {
        res.send(data)
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Silviu Stefan',
        errorMessage: 'Page not found!'
    })
})

app.listen(PORT, () => {
    console.log('STARTED on port ', PORT)
})