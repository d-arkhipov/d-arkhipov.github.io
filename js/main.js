'use strict';

$(document).ready(function () {

  //Карусель для комментариев.
  $('.owl-carousel-comments').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:1
      },
      1000:{
        items:1
      }
    }
  });

  //Карусель для слайдера на странице single_page.
  $('.owl-carousel-slider').owlCarousel({
    loop:true,
    nav:true,
    navText : ["",""],
    dots: false,
    smartSpeed:1000,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:1
      },
      1000:{
        items:1
      }
    }
  });

  //Вызываем конструктор класса Basket_top.
  new Basket_top();

  //Плавное перемещение в область расположения корзины после нажатия "Add to Cart".
  $(".cart_center").on("click", "a", function(event) {
    event.preventDefault();
    let id  = $(this).attr('href');
    let top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });
});