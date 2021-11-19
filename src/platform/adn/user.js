import AbstractUserProxy from '../abstract/user'
import { multiStoreConfig } from './util'
import request from './request'

class UserProxy extends AbstractUserProxy {
  constructor (config, req) {
    const AmpClient = require('./AmpClient/AmpClient.js').AmpClient;
    super(config, req)
    this.api = AmpClient(multiStoreConfig(config.adn.api, req));
  }

  register (userData) {
    return this.api.users.create(userData)
  }

  login (userData) {
    return this.api.users.login(userData)
  }

  me (requestToken) {
    return this.api.users.me(requestToken)
  }
  orderHistory (requestToken, pageSize = 20, currentPage = 1) {
    // return this.api.customers.orderHistory(requestToken, pageSize, currentPage)
    return request({
      url: '/authenticated-user',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + requestToken
      }
    })
  }
  resetPassword (emailData) {
    return this.api.customers.resetPassword(emailData)
  }

  update (userData) {
    return this.api.customers.update(userData)
  }

  changePassword (passwordData) {
    return this.api.customers.changePassword(passwordData)
  }

  resetPasswordUsingResetToken (resetData) {
    return this.api.customers.resetPasswordUsingResetToken(resetData)
  }
}

module.exports = UserProxy
