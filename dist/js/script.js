const btnMenu = document.querySelector('.menu-trigger');
const menu = document.querySelector('.menu');
const toggleMenu = function() {
    menu.classList.toggle('open');
}

btnMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener('click', function(e) {
    const target = e.target;
    const its_menu = target == menu || menu.contains(target);
    const its_btnMenu = target == btnMenu;
    const menu_is_active = menu.classList.contains('open');
    
    if (!its_menu && !its_btnMenu && menu_is_active) {
        toggleMenu();
    }
});

$(document).ready(function(){
      function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            textarea: "requiered",
            submit: "requiered",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Пожалуйста, введите своё имя",
              minlength: jQuery.validator.format("Введите не менее {0}-ух символов")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            textarea: "",
            submit: "",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Введите правильно почту"
            }
          }
        });
      }

      validateForms('#callback-form');
      validateForms('#we-call-form');
      validateForms('#callback-box-form');
      validateForms('#we-call-form-modal');

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay').fadeOut('slow');
      });

      $('.insta-block__carousel').slick({
          arrows: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 500,
          infinite: true
        });
        
  });