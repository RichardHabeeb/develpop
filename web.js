/*************************************************
 * Wacky Waving Inflatable Flailing Arm Tube Men
 * develpop
 * Node.js Express framework required
 *
 *************************************************/
 
 
 //------------------------------------------------ REQUIRES
var express 	= require("express");

var content		= require("./content.js");

var memjs = require('memjs');


 //------------------------------------------------ GLOBALS
var app 		= express();
var port 		= process.env.PORT || 80;
var mc 			= memjs.Client.create()


 //------------------------------------------------ CONFIG
app.use(express.logger());



mc.get('hello', function(val) {
    console.log("winning!~",val);
})


//------------------------------------------------ ROUTES
app.get('/', content.root);

//STYLESHEETS
app.get('/css/:style', content.stylesheet);

//JS
app.get('/js/:script', content.script);

//IMAGES
app.get('/images/:image', content.image);
app.get('/images/:year/:image', content.eventImage);

//CONTENT
app.get('/content/:page', content.page);

app.listen(port, function() {
	console.log("Listening on " + port);
});