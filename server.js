var config = require('./config')

var botdir = config.bots.botdir;

initBots();

function initBots(){
	bots = config.bots.botfiles;
	console.log(bots); 
	for(var i in bots){
		botObject = global[bots[i]] = require(botdir + bots[i]);
		botObject.bot.startRTM();
	}
};

