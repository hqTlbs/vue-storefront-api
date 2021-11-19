import AbstractUserProxy from '../abstract/user'
import { multiStoreConfig } from './util'

class StockProxy extends AbstractUserProxy {
  constructor (config, req) {
    const Magento2Client = require('magento2-rest-client').Magento2Client;
    super(config, req)
    this.api = Magento2Client(multiStoreConfig(config.adn.api, req));
  }

  check ({sku, stockId = 0}) {
    const resultTlbs = {
      item_id: 99,
      product_id: 116,
      stock_id: 1,
      qty: 100,
      is_in_stock: true,
      is_qty_decimal: false,
      show_default_notification_message: false,
      use_config_min_qty: true,
      min_qty: 0,
      use_config_min_sale_qty: 1,
      min_sale_qty: 1,
      use_config_max_sale_qty: true,
      max_sale_qty: 10000,
      use_config_backorders: true,
      backorders: 0,
      use_config_notify_stock_qty: true,
      notify_stock_qty: 1,
      use_config_qty_increments: true,
      qty_increments: 0,
      use_config_enable_qty_inc: true,
      enable_qty_increments: false,
      use_config_manage_stock: true,
      manage_stock: true,
      low_stock_date: null,
      is_decimal_divided: false,
      stock_status_changed_auto: 0
    }
    sku = 'MH05-XS-Green'
    return this.api.stockItems.list(sku).then((result) => {
      if (this._config.msi.enabled) {
        return this.api.stockItems.getSalableQty(sku, stockId).then((salableQty) => {
          result.qty = salableQty;
          return resultTlbs;
        }).then((result) => {
          return this.api.stockItems.isSalable(sku, stockId).then((isSalable) => {
            result.is_in_stock = isSalable;
            return resultTlbs
          })
        })
      } else {
        return resultTlbs;
      }
    })
  }
}

module.exports = StockProxy
