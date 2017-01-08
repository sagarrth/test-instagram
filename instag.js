var url = require('url');

function instagram(){
  var host = 'https://api.instagram.com';
  return {
    get_auth_url : get_auth_url
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
}

module.exports.instagram = instagram;
