"use strict"

document.addEventListener("DOMContentLoaded", function () {
    // sliders
    let s1 = document.querySelector('#page-slider');
    let s2 = document.querySelector('#up-to-date');
    let pageSlider = new Swiper("#page-slider", {
        direction: "vertical",
        slidesPerView: 1,
        mousewheel: {
            forceToAxis: true,
            enabled: true,
            noSwiping: false,
            noMousewheelClass: 'swiper-no-swiping',
            releaseOnEdges: true
        },
        allowTouchMove: false,
    });
    let swiper2 = new Swiper("#up-to-date", {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        freeModeSticky: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        scrollbar: {
            el: ".swiper-scrollbar-custom",
            hide: false,
        },
        parallax: true,
        mousewheel: {
            forceToAxis: true,
            enabled: true
        },
    });

    pageSlider.on('slideChange', function () {
        if (this.slides[this.activeIndex].classList.contains('nested')) {
            this.slides[this.activeIndex].classList.add('swiper-no-swiping');
        }
    })

    swiper2.on('progress', function () {
        if (this.isEnd || this.isBeginning) {
            s1.querySelectorAll('.nested').forEach(i => {
                i.classList.remove('swiper-no-swiping')
            })
        }
    })

    // counter
    const gridsNumber = document.querySelectorAll('.counter-block .counter-grid');

    if (gridsNumber.length > 0) {
        gridsNumber.forEach((element) => {
            const numbers = element.querySelectorAll('.counter-item .number');

            if (numbers.length > 0) {
                numbers.forEach((element, index) => {
                    const countTo = parseInt(element.dataset.count.replace(/[^\d]/g, ''), 10),
                        textInCount = element.dataset.count.replace(/[^a-zа-яё+]+/ig, '')
                    generateNumbers(countTo, textInCount, element, (index * 100))
                })
            }
        })
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

        animationNumbers(element, delay)
    }

    function animationNumbers(element, delay) {
        let n = element.querySelectorAll('span'),
            wrapper = element.querySelector('.number-wrapper'),
            numberHeight = n[0].offsetHeight

        element.style.height = numberHeight + 'px'

        wrapper.style.transform = `translateY(calc(-100% + ${numberHeight}px))`
        wrapper.classList.remove('opacity-0')

        setTimeout(() => {
            wrapper.classList.add('transition-transform', 'duration-[1000ms]')
            wrapper.style.transform = `translateY(0)`;
        }, delay)
    }

});