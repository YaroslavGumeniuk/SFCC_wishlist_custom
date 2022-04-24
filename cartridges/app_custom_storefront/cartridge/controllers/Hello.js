'use strict';
const server = require('server');
server.get('Show', function (req, res, next) {
    var Site = require('dw/system/Site');
    var template = 'hello';
    res.render(template, {
        message: Site.current.name
    });
    next();
});
module.exports = server.exports();
