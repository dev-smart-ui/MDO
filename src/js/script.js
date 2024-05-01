"use strict"


const app = document.querySelector('#app');
const counters = document.querySelectorAll('.counter-block');
const goToSubscribe = document.querySelectorAll('.goToSubscribe');
const stepFormWrap = document.querySelector('#stepFormWrap');

//touch screen check
function isTouchEnabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

window.addEventListener("load", function () {
    // sliders
    const s1 = document.querySelector('#page-slider');
    const s2 = document.querySelector('#comprehensive-slider');
    // let pageSlider = new Swiper("#page-slider", {
    //     direction: "vertical",
    //     allowTouchMove: isTouchEnabled(),
    //     simulateTouch: !isTouchEnabled(),
    //     slidesPerView: 1,
    //     speed: 800,
    //     longSwipesRatio: 0.3,
    //     freeMode: {
    //         enabled: !isTouchEnabled(),
    //         sticky: true,
    //     },
    //     mousewheel: {
    //         forceToAxis: true,
    //         enabled: !isTouchEnabled(),
    //         noMousewheelClass: 'swiper-no-swiping',
    //         releaseOnEdges: true,
    //         sensitivity: 3,
    //     },
    //     on: {
    //         init: function () {
    //             initCounters(this.slides[this.activeIndex])
    //         },
    //     }
    // });

    let comprehensiveSlider = new Swiper("#comprehensive-slider", {
        slidesPerView: 1.25,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        updateOnWindowResize: true,
        loopAdditionalSlides: 4,
        slideToClickedSlide: true,
        observer: true,
        autoplay: {
            delay: 5000,
            waitForTransition: true,
            disableOnInteraction: false,
        },
        grabCursor: true,
        speed: 700,
        pagination: {
            el: ".comprehensive-coverage-pagination",
            clickable: true,
        },
        breakpoints:{
            768: {
                slidesPerView: 2,
            },
            1024:{
                slidesPerView: 3.2,
            },
            1440:{
                slidesPerView: 3.8,
            },
            1642:{
                slidesPerView: 4.8,
            }
        },
        on: {
            init: function () {
                updateSlideClasses.call(this);
            },
            slideChangeTransitionStart: function () {
                updateSlideClasses.call(this);
                this.updateSlides()
            },
            resize: function () {
                updateSlideClasses.call(this);
            },
            slideChangeTransitionEnd: function () {
                updateSlideClasses.call(this);
                this.updateSlides()
            },
            sliderMove: function () {
                updateSlideClasses.call(this);
                this.updateSlides()
            },
        }
    });

    //sliders events
    // pageSlider.on('slideChange', function () {
    //     initCounters(this.slides[this.activeIndex])

    //     if (this.slides[this.activeIndex].classList.contains('nested')) {
    //         this.slides[this.activeIndex].classList.add('swiper-no-swiping');
    //     }
    // })

    initCounters();

    comprehensiveSlider.on('transitionStart', function () {
        sliderTextToggle();
    })

    //functions initialization after loading fonts
    if (document.fonts) {
        document.fonts.onloadingdone = () => {
            sliderTextToggle()
        };
    }

    sliderTextToggle(); // force hide slider contents (page onload)

    // find all next elements after "element"
    function nextAll(element) {
        let matched = [];
        while (element = element.nextSibling) {
            if (element.nodeType === 1) {
                matched.push(element);
            }
        }
        return matched;
    }

    // find all prev elements before "element"
    function prevAll(element) {
        let matched = [];
        while (element = element.previousElementSibling)
            matched.push(element);
        return matched;
    }

    //add class and styles for comprehensiveSlider
    function updateSlideClasses() {
        let active = this.slides[this.activeIndex],
            right = 0.18,
            allNext = nextAll(active),
            allPrev = prevAll(active);

        active.classList.remove('afterActive');
        active.style.right = '0'
        if (checkDeviceWidth() >= 1) {
            this.slides.forEach(i => {
                i.classList.remove('afterActive')
            })
            allPrev.forEach((elem, index) => {
                elem.style.right = `${elem.offsetWidth * (-right * index)}px`
            })
            allNext.forEach((elem, index) => {
                elem.classList.add('afterActive')
                elem.style.right = `${elem.offsetWidth * (right * index)}px`
            })
        } else {
            this.slides.forEach(i => {
                i.style.right = '0'
            })
        }

    }

    //toggle text on comprehensiveSlider cards
    function sliderTextToggle() {
        const sliderContent = s2.querySelectorAll('.content');
        if (sliderContent.length > 0) {
            sliderContent.forEach(i => {
                if (i.querySelector('.list') && i.querySelector('.list').offsetHeight > 0) {
                    if (i.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
                        i.style.transform = `translateY(0)`;
                    } else {
                        i.style.transform = `translateY(${(i.querySelector('.list').offsetHeight)}px)`;
                    }
                } else {
                    i.style.transform = `translateY(0)`;
                }
            })
        }
    }

    window.addEventListener('resize', function () {
        sliderTextToggle();
        updateHeaderRightOffset();
    })

    // counter
    function countUp(elements, duration) {
        const animationDuration = duration || 4000,
            frameDuration = 1000 / 60,
            totalFrames = Math.round(animationDuration / frameDuration),
            easeOutQuad = (t) => t * (2 - t),
            easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2,
            animateCountUp = (el) => {
                let frame = 0
                const countTo = parseInt(el.dataset.count.replace(/[^\d]/g, ''), 10),
                    textInCount = el.dataset.count.replace(/[^a-zа-яё+]+/ig, '')

                const counter = setInterval(() => {
                    frame++

                    const progress = easeOutQuad(frame / totalFrames),
                        currentCount = Math.round(countTo * progress)

                    if (parseInt(el.textContent.replace(/[^\d]/g, ''), 10) !== currentCount) {
                        el.textContent = currentCount + textInCount
                    }

                    if (frame === totalFrames) {
                        clearInterval(counter)
                    }
                }, frameDuration)
            }

        elements.forEach((element, index) => {
            setTimeout(() => {
                animateCountUp(element)
            }, index * 100)
        })
    }
    

    function initCounters() {
        try {
            if (!counters || !counters.length) return

            counters.forEach((counter) => {
                const numbers = counter.querySelectorAll('.counter-item .number');

                if (numbers.length > 0) {
                    numbers.forEach((number) => {
                        number.textContent = '0'
                    })
                    countUp(numbers, 600)
                }
            });
            
            return true;
        } catch(err) {
            console.warn(err);
        }
    }

    function checkDeviceWidth() {
        return window.innerWidth
    }

    const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        
        return partiallyVisible
          ? ((top > 0 && top < innerHeight) ||
              (bottom > 0 && bottom < innerHeight)) &&
              ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
          : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    };


    

    app.addEventListener('scroll', function () {
        try {
            const isMobileCounter = getComputedStyle(counters[0]).display == 'none';
            let targetCounter;
            
            if (isMobileCounter) {
                targetCounter = counters[1].querySelector('.counter-grid');
            } else {
                targetCounter = counters[0];
            }

            const isCounterIntoView = elementIsVisibleInViewport(targetCounter, true);

            if (isCounterIntoView) {
                !targetCounter.classList.contains('inView') && initCounters() && targetCounter.classList.add('inView')
            } else {
                targetCounter.classList.contains('inView') && targetCounter.classList.remove('inView')
            }
        } catch(err) {
            console.warn(err);
        }
    })


    goToSubscribe.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            stepFormWrap.scrollIntoView({ block: "start", behavior: "smooth" });
        })
    })
});
