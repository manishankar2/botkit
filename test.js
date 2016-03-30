var testbot =  require('./test/testbot');

testbot.bot.startRTM(function(err,bot,payload){
	if (err){
		console.log(err);
	}else{
		bot.identifyBot(function(err,identity){
			if(err)
				console.log(err);
			else
				console.log(identity);
		});
	}
});
