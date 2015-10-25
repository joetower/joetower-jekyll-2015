(function ($) {
  'use strict';
  $(document).ready(function () {

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
