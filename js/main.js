(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    if (!document.querySelector('.whatsapp-float')) {
        var whatsappButton = document.createElement('a');
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.href = 'https://wa.me/5491139568394';
        whatsappButton.target = '_blank';
        whatsappButton.rel = 'noopener';
        whatsappButton.setAttribute('aria-label', 'Escríbenos por WhatsApp');
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i><span>¿Hablamos?</span>';
        document.body.appendChild(whatsappButton);
    }
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    var updateFixedNavbar = function () {
        var navbar = $('.fixed-top');
        var isScrolled = $(window).scrollTop() > 45;
        var isHomePage = $('body').hasClass('home-page');

        if (isScrolled) {
            navbar.addClass('is-scrolled shadow');
            if (!isHomePage) {
                navbar.addClass('bg-dark');
            }

            var topOffset = $('.announcement-bar').outerHeight() || 0;
            if ($(window).width() >= 992) {
                topOffset += $('.top-bar').outerHeight() || 0;
            }
            navbar.css('top', -topOffset);
        } else {
            navbar.removeClass('is-scrolled shadow bg-dark').css('top', 0);
        }
    };

    $(window).on('scroll resize', updateFixedNavbar);
    updateFixedNavbar();

    $('.navbar-collapse a[href]').on('click', function () {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    $('.home-page a[href="#admissions"]').on('click', function (event) {
        var admissionsSection = $('#admissions');
        if (!admissionsSection.length) {
            return;
        }

        event.preventDefault();
        window.history.pushState(null, '', '#admissions');

        var clickedFromMobileMenu = $(this).closest('.navbar-collapse').length > 0 && $(window).width() < 992;
        if (clickedFromMobileMenu) {
            $('.navbar-collapse').collapse('hide');
        }

        window.setTimeout(function () {
            var headerOffset = ($('.announcement-bar').outerHeight() || 0) +
                ($('.navbar-brand').outerHeight() || 0) + 12;

            $('html, body').stop().animate({
                scrollTop: admissionsSection.offset().top - headerOffset
            }, 650, 'easeInOutExpo');
        }, clickedFromMobileMenu ? 350 : 0);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);
