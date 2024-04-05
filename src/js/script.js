"use strict"

function isTouchEnabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

window.addEventListener("load", function () {

    // sliders
    const s1 = document.querySelector('#page-slider');
    const s2 = document.querySelector('#up-to-date');
    const s3 = document.querySelector('#comprehensive-slider');
    let pageSlider = new Swiper("#page-slider", {
        direction: "vertical",
        allowTouchMove: isTouchEnabled(),
        simulateTouch: !isTouchEnabled(),
        slidesPerView: 1,
        speed: 800,
        longSwipesRatio: 0.3,
        mousewheel: {
            forceToAxis: true,
            enabled: true,
            noSwiping: false,
            noMousewheelClass: 'swiper-no-swiping',
            releaseOnEdges: true
        },
        on: {
            init: function () {
                const counter = this.slides[this.activeIndex].querySelector('.counter-grid');
                if (counter) {
                    findNumbers(counter);
                }
            },
        }
    });

    let comprehensiveSlider = new Swiper("#comprehensive-slider", {
        slidesPerView: 1.2,
        loop: true,
        centeredSlides: true,
        roundLengths: true,
        loopAdditionalSlides: 2,
        autoplay: {
            delay: 5000
        },
        speed: 700,
        watchSlidesProgress: true,
        pagination: {
            el: ".comprehensive-coverage-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2.3,
            },
            1024: {
                slidesPerView: 2.9,
            },
            1440: {
                slidesPerView: 3.75,
            },
            1642: {
                slidesPerView: 4.75,
            },
            2300: {
                slidesPerView: 5.75,
            }
        },
        on: {
            init: function () {
                updateSlideClasses.call(this);
            },
            slideChange: function () {
                updateSlideClasses.call(this);
            }
        }
    });

    function nextAll(elem) {
        let matched = [];
        while (elem = elem.nextSibling) {
            if (elem.nodeType === 1) {
                matched.push(elem);
            }
        }
        return matched;
    }

    function prevAll(element) {
        let matched = [];
        while (element = element.previousElementSibling)
            matched.push(element);
        return matched;
    }

    function updateSlideClasses() {
        let active = this.slides[this.activeIndex],
            right = 0.18,
            allNext = nextAll(active),
            allPrev = prevAll(active);

        active.classList.remove('afterActive');
        active.style.right = '0'
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
    }

    pageSlider.on('slideChange', function () {
        const counter = this.slides[this.activeIndex].querySelector('.counter-grid');
        if (counter) {
            findNumbers(counter);
        }

        if (this.slides[this.activeIndex].classList.contains('nested')) {
            this.slides[this.activeIndex].classList.add('swiper-no-swiping');
        }
    })

    comprehensiveSlider.on('transitionStart', function () {
        sliderTextToggle();
    })

    //text on slider cards
    if (document.fonts) {
        document.fonts.onloadingdone = () => {
            sliderTextToggle();
        };
    }

    function sliderTextToggle() {
        const sliderContent = s3.querySelectorAll('.content');
        if(sliderContent.length > 0){
            sliderContent.forEach(i => {
                if (i.querySelector('ul').offsetHeight > 0) {
                    if (i.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
                        i.style.transform = `translateY(0)`;
                    } else {
                        i.style.transform = `translateY(${(i.querySelector('ul').offsetHeight) + 5}px)`;
                    }
                } else {
                    i.style.transform = `translateY(0)`;
                }
            })
        }

    }

    // counter
    function findNumbers(element) {
        const numbers = element.querySelectorAll('.counter-item .number');

        if (numbers.length > 0) {
            numbers.forEach((element, index) => {
                const countTo = parseInt(element.dataset.count.replace(/[^\d]/g, ''), 10),
                    textInCount = element.dataset.count.replace(/[^a-zа-яё+]+/ig, '')
                generateNumbers(countTo, textInCount, element, (index * 100))
            })
        }
    }

    function generateNumbers(n, text, element, delay) {
        n = +n;
        let step = 5;
        if (n > 2000 && n < 5000) {
            step = 100;
        } else if (n > 5000) {
            step = 500;
        }
        const numbers = [];

        for (let i = 0; i <= n;) {
            numbers.push(i + text);
            if (i >= 1000 && n > 2000 && n < 5000) {
                i += 500;
            } else {
                i += step;
            }
        }
        if (!numbers.includes(n)) {
            numbers.push(n + text);
        }

        renderNumbers(numbers, element, delay)
    }

    function renderNumbers(num, element, delay) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('flex', 'flex-col-reverse', 'number-wrapper', 'opacity-0')
        num.forEach(n => {
            let numberElem = document.createElement('span');
            numberElem.innerText = n
            wrapper.append(numberElem)
        })
        element.append(wrapper)

        numbersTransform(numbersHeight(element), element, wrapper);
        animationNumbers(element, delay)
    }

    function numbersHeight(element) {
        let n = element.querySelectorAll('span')
        return n[0].offsetHeight
    }

    function numbersTransform(numberHeight, element, wrapper) {
        element.style.height = numberHeight + 'px'
        wrapper.style.transform = `translateY(calc(-100% + ${numberHeight}px))`
        wrapper.classList.remove('opacity-0')
    }

    function animationNumbers(element, delay) {
        let wrapper = element.querySelector('.number-wrapper')

        setTimeout(() => {
            wrapper.classList.add('transition-transform', 'duration-[1000ms]')
            wrapper.style.transform = `translateY(0)`;
        }, delay)
    }

    window.addEventListener('resize', function () {

        sliderTextToggle();

        let numbers = document.querySelectorAll('.counter-block .number');
        numbers.forEach(element => {
            if (element.querySelectorAll('span').length > 0) {
                let height = numbersHeight(element);
                element.style.height = height + 'px'
            }
        })
    })
});