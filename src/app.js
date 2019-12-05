const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
                                        //req=request res=respond
const app = express()
const port = process.env.PORT || 3000
//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../public/templates/views')
const partialPath = path.join(__dirname,'../public/templates/partials')

// setup handlebars
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// setup static directory 
app.use(express.static(publicDirectoryPath))
app.get('',(req,res) =>{
    res.render('index',{
        name:'aditya',
        heading:'weather',
        title:'weather'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'about',
        name:'aditya'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'help',
        name:'aditya'
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'no location input'
        })

    

    }
    else{
    console.log(req.query.address)

    geocode(req.query.address,(error,data) =>{
        if(error) {
            return res.send({error})
        }

        forecast(data.latitute, data.longitude,(error,forecastData) =>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
    }
})
app.get('*',(req,res) =>{
    res.render('404',{
        errormessage: 'page not found',
        name:'aditya'
    })
})


app.listen(port, () =>{
    console.log('server is running at ' + port)
})