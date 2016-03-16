var Botkit = require('./lib/Botkit.js');

var botmethod = function(name, token){
	this.name = name;
	this.token = token;
	this.controller =  Botkit.slackbot({
    	debug: false,
	});
	this.bot = this.controller.spawn({
		token: this.token
	});
};

module.exports = botmethod;