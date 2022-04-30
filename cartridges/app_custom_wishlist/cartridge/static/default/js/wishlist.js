'use strict';

function addToWishlist() {
    $('.button-heart').on('click', function (e) {
        e.preventDefault();
        var url = null;
        var pid = $('.product-detail').data('pid');
        if ($(this).children('.inline').hasClass('display-none')) {
            url = $(this).data('urlremove');
        } else {
            url = $(this).data('urladd');
        }
        $('.add-to-wishlist').spinner().start();

        console.log(url);

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                pid: pid
            },
            success: function () {
                $('.add-to-wishlist').spinner().stop();
                $('.button-heart').children('.inline').toggleClass('display-none');
                $('.button-heart').children('.red').toggleClass('display-none');
            },
            error: function (err) {
                $('.add-to-wishlist').spinner().stop();
                alert('Something wrong...', err)
            }
        });
    });
}
addToWishlist();

function goToWishlist() {
    $('.go-to-wishlist').on('click', function () {
        window.location.href = 'Wishlist-Show';
    });
}
goToWishlist();
