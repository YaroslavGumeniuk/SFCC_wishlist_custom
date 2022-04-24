'use strict';
const server = require('server');
server.get('Show', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var CartModel = require('*/cartridge/models/cart');
    var currentBasket = BasketMgr.getCurrentBasket();
    var basketModel = new CartModel(currentBasket);
    var template = 'basket';
    res.setViewData({
        // basket: currentBasket
        basket: basketModel
    });
    res.render(template);
    next();
});
module.exports = server.exports();
