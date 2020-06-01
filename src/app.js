const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const currentWeather = require('./utils/weather')

const app = express()

const publicPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views') 
const partialPath = path.join(__dirname,'../templates/partials') 



app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('',(req,res)=>{
   res.render('index',{
       title:'Home Page',
       name:'Nawal'
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nawal'
    })
 })

 app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is the help message for you. Please call us for any help needed we are open 24x7.'
    })
 })

app.get('/weather',(req,res)=>{
    const address = req.query.address

    if (address) {

        geocode(address,(error,{latitude,longitude}={})=>{
            if (error)  {
                return res.send({
                    error
                })
            }
        
            currentWeather(latitude,longitude,(error,dataWeather)=>{
            if (error){
                return res.send({
                    error
                })
            }

                const {place} = data
                const {forecast} = dataWeather
              
                return res.send({
                        place: place,
                        forecast: forecast
                    })   
            }) 
        })
    }
    else
    {
        res.send({
            error : "missing address in the query parameter"
        })
    }
})


app.get('*',(req,res)=>{
    res.status(404).render('404',{
        title:'404',
        errorMessage:'Page not found'

    })
})

app.listen(3000, ()=>{
    console.log('server Started ........!!')
})