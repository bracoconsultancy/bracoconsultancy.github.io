$(function() {
  $('.collapse').collapse({
    toggle: false
  });
  $('nav a').on('click', function(e) {
    var target = $($(this).attr('href'));
    var active = $(this).closest('nav').find('[aria-expanded="true"]');
    var activeTarget = $(active.attr('href'));
    if (target.parent().find('.collapsing').length) {
      console.log('returning');
      return;
    }
    if ($(this).attr('aria-expanded') === 'true') {
      $('body').toggleClass('nav-is-collapsed');
      active.attr('aria-expanded', 'false');
      target.collapse('toggle');
      return;
    }
    console.log(active);
    if (active.length) {
      console.log('active found');
      active.attr('aria-expanded', 'false');
      activeTarget.collapse('toggle');
      activeTarget.one('hidden.bs.collapse', function(){
        console.log('collapsed');
        target.collapse('toggle');
      })
    } else {
      console.log('no active found');
      target.addClass('opacity-0');
      $('body').toggleClass('nav-is-collapsed');
      target.collapse('toggle');
      target.one('shown.bs.collapse', function() {
        target.removeClass('opacity-0');
      })
    }
    $(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'false' ? 'true' : 'false');
    $('main .content').scrollTop(0);
    $('html, body').animate({scrollTop:$(document).height()}, 'normal');
  });
  $('main .close').on('click', function() {
    $('html, body').animate({scrollTop:0}, 'normal');
    $('.collapse').collapse('hide');
    $('nav a').attr('aria-expanded', 'false');
    $('body').toggleClass('nav-is-collapsed');
    setTimeout(function() {
      $('nav [data-toggle="collapse"][href="#'+$('main').find('.collapse.show').attr('id')+'"]').trigger('click', [true]);
    }, 500)
  });
});
