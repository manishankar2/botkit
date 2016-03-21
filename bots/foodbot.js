var botproto = require('./../bot_class.js')

var foodapi = require('./../apis/foodbot_api')

var name = 'foodpanda';

var token = "xoxb-23902359414-3MMsm1YoozWVge37pRudF1fY"

var foodbot = new botproto(name, token);

var api = foodapi();

var config = require('./../config.js');

var foodbot_config = config.bots.foodbot

foodbot.controller.hears(['hi','hello', 'hey','help'],'direct_message,direct_mention,mention',function(bot, message){
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
			convo.say('lets get started. type *menu list* to know the list of menus I can offer');
		});
	});
});

foodbot.controller.hears('menu list','direct_message,direct_mention',function(bot,message){
	bot.startConversation(message,menu)
});

foodbot.controller.hears(['post menu'], 'direct_message,direct_mention', function(bot, message){
	//Validations based on user id
	is_admin = allow_post(message.user)
	if (is_admin){
		bot.startConversation(message,postMenu);
	}else{
		bot.startConversation(message,magicWord);
	}
});

foodbot.controller.hears(['breakfast','lunch', 'snacks', 'dinner', 'break fast'], 'direct_message,direct_mention',function(bot, message){
	keyword = message.text.toLowerCase();
	if (keyword == 'break fast'){
		keyword = 'breakfast'
	}
	api.menu.getmenuitem(keyword, function(err, resp){
		if (err){
			console.log(err);
			bot.reply(' I dont have the menu now !! please check after sometime');
		}else{
			resp = resp + ' :yum:'
			if (resp){
				bot.reply(message,resp)
			}else{
				bot.reply(message, 'I dont have the menu now !! please check after sometime');
			}
		}
	});
});

foodbot.controller.hears(['shutdown'],'direct_message,direct_mention',function(bot, message) {

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

allow_post = function(user_id){
	console.log('is_admin ' + user_id);
	if (foodbot_config.admin_users.indexOf(user_id) > -1)
		return true;
	else
		return false;
};

magicWord = function(response,convo){
	convo.ask('please enter the magic word', function(resp,convo){
		if (resp.text == 'abracadabra'){
			postMenu(response,convo);
		}else{
			convo.say('Nah !! you are not allowed to do that!!!');
		}
	});
	convo.next();
}

postMenu = function(response, convo){
	convo.say('Hi !!');
	convo.ask('What Menu do you want me to post ?',checkMenu);
	convo.next();
};


checkMenu = function(response, convo){
	var menu;
	api.menu.getmenulist(function(err, res){
		if (err){
			console.log(err);
		}else{
			ip_menu = response.text.toLowerCase()
			menu = res.menu
			pending_menu = res.pending_menu;
			if (pending_menu.indexOf(ip_menu) > -1){
				convo.say('okay Awesome!!');
				publishMenu(response.text, response, convo);
			}else{
				if (menu && menu.indexOf(ip_menu) > -1){
					convo.say('Looks like you have already submitted that menu.')
					convo.ask('Do you want to post the menu again?', [
			      	{
			        	pattern: new RegExp(/^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah)/i),
			        	callback: function(response,convo) {
			          		convo.say('okay!');
			          		publishMenu(ip_menu, response, convo);
			          		convo.next();
			        	}
			      	},
			      	{
			        	pattern: new RegExp(/^(no|nah|nope|n)/i),
			        	callback: function(response,convo) {
			          		convo.say('Perhaps later.');
			          		convo.next();
			        	}
			      	}]);
				}else{
					convo.say('Can you please check the menu name & try again ?!');
					convo.repeat();
				}
			}
		}
	});
	convo.next();
};

publishMenu = function(menu ,response, convo){
	convo.say('please post the menu for ' + menu);
	convo.say('say done after posting the menu');
	menu_items = []
	convo.ask('', function(response, convo){
		if (response.text.toLowerCase() == 'done'){
			menu_items = menu_items.join('\n');
			api.menu.postmenu(menu, menu_items, function(err, response){
				if (err){
					console.log(err);
				}
			});
			convo.say('okay got it !!');
			convo.next();
		}else{
			menu_items.push(response.text);
		}
	}, {multiple : true});
};

menu = function(response,convo){
	api.menu.getmenulist(function(err, res){
		if (err){
			console.log(err);
		}else{
			menulist = res.menu;
			convo.say('Type the Following command to get the items for each menu');
			convo.say('*' + menulist.join('*\n*') + '*');
			convo.next();
		}
	});
};

module.exports = foodbot;
 