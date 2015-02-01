(function ($) {
  'use strict';
  $(document).ready(function () {

    $('.navigation-toggle').on('click', function(event) {
      event.preventDefault();
      if ($('.site-nav').hasClass('menu-open')) {
        $('.site-nav').removeClass('menu-open').addClass('menu-closed');
        $('.navigation-toggle').removeClass('active').addClass('inactive');
      } else {
        $('.site-nav').removeClass('menu-closed').addClass('menu-open');
        $('.navigation-toggle').removeClass('inactive').addClass('active');
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
    var trigger             = $('.toggle'),
      toggleItem            = $('.toggle-it'),
      toggler               = function(a){
        $(this).toggleClass('active');
        a.data.toggled.slideToggle(200);
      };
      trigger.click({toggled : toggleItem}, toggler);
  });

})(jQuery);

