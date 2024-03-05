import request from 'postman-request'

const forecast = (lat, lon, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=07023430a912df6639eac6ed6ef89783&query=${lat + ',' + lon}`

  request({url, json: true}, (err, {body}) => {
    if(err) {
      callback("Unable to connect to Weather API")
    }
    else if(body.error) {
      callback("Unable to get Weather Data/Location")
    }
    else {
      callback(null, body.current)
    }
  })
}

export {forecast}