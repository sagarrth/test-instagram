var url = require('url');
var https = require('https');
var queryString = require('queryString');

function instagram(){
  var host = 'https://api.instagram.com';
  return {
    get_auth_url     : get_auth_url,
    get_access_token : get_access_token
  };

  function get_auth_url(client_id, redirect_uri){
    var url_obj = url.parse(host);
    url_obj.pathname = '/oauth/authorize';
    url_obj.query = {
      client_id : client_id,
      redirect_uri : redirect_uri,
      response_type : 'code'
    };
    return url.format(url_obj);
  }

  function get_access_token(client_id, client_secret, redirect_uri, code, cb){
    var hostname = url.parse(host).hostname;
    var postData = {
      client_id     : client_id,
      client_secret : client_secret,
      grant_type    : 'authorization_code',
      redirect_uri  : redirect_uri,
      code          : code
    };
    postData = queryString.stringify(postData);

    var options = {
      hostname : hostname,
      method   : 'POST',
      port     : 443,
      path     : '/oauth/access_token'
    };

    var req = https.request(options, function (res) {
      res.setEncoding = 'utf-8';
      var body = '';
      res.on('data', function(chunk){
        body+=chunk;
      });
      res.on('end', function(){
        var oauthTokenObject = JSON.parse(body);
        cb(null, oauthTokenObject); 
      });
    });
    req.on('error', function (err) {
      cb(err);
    });
    req.write(postData);
    req.end();
  }
}

module.exports.instagram = instagram;
