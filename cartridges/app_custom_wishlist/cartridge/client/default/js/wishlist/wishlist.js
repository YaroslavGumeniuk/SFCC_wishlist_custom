'use strict';

module.exports = {
    addToWishlist: function () {
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
    },

    removeProductFromWishlist: function () {
        $('.product-remove').on('click', function (e) {
            e.preventDefault();
            var url = $('.product-remove').data('urlremove');
            var pid = $(this).closest('.image-container').data('pid');
            var $button = this;

            $(this).spinner().start();

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: {
                    pid: pid
                },
                success: function () {
                    $(this).spinner().stop();
                    $($button).closest('.product-tile').css('display', 'none');
                },
                error: function (err) {
                    $(this).spinner().stop();
                    alert('Something wrong...', err);
                }
            });
        });
    },

    clearWishlist: function () {
        $('.clear-wishlist').on('click', function (e) {
            e.preventDefault();
            var button = this;
            var url = $(button).data('urlclearwishlist');
            var pid = [];
            $('.image-container').each(
                function () {
                    pid.push($(this).data('pid'));
                }
            );
            $(this).spinner().start();

            console.log(url);
            console.log(pid);

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: {
                    pid: pid
                },
                success: function () {
                    $(this).spinner().stop();
                    $('.product-tile').css('display', 'none');
                    $(button).css('display', 'none');
                    $('.wishlist-empty').css('display', 'block');
                },
                error: function (err) {
                    $(this).spinner().stop();
                    alert('Something wrong...', err);
                }
            });
        });
    },

    goToWishlist: function () {
        $('.go-to-wishlist').on('click', function () {
            window.location.href = 'Wishlist-Show';
        });
    }
};

// function clearWishlist() {
//     $('.clear-wishlist').on('click', function (e) {
//         e.preventDefault();
//         var button = this;
//         var url = $(button).data('urlclearwishlist');
//         var pid = [];
//         $('.image-container').each(
//             function () {
//                 pid.push($(this).data('pid'));
//             }
//         );
//         $(this).spinner().start();

//         console.log(url);
//         console.log(pid);

//         $.ajax({
//             url: url,
//             type: 'post',
//             dataType: 'json',
//             data: {
//                 pid: pid
//             },
//             success: function () {
//                 $(this).spinner().stop();
//                 $('.product-tile').css('display', 'none');
//                 $(button).css('display', 'none');
//                 $('.wishlist-empty').css('display', 'block');
//             },
//             error: function (err) {
//                 $(this).spinner().stop();
//                 alert('Something wrong...', err);
//             }
//         });
//     });
// }
// clearWishlist();

// function removeProductFromWishlist() {
//     $('.product-remove').on('click', function (e) {
//         e.preventDefault();
//         var url = $('.product-remove').data('urlremove');
//         var pid = $(this).closest('.image-container').data('pid');
//         var $button = this;

//         $(this).spinner().start();

//         $.ajax({
//             url: url,
//             type: 'post',
//             dataType: 'json',
//             data: {
//                 pid: pid
//             },
//             success: function () {
//                 $(this).spinner().stop();
//                 $($button).closest('.product-tile').css('display', 'none');
//             },
//             error: function (err) {
//                 $(this).spinner().stop();
//                 alert('Something wrong...', err);
//             }
//         });
//     });
// }
// removeProductFromWishlist();

// function addToWishlist() {
//     $('.button-heart').on('click', function (e) {
//         e.preventDefault();
//         var url = null;
//         var pid = $('.product-detail').data('pid');
//         if ($(this).children('.inline').hasClass('display-none')) {
//             url = $(this).data('urlremove');
//         } else {
//             url = $(this).data('urladd');
//         }
//         $('.add-to-wishlist').spinner().start();

//         console.log(url);
//         console.log(pid);

//         $.ajax({
//             url: url,
//             type: 'post',
//             dataType: 'json',
//             data: {
//                 pid: pid
//             },
//             success: function () {
//                 $('.add-to-wishlist').spinner().stop();
//                 $('.button-heart').children('.inline').toggleClass('display-none');
//                 $('.button-heart').children('.red').toggleClass('display-none');
//             },
//             error: function (err) {
//                 $('.add-to-wishlist').spinner().stop();
//                 alert('Something wrong...', err)
//             }
//         });
//     });
// }
// addToWishlist();

// function goToWishlist() {
//     $('.go-to-wishlist').on('click', function () {
//         window.location.href = 'Wishlist-Show';
//     });
// }
// goToWishlist();
