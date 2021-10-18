const express=require('express')
const app=express()
const path=require('path')
const hbs =require('hbs')
const geocode = require('./utils/geo.js')
const forecast=require('./utils/forecast.js')


//setting up the view engine so defaultey it looks into views folder for hbs files as specified
app.set('view engine', 'hbs')

//alternate path setup as default looks for views folder
app.set('views', 'templates/views')//general ->webserver->loc of new views path

//setting up the partials so that we can load it every file that we want include 
hbs.registerPartials(path.join(__dirname,'../templates/partials'))



/*console.log(__dirname)
console.log(__filename)
//express.static(path.join(__dirname,'../public'))
//app.use('',express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
		res.(app.use(express.static(path.join(__dirname,'../public'))))
})*/


//form this the server starts express looks in the public folder and returns from the request 
app.use(express.static(path.join(__dirname, '../public')))




app.get('',(req,res)=>{
	res.render('index',{
		title:'my pro',
		name: 'Hari'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'Address must be specified.' })
	}
	
	/*geocode.geocode(req.query.address, (err,data) => {
		//console.log(data.Latitude, data.Longitude ,data.place)
		if (err)
			return res.send(err)
		forecast.forecast(data.Latitude, data.Longitude, (err, forecast_data) => {
			if (err)
				return res.send(err)
			res.send(forecast_data)
        })

	})*/
	geocode.geocode(req.query.address, (err, data/*{latitude, longitude, place }*/ ) => {//default param ie undefined so no app crsh
		//console.log(data.Latitude, data.Longitude ,data.place)
		if (err)
			return res.send(err)
		forecast.forecast(data.Latitude, data.Longitude, (err, forecast_data) => {
			if (err)
				return res.send(err)
			res.send(forecast_data)
		})

	})

})
//app.use('/help',express.static(path.join(__dirname,'../public/help.html')))
//app.use('/about',express.static(path.join(__dirname,'../public/about.html')))
app.get('/help/*', (req, res) => {
	res.render('404', {name:'hari'})
})

app.get('*', (req, res) => {
	res.render('404', {name:'Hari'})
})


app.listen(3000,()=>{
	console.log('Server Started on port 3000')
})