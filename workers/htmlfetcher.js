

var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;


exports.module = new CronJob('*/2 * * * * *', function(){
    archive.downloadUrls();
    console.log('cron is working');
  
}, null, true, 'America/Los_Angeles', null, true);



// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//use cron in here and run the download Url functions
