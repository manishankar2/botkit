var request = require('request');
var config = require('./../config')

var baseurl = config.apiurl;


var getmenuitem = function(menuitem, callback){
	 var output;
	 request(baseurl + '/foodbot?item=' + menuitem, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var menu =JSON.parse(body);
	        output = menu.output;
	        callback(error, output);
	     }
	});
};

var getmenulist = function(callback){
	console.log('&&&&&&&');
	console.log(baseurl);
	request(baseurl + '/menus', function(error, response, body){
		if (!error && response.statusCode == 200){
			var menulist = JSON.parse(body);
			callback(error, menulist);
		}
	});
};

var postmenu = function(menu,items,callback){
	request.post(baseurl + '/foodbot', {json: {'menu' : menu , 'items' : items}}, function(error, response, body){
		if (!error && response.statusCode == 200){
			callback(error, body);
		}
	});
};

exports.getmenuitem = getmenuitem;
exports.getmenulist = getmenulist;
exports.postmenu = postmenu;