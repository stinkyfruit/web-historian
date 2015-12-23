var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
};

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
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(data){
    cb(_.contains(data, url));
  });


};

exports.addUrlToList = function(url, cb){
  fs.appendFile(exports.paths.list, url+"\n", function(err, file){
    if(err) throw err;
    cb();
    console.log("The data to append was appended to the file!");
  });
};


exports.isUrlArchived = function(url, cb){
  fs.readdir(exports.paths.archivedSites, function(err, data){
    if(err)throw err;
  
    cb(_.contains(data, url));
  });
};


exports.downloadUrls = function(cb){

exports.readListOfUrls(function(urls){
 _.each(urls, function(url){

   if(url.length > 3){
     request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
   }

 });
});
};
