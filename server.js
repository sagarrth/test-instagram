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
        // Step Three: Request the access_token
        instaAPI.get_access_token(config.client_id, config.client_secret, config.redirect_uri, req.query.code, function (err, data) {
          if(err) {
            res.end('error accessing token');
          } else{
              res.end(data.access_token);
          }
        });
      } else{
        res.end('error receiving code parameter from instagram API');
      }
    });

    app.listen('4000', function () {
      console.log('server started and running');
    });
}

module.exports.start = start;
