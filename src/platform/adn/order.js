import AbstractOrderProxy from '../abstract/order'
import { multiStoreConfig } from './util'
import { processSingleOrder } from './o2m'

class OrderProxy extends AbstractOrderProxy {
  constructor (config, req) {
    const AmpClient = require('./AmpClient/AmpClient.js').AmpClient;
    super(config, req)
    this.config = config
    this.api = AmpClient(multiStoreConfig(config.adn.api, req));
  }

  create (orderData) {
    const inst = this

    return new Promise((resolve, reject) => {
      try {
        inst.api.users.login({username: 'lau@lauundpartner.de', password: 'Front242!'}).then((authToken) => {
          console.log('autToken', authToken.token)
          processSingleOrder(authToken.token, orderData, inst.config, null, (error, result) => {
            console.log(error)
            if (error) reject(error)
            resolve(result)
          })
        }
        ).catch((e) => {
          reject(e)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = OrderProxy
