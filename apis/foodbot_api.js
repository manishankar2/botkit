var request = require('request');

var getmenuitem = function(menuitem, callback){
	 var output;
	 request('http://127.0.0.1:3002/foodbot?item=' + menuitem, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var menu =JSON.parse(body);
	        output = menu.output;
	        callback(error, output);
	     }
	});
};

var getmenulist = function(callback){
	request('http://127.0.0.1:3002/menus', function(error, response, body){
		if (!error && response.statusCode == 200){
			var menulist = JSON.parse(body);
			callback(error, menulist);
		}
	});
};

var postmenu = function(menu,items,callback){
	request.post('http://127.0.0.1:3002/foodbot', {json: {'menu' : menu , 'items' : items}}, function(error, response, body){
		if (!error && response.statusCode == 200){
			callback(error, body);
		}
	});
};

exports.getmenuitem = getmenuitem;
exports.getmenulist = getmenulist;
exports.postmenu = postmenu;