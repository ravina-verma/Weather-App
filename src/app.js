const path=require('path')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const hbs=require('hbs')
const express = require('express')

const app=express()
const port=process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsDirectoryPath= path.join(__dirname, '../views/tmp')
const partialsPath= path.join(__dirname, '../views/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.use(express.static(viewsDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: "WEATHER APP",
        name: 'Ravina Verma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        image:'img/1.jpg',
        name: 'Ravina Verma'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:"here i am going to help you",
        name: 'Ravina Verma'
    })
})
//query string
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    const address=req.query.address
    geocode(address,(error,{lattitude,longitude,location}={})=>{  //destructuring
    if(error){
         return res.send(error)
    }
    forecast(lattitude,longitude,(error,forcastdata)=>{
        if(error)
        return res.send(error)
        res.send({
           Temperature: forcastdata.temperature,
           forcast:forcastdata.forcast,
            location: location,
            humidity:forcastdata.humidity
           //address:req.query.address
       })
    })
})

    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Ravina Verma',
        errormsg: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Ravina Verma',
        errormsg: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up on port 3000')
})
/*
app.get('',(req,res)=>{
    res.send("<h1>hello express</h1>")
})
app.get('/help',(req,res)=>{
    res.send([{
        name:'ravina'
    },
    {
        name:'renu'
    }
  ])
})
app.get('/about',(req,res)=>{
    res.send("<h1>about page</h1>")
})*/