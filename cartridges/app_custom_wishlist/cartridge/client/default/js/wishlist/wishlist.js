'use strict';

module.exports = {
    toggleWishlistStatus: function () {
        $('.button-heart').on('click', function () {
            var $button = $(this);
            $button.spinner().start();
        });
    }
};
