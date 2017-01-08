var express  = require('express');
var instaAPI = require('./instag').instagram();
var config   = require('./config');

function start(){
    var app = express();

    // Step One: Direct your user to our authorization URL
    app.get('/', function(req, res){
      res.redirect(instaAPI.get_auth_url(config.client_id, config.redirect_uri));
    });

    // Step Two: Receive the redirect from Instagram
    app.get('/handleauth', function (req, res) {
      if(req.query.error!==undefined){
        res.end(req.query.code);
      } else{
        res.end('error occured');
      }
    });

    app.listen('4000', function () {
      console.log('server started and running');
    });
}

module.exports.start = start;
