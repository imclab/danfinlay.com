var fs = require('fs');
var http = require('http');
var url = require('url');
var ecstatic = require('ecstatic');
var _ = require('underscore');
var domain = require('domain');
var request = require('request');
var landingPageHandler = require('./landingPageHandler');
var lifeUpdateHandler = require('./lifeUpdateHandler');

var port = process.env.PORT || 8089;
console.log("Booting up server on port "+port);

http.createServer(function( req, res ){
  var d = domain.create();
  d.on('error', function(er){
    console.log("Response error: " + er);
  })
  d.run(function(){

    //Handling all sub-sections of site:
    if(req.url.match('^/doings*') || req.url.match('^/teachings*')){
      lifeUpdateHandler(req, res);

    //Handling home page:
    }else if(req.url === '' || req.url === '/' || req.url === '/home'){
      landingPageHandler(req, res);

    //Statically routing all other requests:
    }else{

      //To run the resources routed from my old site's server:
      // console.log("Requesting "+'http://danfinlay.com/'+req.url)
      request.get('http://danfinlay.com/'+req.url).pipe(res);

      //To run the site locally:
      // ecstatic({ root: __dirname + '/static' })(req, res);
    }
  })  
}).listen(port);