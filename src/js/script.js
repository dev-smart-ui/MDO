"use strict"

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
    let pageSlider = new Swiper("#page-slider", {
        direction: "vertical",
        allowTouchMove: isTouchEnabled(),
        simulateTouch: !isTouchEnabled(),
        slidesPerView: 1,
        speed: 800,
        longSwipesRatio: 0.3,
        freeMode: {
            enabled: !isTouchEnabled(),
            sticky: true,
        },
        mousewheel: {
            forceToAxis: true,
            enabled: !isTouchEnabled(),
            noMousewheelClass: 'swiper-no-swiping',
            releaseOnEdges: true,
            sensitivity: 3,
        },
        on: {
            init: function () {
                initCounters(this.slides[this.activeIndex])
            },
        }
    });

    let comprehensiveSlider = new Swiper("#comprehensive-slider", {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        loopAdditionalSlides: 2,
        updateOnWindowResize: true,
        autoplay: {
            delay: 5000,
            waitForTransition: true,
        },
        grabCursor: true,
        speed: 700,
        pagination: {
            el: ".comprehensive-coverage-pagination",
            clickable: true,
        },
        on: {
            init: function () {
                updateSlideClasses.call(this);
            },
            slideChangeTransitionStart: function () {
                updateSlideClasses.call(this);
            },
            resize: function () {
                updateSlideClasses.call(this);
            },
            slideChangeTransitionEnd: function () {
                updateSlideClasses.call(this);
            },
            click: function () {
                let index = this.clickedSlide.getAttribute('data-swiper-slide-index');
                this.slideToLoop(index);
            }
        }
    });

    //sliders events
    pageSlider.on('slideChange', function () {
        initCounters(this.slides[this.activeIndex])

        if (this.slides[this.activeIndex].classList.contains('nested')) {
            this.slides[this.activeIndex].classList.add('swiper-no-swiping');
        }
    })

    comprehensiveSlider.on('transitionStart', function () {
        sliderTextToggle();
    })

    //functions initialization after loading fonts
    if (document.fonts) {
        document.fonts.onloadingdone = () => {
            sliderTextToggle()
        };
    }

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
        if (checkDeviceWidth() >= 1024) {
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

    function initCounters(element) {
        const counter = element.querySelector('.counter-grid');
        if (counter) {
            const numbers = counter.querySelectorAll('.counter-item .number');

            if (numbers.length > 0) {
                numbers.forEach((number) => {
                    number.textContent = '0'
                })
                countUp(numbers, 600)
            }
        }
    }

    function checkDeviceWidth() {
        return window.innerWidth
    }
});
