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

  if(req.method === "GET") {
    //if url is /, return the homepage
    if(req.url === '/'){
      fs.readFile(archive.paths.siteAssets+'/index.html', 'utf-8', function(error, data){
        if(error) { console.log(error);}
        res.writeHead(200, headers);
        res.end(data);
      });
    }
    var url = req.url.slice(1);
    //check to see if site is archived
    archive.isUrlArchived(url, function(data){
      //if url is in archive
      if(data) {
        //load the page
        fs.readFile(archive.paths.archivedSites+req.url, 'utf-8', function(error, data){

        if(error) throw error;
          res.writeHead(200, headers);
          res.end(data);
        });
        //if url is not in archive
      } else {
        fs.readFile(archive.paths.siteAssets+'/404.html', 'utf-8', function(error, data){
          if(error) { console.log(error);}
          //send a 404
          res.writeHead(404, headers);
          res.end(data);
        });
      }
    });
  }
  //if method is post
  if(req.method === 'POST') {
    var str = "";
    req.on('data', function(chunk){
      str += chunk;
    });
    //perform action when the request is over
    req.on('end', function(){
      var site = str.substring(4);
      archive.isUrlArchived(site, function(data){
        if(data) {
          fs.readFile(archive.paths.archivedSites+'/'+site, 'utf-8', function(error, data){

          if(error) throw error;
          res.writeHead(302, headers);
          res.end(data);
        });
        } else {
          archive.isUrlInList(site, function(data){
            fs.readFile(archive.paths.siteAssets+'/loading.html', 'utf-8', function(error, data){
              if(error) { console.log(error);}
              res.writeHead(302, headers);
              res.end(data);
            
            });
            if(!data) {
              archive.addUrlToList(site, function(){
                console.log('hELOO');
                archive.sendRedirect(res, '/loading.html');
                res.end(data);
              });
            }
          });
        }
      });
    });

  }

  
 



};