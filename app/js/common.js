$(document).ready(function() {
  
  $('[title = "Hosted on free web hosting 000webhost.com. Host your own website for FREE."]').css('display', 'none');
  
});

/*-----------------TYPED.JS-----------------*/

$(".typed").typed({
  strings: ["My Name is M.Reza", "I'm a Web Designer", "Love Simplicity"],
  typeSpeed: 100,
  backDelay: 900,
  loop: true
});

/*-----------------END TYPED.JS-----------------*/


/*-----------------RIGHT MNU-----------------*/

//active menu
//$(document).on("scroll", onScroll);
 
$('a[href^="#"]').on('click', function (e) {  
  e.preventDefault();
  $(document).off("scroll");
 
  $('a').each(function () {
    $(this).removeClass('active');
  })
  $(this).addClass('active');
 
  var target = this.hash;
  $target = $(target);
  $('html, body').stop().animate({
    'scrollTop': $target.offset().top+2
  }, 500, 'swing', function () {
    window.location.hash = target;
    $(document).on("scroll", onScroll);
  });
});

    
//scroll js  Отвечает за переход плавным скроом при нажатии на ссылку
smoothScroll.init({
  selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
  selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
  speed: 500, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutCubic', // Easing pattern to use
  updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
  offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
  callback: function ( toggle, anchor ) {} // Function to run after scrolling
});

//menu  Этот блок отвечает за появления меню при нажатии на бургер и соотвественно закрытии при нажатии на крестик
var bodyEl = document.body,
content = document.querySelector( '.content' ),
openbtn = document.getElementById( 'open-button' ),
closebtn = document.getElementById( 'close-button' ),
isOpen = false;

function inits() {
  initEvents();
}

function initEvents() {
  openbtn.addEventListener( 'click', toggleMenu );
  if( closebtn ) {
    closebtn.addEventListener( 'click', toggleMenu );
  }

  // close the menu element if the target it´s not the menu element or one of its descendants..
  content.addEventListener( 'click', function(ev) {
    var target = ev.target;
    if( isOpen && target !== openbtn ) {
      toggleMenu();
    }
  } );
}

function toggleMenu() {
  if( isOpen ) {
    classie.remove( bodyEl, 'show-menu' );
  }
  else {
    classie.add( bodyEl, 'show-menu' );
  }
  isOpen = !isOpen;
}

inits();

/*-----------------END RIGHT MNU-----------------*/


/*-----------------OWL CAROUSEL-----------------*/

$(".owl-carousel").owlCarousel({
  
  items: 1, 
  smartSpeed: 800
  
});

/*-----------------END OWL CAROUSEL-----------------*/


/*-----------------POPUP WINDOWS-----------------*/

$('.popup-link').magnificPopup({
  
  type: "image",
  gallery: {
    enabled: true,
    tPrev: 'Previous (Left arrow key)',
    tNext: 'Next (Right arrow key)',
    tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
  }
    
});

/*-----------------END POPUP WINDOWS-----------------*/


/*-----------------SKILLS-----------------*/

jQuery('.skill-item').each(function() {
  jQuery(this).appear(function() {
    jQuery(this).find('.count-bar').animate({
      width:jQuery(this).attr('data-percent')
    },3000);
    var percent = jQuery(this).attr('data-percent');
    jQuery(this).find('.count').html('<span>' + percent + '</span>');
  });
});

/*-----------------END SKILLS-----------------*/


/*-----------------MASONORY-----------------*/

var $container = $(".masonry-container");
$container.masonry({
  itemSelector: ".masonry-card",
  columnWidth: ".masonry-card"
});

/*-----------------END MASONORY-----------------*/