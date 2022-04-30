'use strict';

const server = require('server');
server.extend(module.superModule);
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.append('Show', cache.applyPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var ProductListMgr = require('dw/customer/ProductListMgr');
    var ProductList = require('dw/customer/ProductList');
    var customerWishProductList = ProductListMgr.getProductLists(customer, ProductList.TYPE_WISH_LIST);
    var isWishlistActive = false;
    var pid = req.querystring.pid;
    var productsInList = customerWishProductList[0].getItems().toArray();
    productsInList.forEach(item => {
        if (item.productID === pid) {
            isWishlistActive = true;
        }
    });

    res.setViewData({
        isWishlistActive: isWishlistActive
    });
    next();
});

module.exports = server.exports();
