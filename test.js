var foodapi = require('./apis/foodbotapi2.js');
var api = foodapi();


api.foodbot.getmenuitem('breakfast',function(err, response){
	if (err){
		console.log(err);
	}else{
		console.log(response);
	}
});