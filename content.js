/*************************************************
 * Wacky Waving Inflatable Flailing Arm Tube Men
 * develpop
 * Node.js Express framework required
 *
 *************************************************/
 
 
//------------------------------------------------ REQUIRES
var fs  		= require("fs");


//------------------------------------------------ ROUTES

exports.root 			= function(req, res) { res.sendfile("index.html", res); };

exports.stylesheet 		= function(req, res) { res.sendfile('css/' + req.params.style); };
exports.script	 		= function(req, res) { res.sendfile('js/' + req.params.script); };
exports.image	 		= function(req, res) { res.sendfile('images/' + req.params.image); };

exports.page	 		= function(req, res) { res.sendfile('content/' + req.params.page); };

