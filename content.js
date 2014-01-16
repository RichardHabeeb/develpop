/*************************************************
 * Wacky Waving Inflatable Flailing Arm Tube Men
 * develpop
 * Node.js Express framework required
 *
 *************************************************/
 
 //+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

 
//------------------------------------------------ REQUIRES
var fs  		= require("fs");
var crypto 		= require('crypto');
var drinkKeys	= require("./drink_list.js").drinkKeys;
var memjs 		= require('memjs');


var mc 			= memjs.Client.create()


//------------------------------------------------ ROUTES

exports.root 			= function(req, res) { 
							drink_dic = {};
							var i = 0;
							drinkKeys = shuffle(drinkKeys);
							var callback = function(err, value, key) {
								if( value != null ){
									console.log(drinkKeys[i], " has ", value.toString(), " votes");
									drink_dic[drinkKeys[i]] = +value.toString();
								}
								else {
									mc.increment( drinkKeys[i], 1, function(err, success) {
										drink_dic[drinkKeys[i]] = 0;
									});
								}
								i++;
								if( i < drinkKeys.length) {
									mc.get(drinkKeys[i], callback);
								}
								else {
									res.cookie("drinks", JSON.stringify(drink_dic));
									res.sendfile("index.html", res); 
								}
							}

							mc.get(drinkKeys[i], callback);
						};
exports.stylesheet 		= function(req, res) { res.sendfile('css/' + req.params.style); };
exports.script	 		= function(req, res) { res.sendfile('js/' + req.params.script); };
exports.image	 		= function(req, res) { res.sendfile('images/' + req.params.image); };
exports.page	 		= function(req, res) { res.sendfile('content/' + req.params.page); };
exports.upvote			= function(req, res) {
							if( req.cookies == null || typeof req.cookies.sess === 'undefined' )
							{
								var shasum = crypto.createHash('sha1');
								shasum.update(String(Math.random()));
								var hash = String(shasum.digest('hex'));
								res.cookie('sess', hash, { expires: new Date(Date.now() + 900000), httpOnly: true });
								
								mc.add(hash, (new Date()).toJSON(), function(err, success) {
									mc.increment( req.params.drink, 1, function(err, success) {
										req.session.voted = new Date();
										console.log("upvote1: ", req.params.drink, hash );
										res.send("true");
									});
								});
							}
							else {
								mc.get( req.cookies.sess, function(err, value, key) {
									if( value == null && key == null || false /* DATE EXPIRED */ )
									{
										mc.increment( req.params.drink, 1, function(err, success) {
											req.session.voted = new Date();
											console.log("upvote2: ", req.params.drink, req.cookies.sess);
											res.send("true");
										});
									}
									else
									{
										console.log("failed to upvote:", req.params.drink, req.session.voted);
										res.send("false");
									}
								});
							}
							
							
						};

						
						
