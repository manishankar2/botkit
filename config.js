var fs = require('./utils/getfiles')

var config = {};

config.bots = {};

config.bots.botdir = './bots/'

config.bots.botfullpath = __dirname + '/bots/' ;

console.log(config.bots.botfullpath);

botfiles = fs.getdirfiles(config.bots.botfullpath)

config.bots.botfiles = botfiles ;

config.apiurl = process.env.url;

config.bots.foodbot = {}

config.bots.foodbot.admin_users = ['U0K4NQDPV', 'U0KKGF9GB', 'U0KFXPJKB', 'U0KGCNRPC']

module.exports = config;