'use strict';

const server = require('server');
server.extend(module.superModule);

var cache = require('*/cartridge/scripts/middleware/cache');

server.prepend('Show', cache.applyDefaultCache, function (req, res, next) {
    // res.render('homePage', {
    //     param1: 'Site.current.name'
    // });
    // next();
    var viewData = res.getViewData();
    viewData.param1 = 'This is from prepend';
    res.setViewData(viewData);
    next();
});

server.append('Show', cache.applyCustomCache, function (req, res, next) {
    var viewData = res.getViewData();
    // declare param1 as a variable that equals 'General company details.'
    var appendParam = 'This is from append';
    var queryParam = req.querystring.param ? req.querystring.param : 'no parameter was passed';
    // Here grab whatever prepend added to viewData + the message here + the optional query string param
    res.setViewData({
        param1: viewData.param1 + ' AND ' + appendParam + ' AND querystring param = ' + queryParam,
        param2: res.cachePeriod + ' ' + res.cachePeriodUnit
    });
    next();
});

// server.replace('Show', cache.applyDefaultCache, function (req, res, next) {
//     var viewData = res.getViewData();
//     // declare param1 as a variable that equals 'General company details.'
//     var appendParam = 'This is from append';
//     var replaceParam = req.querystring.param ? req.querystring.param : 'no parameter was passed';
//     // Here grab whatever prepend added to viewData + the message here + the optional query string param
//     res.setViewData({
//         param1: viewData.param1 + ' AND ' + appendParam + ' AND ' + replaceParam
//     });
//     next();
// });

module.exports = server.exports();

