var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!



exports.handleRequest = function (req, res) {

  console.log(req.url);
  console.log(req.method);
  //console.log(req.headers);

  fs.readFile(archive.paths.siteAssets+'/index.html', 'utf8', function(error, data){
    if(error) { console.log(error);}
//    console.log(__dirname);
//    console.log(path);
    //console.log(data);
//    archive.readListOfUrls();
//    archive.isUrlInList('www.google.com');
    res.writeHead(200);
    res.write(data);

    res.end();
  });

  //res.end(archive.paths.list);


};
