'use strict';

const accountHelpers = module.superModule;

/**
 * @description Gets random string
 * @param {string} str - custom string
 * @returns {string} - random string
 */
accountHelpers.getRandomString = function (str) {
    return str + ' CustomHelperDone';
};

module.exports = accountHelpers;
