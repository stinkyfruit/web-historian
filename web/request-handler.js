var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!



exports.handleRequest = function (req, res) {

  // console.log(req.url);
  // console.log(req.method);

  if(req.method === 'POST') {
    statusCode = 201;
    //parse through data coming in
    //push it to storage / results
    var str = "";
    req.on('data', function(chunk){
      //console.log(chunk);
      str += chunk;
    });
    req.on('end', function(){
      var site = str.substring(4);
      archive.isUrlInList(site, function(exists){
        if(exists) {
          console.log('it exists');
        } else {
          archive.addUrlToList(site);
        }
      })
    });
  }



  fs.readFile(archive.paths.siteAssets+'/index.html', 'utf8', function(error, data){
    if(error) { console.log(error);}

    archive.downloadUrls();
//    console.log(__dirname);
//    console.log(path);
    //console.log(data);
//    archive.readListOfUrls();
//    archive.isUrlInList('www.google.com');
//    archive.isUrlArchived('www.example.com', function(data){
//      console.log(data);
//    });
    res.writeHead(200);
    res.write(data);

    res.end();
  });

  //res.end(archive.paths.list);


};