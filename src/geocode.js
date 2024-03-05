import request from 'postman-request'

const geocode = (address, callBack, lim = 1) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2F1c2giLCJhIjoiY2x0NDFieWh4MGQyZTJqcHNmMDN2MzVxayJ9.vueP8rX2Ylw67ZCmTq-zgA&limit=${lim}`
  request({url, json: true}, (err, { body: {features}}) => {
    if(err) {
      callBack("Unable to access map API")
    }
    else if(features.length == 0) {
      callBack('Unable to find location')
    }
    else {
      callBack(null, 
               {
                 latitude: features[0].center[1],
                 longitude: features[0].center[0],
                 place: features[0].place_name
               })
    }
  })
}

export {geocode}