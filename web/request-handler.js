var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!
var headers = {  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.handleRequest = function (req, res) {

  // console.log(req.url);
  // console.log(req.method);
  if(req.method === "GET") {
    if(req.url === '/'){
      fs.readFile(archive.paths.siteAssets+'/index.html', 'utf-8', function(error, data){
        if(error) { console.log(error);}
        res.writeHead(200, headers);
        res.end(data);
      });
    }
    //req.url === /www.google.com
    var url = req.url.slice(1);
    archive.isUrlArchived(url, function(data){
      //if url is in archive
      if(data) {
        fs.readFile(archive.paths.archivedSites+req.url, 'utf-8', function(error, data){

        if(error) throw error;
          res.writeHead(200, headers);
          res.end(data);
        });
        //if url is not in archive
      } else {
        fs.readFile(archive.paths.siteAssets+'/404.html', 'utf-8', function(error, data){
          if(error) { console.log(error);}
          res.writeHead(404, headers);
          res.end(data);
        });
      }
    });
  }
  
  if(req.method === 'POST') {
    statusCode = 201;
    console.log("POSTINGGGG");
    //parse through data coming in
    //push it to storage / results
    var str = "";
    req.on('data', function(chunk){
      //console.log(chunk);
      str += chunk;
    });
    req.on('end', function(){
      console.log(str);
      var site = str.substring(4);
      archive.isUrlArchived(site, function(data){
      //if url is in archive
        if(data) {
          fs.readFile(archive.paths.archivedSites+'/'+site, 'utf-8', function(error, data){

          if(error) throw error;
          res.writeHead(200, headers);
          res.end(data);
        });
        }
      });
        //if url is not in archive

      archive.isUrlInList(site, function(exists){
        if(exists) {
          console.log('it exists');
        } else {
          archive.addUrlToList(site);
        }
      });
    });

  }

//response - you always send back status code, header(most), and data(most of the time)
  
 



};