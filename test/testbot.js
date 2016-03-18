var botproto = require('./../bot_class.js')

var name = 'testbot';

var token = "xoxb-24392860727-AdkkueajeBp8m4SNXugGIn9w"

var testbot = new botproto(name, token);



testbot.controller.hears(['hi','hello', 'hey'],'direct_message,direct_mention,mention',function(bot, message){
	bot.api.reactions.add({
	    timestamp: message.ts,
	    channel: message.channel,
	    name: 'panda_face',
	},function(err, res) {
	    if (err) {
	        bot.botkit.log('Failed to add emoji reaction :(',err);
	    }
	});
	bot.startConversation(message, function(response, convo){
		bot.api.users.info({user : message.user}, function(err, response){
			if(err){
				console.log(err);
			}else{
				if (response.user){
					user = response.user
				}
			}
			if (user){
				convo.say('hello ' + user.name + ' :nerd_face:');
			}
			convo.say('lets get started. type *menu list* to know the list of menus i can offer');
		});
	});
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

testbot.controller.hears(['shutdown'],'direct_message,direct_mention',function(bot, message) {

	if (message.user == 'U0KGP8R8X'){
		bot.startConversation(message,function(err, convo) {

		    convo.ask('Are you sure you want me to shutdown?',[
		        {
		            pattern: bot.utterances.yes,
		            callback: function(response, convo) {
		                convo.say('Bye!');
		                convo.next();
		                setTimeout(function() {
		                    process.exit();
		                },3000);
		            }
		        },
		    {
		        pattern: bot.utterances.no,
		        default: true,
		        callback: function(response, convo) {
		            convo.say('*Phew!*');
		            convo.next();
		        }
		    }
		    ]);
		});
	}else{
		bot.reply(message, 'Nah !! You cant do that. But I wont disturb you.');
	}
});


module.exports = testbot;