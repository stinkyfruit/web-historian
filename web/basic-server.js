var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}


var job = new CronJob('*/2 * * * * *', function(){
    archive.downloadUrls();
  
}, null, true, 'America/Los_Angeles', null, true);