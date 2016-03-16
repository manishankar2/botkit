var Botkit = require('./lib/Botkit.js');

Bot_Property = function(){};

Bot_Property.prototype.bot_name = function(name){
	this.bot_name = name;
};

Bot_Property.prototype.token = function(token){
	this.token = token;
};

Bot_Property.prototype.controller = Botkit.slackbot({
		debug : true
});

Bot_Property.prototype.bot = function(controller){
	this.bot = controller.spawn({
	    token: this.token
	});
};

module.exports = Bot_Property;