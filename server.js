var express = require('express');

// create our app
var app = express();

// PORT for Heroku OR 3000 for localhost
const PORT = process.env.PORT || 3000;

// free version of openWeatherMap API only operates on http, so redirect all https traffic to http
app.use(function (req, res, next){
	if (req.headers['x-forwarded-proto'] === 'https'){
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
})

// tell app which folder to serve
app.use(express.static('public'));

app.listen(PORT, function(){
	console.log('Express server is up on port ' + PORT);
});
