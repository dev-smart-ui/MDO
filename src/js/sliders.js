import {resetForm, determinePositionForAnimationSegments} from "./helpers-presentation.js";

let pageSlider;
window.addEventListener("load", () => {
    /**
     * Initialize a page slider
     */
    let activePageIndex = 0;
    pageSlider = new Swiper('#presentation-slider', {
        slidesPerView: 1,
       /* direction: 'vertical',*/
        speed: 1000,
        mousewheel: false,
        allowTouchMove: false,
        allowSlideNext: true,
        allowSlidePrev: true,
        effect: 'fade',
        initialSlide: 0,
        fadeEffect: {
            crossFade: true,
        },
        on: {
            beforeTransitionStart: function (swiper) {
                prepareAnimation(swiper);
            },
            transitionStart: function (swiper) {
                startAnimation(swiper);
            },
        },
    });


    /**
     * Initialize a comprehensive slider
     */

    function initializeSwiper() {
        new Swiper('#comprehensive-slider-presentation', {
            slidesPerView: 'auto',
            freeMode: true,
            speed: 700,
            pagination: {
                el: '.comprehensive-coverage-pagination-presentation',
                clickable: true,
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slideClass: 'comprehensive-slide-item',
            slideActiveClass: 'comprehensive-slide-item-active',
            grabCursor: true,
            preventInteractionOnTransition: true,
        });
    }

    if (window.innerWidth >= 1042) {
        initializeSwiper();
    }


    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1042 && !document.querySelector('.swiper-container-initialized')) {
            initializeSwiper();
        }
    });

});

function animateFirstSlide(slideDirectionMobile) {
    //for desktop
    $('#slide1 [data-animate]').addClass('animate__animated animate__fadeInLeftOwn');

    //for mobile
    $('#slide1 [data-animate-mobile]').addClass(`animate__animated ${slideDirectionMobile} `);
}

function prepareAnimation(swiper) {
    /*$('.panel-animation').css('width', "auto");*/
    $('[data-animate]').removeClass('animate__animated animate__fadeInLeftOwn animate__fadeInRightOwn');
    $('[data-animate-fade-in-up]').removeClass('animate__animated animate__fadeInUpOwn animate__fadeOutDown animate__fadeInBottomOwn');
    $('[data-animate-fade-in-bottom]').removeClass('animate__animated animate__UpSmall animate__downSmall animate__fadeInDown animate__fadeInUp animate__fadeInLeftSmallOwn animate__fadeInBottomOwn animate__fadeInRightSmallOwn animate__fadeOutUp  animate__fadeInBackFromBottom');
    $('[data-animate-left]').removeClass('animate__animated animate__fadeInLeftOwn animate__fadeInRightSlowerOwn animate__fadeInLeftSlowerOwn animate__fadeInRightOwn ');
    $('[data-animate-right]').removeClass('animate__animated animate__fadeInLeftOwn animate__fadeInRightSlowerOwn animate__fadeInLeftSlowerOwn animate__fadeInRightOwn ');
    $('[data-animate-bottom-left]').removeClass('animate__animated animate__fadeInBottomLeftOwn animate__fadeInTopLeftOwn');
    $('[data-animate-top-left]').removeClass('animate__animated animate__fadeInTopLeftOwn animate__fadeInBottomLeftOwn');
    $('[data-animate-width]').removeClass('animate__animated animate__widthOwn');
    $('[data-animate-width-max ]').removeClass('animate__animated animate__width-minOwn');
    $('[data-animate-mobile]').removeClass('animate__animated animate__fadeInRightOwnMobile animate__fadeInLeftOwnMobile');
    $('[data-animate-small]').removeClass('animate__animated animate__fadeInRightSmallOwn animate__fadeInLeftSmallOwn');
    $('[data-animate-selects]').removeClass('animate__animated animate__fadeInShowOwn ');
}

function startAnimation(swiper) {
    let slideDirection = swiper.activeIndex > swiper.previousIndex ? 'animate__fadeInRightOwn' : 'animate__fadeInLeftOwn';
    let slideDirectionMobile = swiper.activeIndex > swiper.previousIndex ? 'animate__fadeInRightOwnMobile' : 'animate__fadeInLeftOwnMobile';
    let slideDirectionFor2SlideLeft = swiper.activeIndex > swiper.previousIndex ? 'animate__fadeInRightOwn' : '';
    let slideDirectionFor2SlideRight = swiper.activeIndex > swiper.previousIndex ? 'animate__fadeInLeftOwn' : '';
    let slideDirectionFor2TitleToRight = swiper.activeIndex > swiper.previousIndex ? 'animate__fadeInBottomOwn' : 'animate__fadeInRightSmallOwn';
    let slideDirectionFor2Width = swiper.activeIndex > swiper.previousIndex ? '' : 'animate__widthOwn';
    let slideDirectionFor3Width = swiper.activeIndex > swiper.previousIndex ? 'animate__width-minOwn' : '';
    let slideDirectionFor3UpDown = swiper.activeIndex > swiper.previousIndex ? '' : 'animate__UpSmall';


    if (swiper.activeIndex === 0) {
        animateFirstSlide(slideDirectionMobile)
        $('#slide1 [data-animate-mobile]').addClass(`animate__animated ${slideDirection} `);
        $('#slide2 [data-animate-fade-in-up]').addClass(`animate__animated animate__fadeOutDown`);
        $('#slide2 [data-animate-fade-in-bottom]').addClass(`animate__animated animate__fadeOutUp`);
    }


    else if (swiper.activeIndex === 1) {
        $('#slide2 [data-animate-mobile]').addClass(`animate__animated ${slideDirectionMobile} `);
        $('#slide2 [data-animate]').addClass(`animate__animated ${slideDirection} `);
        $('#slide2 [data-animate-fade-in-up]').addClass(`animate__animated animate__fadeInUpOwn `);
        $('#slide2 [data-animate-fade-in-bottom]').addClass(`animate__animated  ${slideDirectionFor2TitleToRight} `);
    }

    else if (swiper.activeIndex === 2) {
        $('#slide3 [data-animate-mobile]').addClass(`animate__animated ${slideDirectionMobile}`);
        $('#slide2 [data-animate-fade-in-up]').addClass(`animate__animated animate__fadeOutDown`);
        $('#slide2 [data-animate-fade-in-bottom]').addClass(`animate__animated  animate__fadeInLeftSmallOwn`);
        $('#slide3 [data-animate-left]').addClass(`animate__animated  ${slideDirectionFor2SlideLeft}`);
        $('#slide3 [data-animate-right]').addClass(`animate__animated  ${slideDirectionFor2SlideRight}`);
        $('#slide3 [data-animate-width]').addClass(`animate__animated   ${slideDirectionFor2Width}`);
        $('#slide4 [data-animate-selects]').addClass(`animate__animated animate__fadeOutDisappear`);
    }

    else if (swiper.activeIndex === 3) {
        $('#slide4 [data-animate-mobile]').addClass(`animate__animated ${slideDirectionMobile} `);
        $('#slide4 [data-animate-left]').addClass(`animate__animated  animate__fadeInRightOwn`);
        $('#slide4 [data-animate-right]').addClass('animate__animated animate__fadeInLeftOwn ');
        $('#slide4 [data-animate-width-max]').addClass(`animate__animated  ${slideDirectionFor3Width}`);
        $('#slide4 [data-animate-fade-in-bottom]').addClass(`animate__animated ${slideDirectionFor3UpDown} `);
        $('#slide4 [data-animate-selects]').addClass(`animate__animated animate__fadeInShowOwn `);
        $('#slide5 [data-animate-small]').addClass(`animate__animated animate__fadeInLeftSmallOwn `);
        $('#slide5 [data-animate-fade-in-bottom]').addClass(`animate__animated animate__fadeInUp `);
        $('#slide5 [data-animate-bottom-left]').addClass('animate__animated animate__fadeInTopLeftOwn ');
        $('#slide5 [data-animate-top-left]').addClass('animate__animated animate__fadeInBottomLeftOwn ');
        $('#slide5 [data-animate-left]').addClass('animate__animated animate__fadeInLeftOwn');

        setTimeout(()=>{
            $('[data-animate-width-max ]').removeClass('animate__width-minOwn');
        }, 1500)

    }

    else if (swiper.activeIndex === 4) {
        $('#slide5 [data-animate-mobile]').addClass(`animate__animated ${slideDirectionMobile} `);
        $('#slide5 [data-animate-left]').addClass('animate__animated animate__fadeInRightOwn');
        $('#slide5 [data-animate-bottom-left]').addClass('animate__animated animate__fadeInBottomLeftOwn ');
        $('#slide5 [data-animate-top-left]').addClass('animate__animated animate__fadeInTopLeftOwn ');
        $('#slide5 [data-animate-small]').addClass(`animate__animated animate__fadeInRightSmallOwn `);
        $('#slide5 [data-animate-fade-in-bottom]').addClass(`animate__animated animate__downSmall `);
    }

}

$(document).ready(function () {
    /**
     * Navigate between page slides
     */

    $('#getStarted').on('click', function () {
        determinePositionForAnimationSegments()
    });
    $('#getStarted, .btn-next, [data-request-invoice]').on('click', function () {
        pageSlider.slideNext();
        $('[data-btns-box]').addClass(`lg:fixed`);
    });

    $('.section-back').on('click', function () {
        pageSlider.slidePrev();
    });

    $('.section-close').on('click', function () {
        pageSlider.slideTo(0);
        resetForm();
    });

});
export {pageSlider};