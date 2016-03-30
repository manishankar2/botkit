var botproto = require('./../bot_class.js')

var name = 'testbot';

var token = "xoxb-24392860727-AdkkueajeBp8m4SNXugGIn9w"

var testbot = new botproto(name, token);

var config = require('./../config.js');

var foodbot_config = config.bots.foodbot


testbot.controller.on('channel_rename', function(bot,message){
	console.log(bot);
	console.log(message);
});

testbot.controller.on('channel_created', function(bot,message){
	console.log(bot);
	console.log(message);
});

testbot.controller.on('channel_deleted', function(bot,message){
	console.log(bot);
	console.log(message);
});

testbot.controller.on('channel_archive', function(bot,message){
	console.log(bot);
	console.log(message);
});

testbot.controller.on('channel_unarchive', function(bot,message){
	console.log(bot);
	console.log(message);
});

allow_post = function(user_id){
	console.log('is_admin ' + user_id);
	console.log(foodbot_config.admin_users);
	if (foodbot_config.admin_users.indexOf(user_id) > -1)
		return true;
	else
		return false;
}

magicWord = function(response,convo){
	convo.ask('please enter the magic word', function(resp,convo){
		console.log(resp);
		if (resp.text == 'abracadabra'){
			postMenu(resp,convo);
		}else{
			convo.say('Nah !! you are not allowed to do that!!!');
		}
	});
	convo.next();
}

testbot.controller.hears(['hi','hello', 'hey'],'direct_message,direct_mention,mention',function(bot, message){

	bot.api.chat.postMessage({as_user: true, text: 'hi', channel: '@everyone'},function(err,resp){
		if(err)
			console.log(err);
		else
			console.log(resp);
	});
	/*

	bot.identifyBot(function(err,identity){
		if (err){
			console.log(err);
		}else{
			console.log(identity);
		}
	});
	is_admin = allow_post(message.user);

	if (is_admin){
		console.log(is_admin);
	}else{
		bot.startConversation(message,magicWord);
	}
	console.log(is_admin);
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
*/
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