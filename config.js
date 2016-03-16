var fs = require('./utils/getfiles')

var config = {};

config.bots = {};

config.bots.botdir = './bots/'

config.bots.botfullpath = __dirname + '/bots/' ;

console.log(config.bots.botfullpath);

botfiles = fs.getdirfiles(config.bots.botfullpath)

config.bots.botfiles = botfiles ;

module.exports = config