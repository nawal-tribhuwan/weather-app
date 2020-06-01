const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmF3YWwyMSIsImEiOiJja2FxZWJvazkwdWF4MnFwMWhxNDJ4eXJpIn0.S3pAr9KAvir03F1WT-4-ag&limit=1'
   
    request({url:url,json:true},(error,{body}={})=>{

        if (error){
            callback("Unable to Connect to API !!",undefined)    
        }
        else if(body.message) {
            callback('Invalid address '+address+' '+body.message, undefined)
        }
        else if ( parseInt(JSON.stringify(body.features.length)) !== 0)   {
            
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const place =  body.features[0].place_name
            
            data = {
                latitude,
                longitude,
                place
            }
            callback(undefined,data)
        }
        else
        {
            
            callback('Invalid address '+address, undefined)
        }

    })

}

module.exports = geocode   
