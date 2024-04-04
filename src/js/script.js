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
        autoplay: true,
        speed: 700,
        pagination: {
            el: ".comprehensive-coverage-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2.3,
            },
            1200: {
                slidesPerView: 2.9,
            },
            1440: {
                slidesPerView: 3.8,
            },
            1642: {
                slidesPerView: 4.8,
            }
        }
    });

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


    if (document.fonts) {
        document.fonts.onloadingdone = () => {
            sliderTextToggle();
        };
    }

    function sliderTextToggle() {
        const sliderContent = s3.querySelectorAll('.content');
        sliderContent.forEach(i => {
            if (i.querySelector('ul').offsetHeight > 0) {
                if (i.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
                    i.style.transform = `translateY(0)`;
                } else {
                    i.style.transform = `translateY(${(i.querySelector('ul').offsetHeight) + 3}px)`;
                }
            }
        })
    }

    function sliderTextHide() {
        const sliderContent = s3.querySelectorAll('.content ul');
        sliderContent.forEach(element => {
            if (element.offsetHeight > 0) {
                element.closest('.content').style.transform = `translateY(${element.offsetHeight}px)`;
            }
        })
    }

    function sliderTextShow(element) {
        element.style.transform = `translateY(0)`;
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
        let numbers = document.querySelectorAll('.counter-block .number');
        numbers.forEach(element => {
            if (element.querySelectorAll('span').length > 0) {
                let height = numbersHeight(element);
                element.style.height = height + 'px'
            }
        })
    })
});