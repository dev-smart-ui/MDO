"use strict"
function isTouchEnabled() {
    return ( 'ontouchstart' in window ) ||
        ( navigator.maxTouchPoints > 0 ) ||
        ( navigator.msMaxTouchPoints > 0 );
}

document.addEventListener("DOMContentLoaded", function () {

    // sliders
    let s1 = document.querySelector('#page-slider');
    let s2 = document.querySelector('#up-to-date');
    let pageSlider = new Swiper("#page-slider", {
        direction: "vertical",
        allowTouchMove: isTouchEnabled(),
        simulateTouch: true,
        slidesPerView: 1,
        mousewheel: {
            forceToAxis: true,
            enabled: true,
            noSwiping: false,
            noMousewheelClass: 'swiper-no-swiping',
            releaseOnEdges: true
        },
        on: {
            init: function (){
                const counter = this.slides[this.activeIndex].querySelector('.counter-grid');
                if(counter){
                    findNumbers(counter);
                }
            }
        }
    });
    // let swiper2 = new Swiper("#up-to-date", {
    //     direction: 'vertical',
    //     slidesPerView: 'auto',
    //     freeMode: true,
    //     freeModeSticky: true,
    //     watchSlidesProgress: true,
    //     watchSlidesVisibility: true,
    //     scrollbar: {
    //         el: ".swiper-scrollbar-custom",
    //         hide: false,
    //     },
    //     parallax: true,
    //     mousewheel: {
    //         forceToAxis: true,
    //         enabled: true
    //     },
    // });

    pageSlider.on('slideChange', function () {
        const counter = this.slides[this.activeIndex].querySelector('.counter-grid');
        if(counter){
            findNumbers(counter);
        }

        if (this.slides[this.activeIndex].classList.contains('nested')) {
            this.slides[this.activeIndex].classList.add('swiper-no-swiping');
        }
    })

    // swiper2.on('progress', function () {
    //     if (this.isEnd || this.isBeginning) {
    //         s1.querySelectorAll('.nested').forEach(i => {
    //             i.classList.remove('swiper-no-swiping')
    //         })
    //     }
    // })

    // counter

    function findNumbers(element){
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

    function numbersHeight(element){
        let n = element.querySelectorAll('span')
        return n[0].offsetHeight
    }

    function numbersTransform(numberHeight, element, wrapper){
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

    window.addEventListener('resize', function (){
        let numbers = document.querySelectorAll('.counter-block .number');
        numbers.forEach(element => {
            if(element.querySelectorAll('span').length > 0){
                let height = numbersHeight(element);
                element.style.height = height + 'px'
            }
        })
    })
});