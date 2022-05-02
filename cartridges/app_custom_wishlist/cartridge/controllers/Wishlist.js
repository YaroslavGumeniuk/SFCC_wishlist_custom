'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var Transaction = require('dw/system/Transaction');

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var ProductListMgr = require('dw/customer/ProductListMgr');
        var ProductList = require('dw/customer/ProductList');
        var customerWishProductList = ProductListMgr.getProductLists(customer, ProductList.TYPE_WISH_LIST);
        var customerWishProductListCurrent = customerWishProductList[0];
        res.render('wishlist', {
            customerWishProductList: customerWishProductListCurrent,
            listLength: customerWishProductList.length
        });
        next();
    }
);

server.post('AddProduct', function (req, res, next) {
    var pid = req.form.pid;
    var ProductListMgr = require('dw/customer/ProductListMgr');
    var ProductList = require('dw/customer/ProductList');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct(pid);
    var customerWishProductList = ProductListMgr.getProductLists(customer, ProductList.TYPE_WISH_LIST);

    Transaction.wrap(function () {
        if (!customerWishProductList.length) {
            customerWishProductList = ProductListMgr.createProductList(customer, 10);
            customerWishProductList.createProductItem(product);
        } else {
            customerWishProductList[0].createProductItem(product);
        }
    });

    var productsInList = customerWishProductList[0].getItems().toArray();
    var IDs = [];
    productsInList.forEach(el => {
        IDs.push(el.productID);
    });

    res.json({
        success: true,
        pid: pid,
        IDs: IDs
    });
    next();
});

server.post('RemoveProduct', function (req, res, next) {
    var pid = req.form.pid;
    var ProductListMgr = require('dw/customer/ProductListMgr');
    var ProductList = require('dw/customer/ProductList');
    var customerWishProductList = ProductListMgr.getProductLists(customer, ProductList.TYPE_WISH_LIST);
    var removedListItem;
    Transaction.wrap(function () {
        removedListItem = customerWishProductList[0].items.toArray().forEach(function (item) {
            if (item.productID === pid) {
                customerWishProductList[0].removeItem(item);
            }
        });
    });

    var productsInList = customerWishProductList[0].getItems().toArray();
    var IDs = [];
    productsInList.forEach(el => {
        IDs.push(el.productID);
    });

    res.json({
        success: true,
        IDs: IDs,
        removedListItem: removedListItem
    });
    next();
});

server.post('ClearWishlist', function (req, res, next) {
    var ProductListMgr = require('dw/customer/ProductListMgr');
    var ProductList = require('dw/customer/ProductList');
    var customerWishProductList = ProductListMgr.getProductLists(customer, ProductList.TYPE_WISH_LIST);
    Transaction.wrap(function () {
        customerWishProductList[0].items.toArray().forEach(function (item) {
            customerWishProductList[0].removeItem(item);
        });
    });

    res.json({
        success: true
    });
    next();
});

module.exports = server.exports();
