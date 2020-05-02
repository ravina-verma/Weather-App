const request=require('request')
const forcast=(x,y,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=cacf514feaf78511ff8c5ce5ec1759e7&query='+ x + ',' + y 
    request({url, json: true},(error,{body}={})=>{
       if(error)
       callback("unable to connect to weather service!",undefined)
       else if(body.error)
       callback("unable to find location",undefined)  //url plm
       else{
           callback(undefined,{
               forcast:body.current.weather_descriptions[0],
               temperature:body.current.temperature,
                humidity:body.current.humidity
           })
       }
           
   })
}
/*const forcast=(x,y,callback)=>{
     const url='http://api.weatherstack.com/current?access_key=cacf514feaf78511ff8c5ce5ec1759e7&query='+ x + ',' + y 
     request({url: url, json: true},(error,response)=>{
        if(error)
        callback("unable to connect to weather service!",undefined)
        else if(response.body.error)
        callback("unable to find location",undefined)  //url plm
        else{
            callback(undefined,{
                forcst:response.body.current.weather_descriptions[0],
                temperature:response.body.current.temperature
            })
        }
            
    })
}*/
module.exports=forcast