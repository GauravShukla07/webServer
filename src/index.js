// Web server deployement and rendering
import express from 'express'
// extracting paths
import {URL} from 'node:url'
// formatting paths
import * as path from 'node:path'
// handlebars for dynamic and consistent look using partials and views
import  hbs from 'hbs'

import {forecast} from './forecast.js'
import {geocode} from './geocode.js'

// Web app/server directory location
const dirpath = new URL('..', import.meta.url).pathname
// location of static files to be provided like css , image or client side js script files
const staticPath = path.join(dirpath, 'public')
// location of views to be renedered
const viewsPath = path.join(dirpath, 'templates', 'views')
// location of partials
const partialsPath = path.join(dirpath, 'templates', 'partials')
// just an image stored in static directory
const imgname = 'download.jpg'
// launching an app
const app = express()

// setup views location, handlebats engine and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve static files
app.use(express.static(staticPath))

// home/landing page and other pages being served and rendered using views
app.get('', (req, res) => {
  res.render('index', {
    title: `Weather`,
    name: `Gaurav Shukla`
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: `Gaurav Shukla`,
    img: path.join('img', imgname)
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: `Help!`,
    name: `Gaurav Shukla`
  })
})

// using get we aquire only a single http/https request so we can 'send' only a single response thats why return res.send is used to avoid 'send'ing two times
app.get('/weather', (req, res) => {
  if(!req.query.location) {
    return res.render('weather', {
      title: 'Location query error',
      error: 'Please provide a valid location in query'
    })
  }
  geocode(req.query.location, (err, {latitude, longitude, place} = {}) => {
    if(err) {
      return res.send({
        title: `${place} Weather`,
        error: err
      })
    }
    else {
      forecast(latitude, longitude, (err, {temperature, feelslike, weather_descriptions} = {}) => {
        if(err) {
          return res.send({
            title: `${req.query.location} Weather`,
            error: err
          })
        }
        else {
          res.send({
            place,
            weather:`Weather: ${weather_descriptions}`,
            temperature:`Temperature: ${temperature}`,
            feelslike:`Feels Like: ${feelslike}`
          })
        }
      })
    }
  })
})

// fetch("")

app.get('/*', (req, res) => {
res.render('error', {
  title: `404 Error`,
  error: "Page Not Found!!!"
})
})

const Port = process.env.PORT || 3000

// starting the server at "Port" if provided as an environment variable or 3000 if not
app.listen(Port, () => {
  console.log('Server started on port 3000')
})