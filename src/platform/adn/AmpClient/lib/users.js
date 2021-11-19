import request from '../../request';

module.exports = function (restClient) {
  var module = {};

  module.login = function (data) {
    return request({
      url: '/authentication_token',
      method: 'post',
      data
    })
  }
  module.me = function (requestToken) {
    return request({
      url: '/authenticated-user',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + requestToken
      }
    })
  }

  return module;
}
