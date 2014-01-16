/*************************************************
 * Wacky Waving Inflatable Flailing Arm Tube Men
 * develpop
 * Node.js Express framework required
 *
 *************************************************/
 
//------------------------------------------------ REQUIRES
var express 	= require("express");
var content		= require("./content.js");

//------------------------------------------------ GLOBALS
var app 		= express();
var port 		= process.env.PORT || 80;


//------------------------------------------------ CONFIG
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.cookieSession({secret : "blah blah"}));





//------------------------------------------------ ROUTES
app.get('/', content.root);

//STYLESHEETS
app.get('/css/:style', content.stylesheet);

//JS
app.get('/js/:script', content.script);

//IMAGES
app.get('/images/:image', content.image);

//CONTENT
app.get('/content/:page', content.page);

//SERVER PROCESS
app.get('/upvote/:drink', content.upvote);


app.listen(port, function() {
	console.log("Listening on " + port);
});