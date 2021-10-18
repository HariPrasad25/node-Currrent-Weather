const request = require('request')
const geocode = (search_text,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search_text + '.json?access_token=pk.eyJ1Ijoic2hpdmEyNTA5IiwiYSI6ImNrdTlpdXBxMjA3YjAyd3F2b2szeHFyMG4ifQ.tR1HxT4TlB-kGPkFpb8j-w&limit=1'
    request({ 'url': url, json: true }, (err, response) => {
        //console.log(!response.body.features.length)
        if (err)
            callback('Unable to get forecast', undefined)
        else if (response.body.features.length===0)
            callback('Try another search', undefined)
        
        else {
            callback(undefined, {
                'Longitude': response.body.features[0].center[0],
                'Latitude': response.body.features[0].center[1],
                'place': response.body.features[0].place_name
            })
            
        }


    })
}
module.exports = {geocode:geocode}


