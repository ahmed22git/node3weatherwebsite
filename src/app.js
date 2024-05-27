const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


console.log(__dirname)
//define paths for Express Config
const publicdirectory = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdirectory))

app.get('',(req,res) => {

    res.render('index', {
        title:'weather app',
        name:'ahmed'
    })
})
app.get('/about',(req,res) => {

    res.render('about', {
        title:'About',
        name:'ahmed'
        
    })
})

app.get('/help',(req,res) => {

    res.render('help', {
        title:'Help',
        name:'ahmed'
        
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
             error:'must provide a address'
        })

    }
    geocode(req.query.address, (error , {latitude , longitude , location} ={}) =>  {
        if (error){
            return res.send({ error })
        }
        forecast(latitude , longitude , (error , forecastdata) =>{
            if(error)
                {
                    return res.send({error})
                }
                res.send({
                    forecast : forecastdata,
                    location,
                    address : req.query.address

                })
        })


    } )




    // res.send(
    //     {
    //         forecast:'Its is windy',
    //         address : req.query.address
    //     }
    // )
})


app.get('/help/*',(req,res) => {

    res.render('404page', {
        title:'404',
        name:'ahmed',
        errormessage:'Help article not found'
        
    })
})
app.get('*',(req,res) =>{
    res.render('404page',{
        title:'404',
        name:'ahmed',
        errormessage:'page not found'
    })
})


app.listen(3000 , () =>{
    console.log('Start correctly')
})