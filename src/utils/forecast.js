
const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=211ded49ebc99d37d15e686f63e609c2&query=' + latitude + ',' + longitude + '&units=m'

    request({ 'url': url, json: true }, (err, response) => {
        if (err)
            callback('Unable to fetch forecast',undefined)
        else if (response.body.error)
            callback('Try another search place',undefined)
        else {
            callback(undefined, {
                'place': response.body.location.name,
                'ctry': response.body.location.country,
                'Temp': response.body.current.temperature,
                'wd': response.body.current.weather_descriptions[0],
                'feel': response.body.current.feelslike

            })
        }
    })

}
module.exports = {forecast:forecast}