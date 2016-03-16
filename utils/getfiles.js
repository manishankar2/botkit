var filesystem = require("fs");

var getAllFilesFromFolder = function(dir) {
    
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        var full_path = dir+'/'+file;
        var stat = filesystem.statSync(full_path);
        is_js = (file.split('.').pop() == 'js')
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        } else {
        	if (is_js){
        		results.push(file);
        	}
        }
    });

    return results;
};

exports.getdirfiles = getAllFilesFromFolder ; 