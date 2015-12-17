var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, 'utf-8', function(err, data){
    //currently returning last \n in sites.txt
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(url, cb){
  //console.log( archive.readListOfUrls() );
  exports.readListOfUrls(function(data){
    cb(_.contains(data, url));
  });

  //console.log( _.contains(list, url) );

};

exports.addUrlToList = function(url, cb){
  fs.appendFile(exports.paths.list, url+"\n", function(err){
    if(err) throw err;
    console.log("The data to append was appended to the file!");
    cb();
  });
};

exports.isUrlArchived = function(url, cb){
  fs.readFile(exports.paths.archivedSites+'/'+url, 'utf-8', function(err, data){
    if(err) {
      cb(false) ;
    } else {
      cb(true);
    }
  });
};


exports.downloadUrls = function(){
  exports.readListOfUrls( function(data) {
    _.each(data, function(item) {
      request(item, function (error, response, body) {
        console.log(response);
        // if (!error && response.statusCode == 200) {
        //   console.log("work");// Show the HTML for the Google homepage.
        // }
      });
    });
  });
};
