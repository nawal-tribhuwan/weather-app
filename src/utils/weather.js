const request = require('request')

const currentWeather = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=cce0b02cd267f5e5cdd261399bfa1800&query='+latitude+','+longitude

    request({ url: url, json: true }, (error, {body}={}) => {
    
        if (error) {      
           callback('Error accessing Api '+error, undefined)
        }
        else if(body.error)   {
            callback("API Error "+JSON.stringify(body.error,),undefined);
        }
        else  {
           // console.log(response.body)
           const degrees = body.current.temperature
           const precipitation = body.current.precip
           const weather_description = body.current.weather_descriptions[0]
           const place = body.location.name+', '+body.location.region+', '+body.location.country
           const forecast = 'Weather is '+body.current.weather_descriptions[0]+' and Temprature is '+body.current.temperature+' degress with '+precipitation+'% chance of rain'

            const weatherData = {
                degrees,
                precipitation,
                weather_description,
                place,
                forecast                
            }
            callback(undefined,weatherData)
        }
    })
}

module.exports=currentWeather