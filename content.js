/*************************************************
 * Wacky Waving Inflatable Flailing Arm Tube Men
 * develpop
 * Node.js Express framework required
 *
 *************************************************/
 
 
//------------------------------------------------ REQUIRES
var fs  		= require("fs");
var drinkKeys	= require("./drink_list.js").drinkKeys;


var memjs = require('memjs');

var mc 			= memjs.Client.create()


//------------------------------------------------ ROUTES

exports.root 			= function(req, res) { 

drink_dic = {};
var i = 0;

var callback = function(err, value, key){
	if( value != null ){
		console.log(drinkKeys[i], " has ", value.toString(), " votes");
		drink_dic[drinkKeys[i]] = key;
	}
	else{
		drink_dic[drinkKeys[i]] = 0;
	}
	i++;
	if( i < drinkKeys.length){
		mc.get(drinkKeys[i], callback);
	}
}

mc.get(drinkKeys[i], callback);

res.cookie("drinks", JSON.stringify(drink_dic));

res.sendfile("index.html", res); 

};

exports.stylesheet 		= function(req, res) { res.sendfile('css/' + req.params.style); };
exports.script	 		= function(req, res) { res.sendfile('js/' + req.params.script); };
exports.image	 		= function(req, res) { res.sendfile('images/' + req.params.image); };

exports.page	 		= function(req, res) { res.sendfile('content/' + req.params.page); };


exports.upvote			= function(req, res) {
	if( req.session.voted === 'undefined') {
		mc.increment( req.params.drink, 1, function(err, success) {
			console.log("upvote: ", req.params.drink );
			req.session.voted = new Date();
			//res.redirect("/");
			res.send("");
		});
	}
	console.log("attempting to upvote:", req.params.drink);
}

