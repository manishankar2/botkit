var request = require('request');
var config = require('./../config')

var baseurl = config.apiurl;
var util = require('util');

module.exports = function(){
	var api = {
		menu: {
			getmenuitem : function(menuitem, callback){
				 var output;
				 request(baseurl + '/foodbot?item=' + menuitem, function (error, response, body) {
				    if (!error && response.statusCode == 200) {
				    	var menu =JSON.parse(body);
				        output = menu.output;
				        callback(error, output);
				     }else{
				     	util.log(error);
				     }
				});
			} , 
			getmenulist : function(callback){
				request(baseurl + '/menus', function(error, response, body){
					if (!error && response.statusCode == 200){
						var menulist = JSON.parse(body);
						callback(error, menulist);
					}else{
						util.log(error);
					}
				});
			} , 
			postmenu :function(menu,items,callback){
				request.post(baseurl + '/foodbot', {json: {'menu' : menu , 'items' : items}}, function(error, response, body){
					if (!error && response.statusCode == 200){
						callback(error, body);
					}else{
						util.log(error);
					}
				});
			} ,
		}, 
	};
	return api;
};