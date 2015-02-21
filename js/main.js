(function ($) {
  'use strict';
  $(document).ready(function () {

    $('.navigation-toggle').on('click', function(event) {
      event.preventDefault();
      if ($('.site-nav').hasClass('menu-open')) {
        $('.site-nav').removeClass('menu-open').addClass('menu-closed');
        $('.navigation-toggle').removeClass('active').addClass('inactive');
        $('body').removeClass('overlay-active').addClass('overlay-inactive');
      } else {
        $('.site-nav').removeClass('menu-closed').addClass('menu-open');
        $('.navigation-toggle').removeClass('inactive').addClass('active');
        $('body').removeClass('overlay-inactive').addClass('overlay-active');
      }
    });

    $('.posts').children().hover(function() {
      $(this).siblings().stop().fadeTo(500,0.6);
    }, function() {
      $(this).siblings().stop().fadeTo(500,1);
    });
    $('.fade ul').children().hover(function() {
      $(this).siblings().stop().fadeTo(500,0.6);
    }, function() {
      $(this).siblings().stop().fadeTo(500,1);
    });

    $('.toggle').on('click', function(event) {
      event.preventDefault();
      if ($('.toggle-it').hasClass('active')) {
        $('.toggle-it').removeClass('active').addClass('inactive');
        $('.toggle').removeClass('active').addClass('inactive');
      } else {
        $('.toggle').removeClass('inactive').addClass('active');
        $('.toggle-it').removeClass('inactive').addClass('active');
      }
    });
  });

})(jQuery);
