$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        infinite: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="image/carousel/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="image/carousel/arrow-right.svg" alt=""></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: false,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 1
              }
            },
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-card__content').eq(i).toggleClass('catalog-card__content_active');
            $('.catalog-card__list').eq(i).toggleClass('catalog-card__list_active');
          })
        });
      };

      toggleSlide('.catalog-card__link');
      toggleSlide('.catalog-card__back');

      // Modal
      
      $('[data-modal=consultation]').on('click', function() {
          $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
          $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
      });
      
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-card__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        });
      });

      function validateForm(form) {
        $(form).validate({
          rules: {
            name: "required",
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },  
          messages: {
            name: "Введите Ваше имя",
            phone: "Введите Ваш номер телефона",
              email: {
              required: "Введите Ваш email",
              email: "Введите корректный email"
            }
          }
        });
      }
      validateForm('#consultation form');
      validateForm('#consultation-form');
      validateForm('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 1600) {
                $('.scroll-up').fadeIn();
            } else {
              $('.scroll-up').fadeOut();
            }
        });

        $("a[href='up#']").click(function(){
          var _href = $(this).attr("href");
          $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
          return false;
        });

        new WOW().init();
  });