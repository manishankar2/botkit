var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller1 = Botkit.slackbot({
    debug: true,
});

var controller2 = Botkit.slackbot({
    debug: true,
});


//test bot
var bot1 = controller1.spawn({
    token: "xoxb-24392860727-AdkkueajeBp8m4SNXugGIn9w"
}).startRTM();

//food panda
var bot2 = controller2.spawn({
    token: "xoxb-23902359414-3MMsm1YoozWVge37pRudF1fY"
}).startRTM();

controller1.hears(['hello','hi'],'direct_message,direct_mention,mention',function(bot1, message) {
	bot1.reply(message,"hello");
	
});

controller2.hears(['yes','no'],'direct_message,direct_mention,mention',function(bot2, message) {
	bot2.reply(message,"hello yes");
});


