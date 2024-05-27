const request = require('postman-request')


const forecast = ( latitude , longitude , callback ) => {

    const url = 'http://api.weatherstack.com/current?access_key=3c8f809303f7d989660bc7a967e43025&query=' + latitude + ',' + longitude + '&units=f'
    

    request ({ url , json : true } , (error , {body}) => {

        if(error){
            callback('Unable to connect to service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + " .It is currently "  +  body.current.temperature + "but feels like" + body.current.feelslike)
        }
    })
}


module.exports =  forecast