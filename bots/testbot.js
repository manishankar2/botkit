var botproto = require('./../bot_class.js')

var name = 'testbot';

var token = "xoxb-24392860727-AdkkueajeBp8m4SNXugGIn9w"

var testbot = new botproto(name, token);

testbot.controller.hears(['hello'],'direct_message,direct_mention,mention',function(bot, message) {
	bot.reply(message,"hi");
	
});

testbot.controller.hears('channels', 'direct_message', function(bot, message){
	var channels = [];
	bot.api.channels.list({}, function(err, response){
		response_channels = response.channels;
		response_channels.forEach(function(channel){
			channels.push(channel.name);
		});
		bot.reply(message, channels.join('"\n"'))
	});
});


module.exports = testbot;