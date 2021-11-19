import API from '../../request.js';

function isNumeric (val) {
  return Number(parseFloat(val)).toString() == val;
}

module.exports = function (restClient) {
  var module = {};

  module.create = function (customerToken, customerId = null) {
    return API.post(`/jwt_carts`,
      {
        user: customerId,
        company: 'api/companies/21067',
        delId: '19087-001',
        mandantId: '1',
        status: 1
      }, {
        headers: {
          'Authorization': 'Bearer ' + customerToken
        }
      })
  }
  module.update = function (customerToken, cartId, cartItem, adminRequest = false) {
    if (adminRequest) {
      return restClient.post('/carts/' + cartId + '/items/', { cartItem: cartItem });
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.post('/carts/mine/items', { cartItem: cartItem }, customerToken);
      } else {
        return restClient.post('/guest-carts/' + cartId + '/items', { cartItem: cartItem });
      }
    }
  }

  module.applyCoupon = function (customerToken, cartId, coupon, adminRequest = false) {
    if (adminRequest) {
      return restClient.put('/carts/' + cartId + '/coupons/' + coupon);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.put('/carts/mine/coupons/' + coupon, null, customerToken);
      } else {
        return restClient.put('/guest-carts/' + cartId + '/coupons/' + coupon);
      }
    }
  }
  module.deleteCoupon = function (customerToken, cartId, adminRequest = false) {
    if (adminRequest) {
      return restClient.delete('/carts/' + cartId + '/coupons');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.delete('/carts/mine/coupons', customerToken);
      } else {
        return restClient.delete('/guest-carts/' + cartId + '/coupons');
      }
    }
  }
  module.getCoupon = function (customerToken, cartId, adminRequest = false) {
    if (adminRequest) {
      return restClient.get('/carts/' + cartId + '/coupons');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.get('/carts/mine/coupons', customerToken);
      } else {
        return restClient.get('/guest-carts/' + cartId + '/coupons');
      }
    }
  }
  module.delete = function (customerToken, cartId, cartItem, adminRequest = false) {
    if (adminRequest) {
      return restClient.delete('/carts/' + cartId + '/items/' + cartItem.item_id);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.delete('/carts/mine/items/' + cartItem.item_id, customerToken);
      } else {
        return restClient.delete('/guest-carts/' + cartId + '/items/' + cartItem.item_id);
      }
    }
  }
  module.pull = function (customerToken, cartId, params, adminRequest = false) {
    if (adminRequest) {
      return restClient.get('/carts/' + cartId + '/items/');
    } else {
      if (customerToken) {
        return API.get('/jwt_carts/' + cartId, {
          headers: {
            'Authorization': 'Bearer ' + customerToken
          }
        })
      }
    }
  }
  module.totals = function (customerToken, cartId, params, adminRequest = false) {
    if (adminRequest) {
      return restClient.get('/carts/' + cartId + '/totals/');
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.get('/carts/mine/totals', customerToken);
      } else {
        return restClient.get('/guest-carts/' + cartId + '/totals/');
      }
    }
  }

  module.billingAddress = function (customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return restClient.post('/carts/' + cartId + '/billing-address', body);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.post('/carts/mine/billing-address', body, customerToken);
      } else {
        return restClient.post('/guest-carts/' + cartId + '/billing-address', body);
      }
    }
  }

  module.shippingInformation = function (customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return restClient.post('/carts/' + cartId + '/shipping-information', body);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.post('/carts/mine/shipping-information', body, customerToken);
      } else {
        return restClient.post('/guest-carts/' + cartId + '/shipping-information', body);
      }
    }
  }

  module.order = function (customerToken, cartId, body, adminRequest = false) {
    if (adminRequest) {
      return restClient.put('/carts/' + cartId + '/order', body);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.put('/carts/mine/order', body, customerToken);
      } else {
        return restClient.put('/guest-carts/' + cartId + '/order', body);
      }
    }
  }

  module.paymentInformationAndOrder = function (customerToken, cartId, body, adminRequest = false, headers = {}) {
    if (adminRequest) {
      return restClient.post('/carts/' + cartId + '/payment-information', body, '', headers);
    } else {
      if (customerToken && isNumeric(cartId)) {
        return restClient.post('/carts/mine/payment-information', body, customerToken, headers);
      } else {
        return restClient.post('/guest-carts/' + cartId + '/payment-information', body, '', headers);
      }
    }
  }

  module.assign = function (cartId, userId, storeId = 0) {
    return restClient.put('/guest-carts/' + cartId,
      {
        customerId: userId,
        storeId: storeId
      }
    )
  }

  module.shippingMethods = function (customerToken, cartId, address) {
    if (customerToken && isNumeric(cartId)) {
      return restClient.post('/carts/mine/estimate-shipping-methods', { address: address }, customerToken)
    } else {
      return restClient.post('/guest-carts/' + cartId + '/estimate-shipping-methods', { address: address })
    }
  }

  module.paymentMethods = function (customerToken, cartId) {
    if (customerToken && isNumeric(cartId)) {
      return restClient.get('/carts/mine/payment-methods', customerToken)
    } else {
      return restClient.get('/guest-carts/' + cartId + '/payment-methods')
    }
  }

  module.collectTotals = function (customerToken, cartId, shippingMethod) {
    if (customerToken && isNumeric(cartId)) {
      return restClient.put('/carts/mine/collect-totals', shippingMethod, customerToken)
    } else {
      return restClient.put('/guest-carts/' + cartId + '/collect-totals', shippingMethod)
    }
  }

  return module;
}
