"use strict"

window.addEventListener("load", function () {  
    const app = document.querySelector('#app');
    const counters = document.querySelectorAll('.counter-block');
    const goToSubscribe = document.querySelectorAll('.goToSubscribe');
    const goToContact = document.querySelectorAll('.goToContact');
    const stepFormWrap = document.querySelector('#stepFormWrap');
    const contactUsWrap = document.querySelector('#contactUsWrap');
    const newsSection = document.querySelector('#newsSection');
    const newsSectionNewsList = document.querySelector('#newsSectionNewsList');
    const newsSectionNewsListProgress = document.querySelector('#newsSectionNewsListProgress');
    const newsSectionNewsListLogo = document.querySelector('#newsSectionNewsListLogo');
    const requestDemoControls = document.querySelectorAll('.requestDemoControl');
    const requestDemoControlsImage = document.querySelectorAll('.requestDemoControlImage');
    const requestDemoControlWrap = document.querySelector('.requestDemoControlWrap');

    const s1 = document.querySelector('#page-slider');
    const s2 = document.querySelector('#comprehensive-slider');

    const newsSectionSliderParams = {
        slidesPerView: 1,
        spaceBetween: 12,
        speed: 700,
        init: false,
        observer: true,
        pagination: {
            el: ".newsSection .swiper-pagination",
            clickable: true,
        },
    };

    const reviewsSectionSliderParams = {
        slidesPerView: 1.1,
        spaceBetween: 20,
        speed: 500,
        //init: false,
        observer: true,
        navigation: {
            nextEl: '#reviewsSectionSlider .next',
            prevEl: '#reviewsSectionSlider .prev',
        },
        breakpoints:{
            768: { slidesPerView: 1.7 },
            992: { slidesPerView: 2.2 },
            1200:{ slidesPerView: 2.9 },
            1642:{ slidesPerView: 3.5 }
        },
        pagination: {
            el: ".reviewsSection .swiper-pagination",
            clickable: true,
        },
    };
    
    const comprehensiveSliderParams = {
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
            768: { slidesPerView: 2 },
            1024:{ slidesPerView: 3.2 },
            1440:{ slidesPerView: 3.8 },
            1642:{ slidesPerView: 4.8 }
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
            transitionStart: function () {
                sliderTextToggle();
            }
        }
    };

    let comprehensiveSlider = new Swiper("#comprehensive-slider", comprehensiveSliderParams);
    let newsSectionSlider = new Swiper("#newsSectionSlider", newsSectionSliderParams);
    let reviewsSectionSlider = new Swiper("#reviewsSectionSlider", reviewsSectionSliderParams);

    //functions initialization after loading fonts
    if (document.fonts) {
        document.fonts.onloadingdone = () => {
            sliderTextToggle()
        };
    }    

    // GLOBAL RESIZE
    window.addEventListener('resize', function () {
        sliderTextToggle();
        updateHeaderRightOffset();
        updateNewsSectionHeight();
        initNewsSlider();
    });


    // GLOBAS SCROLL
    app.addEventListener('scroll', function (e) {
        dynamicCounters();
        newsScrolls(e);
    });


    goToSubscribe.length && goToSubscribe.forEach(btn => {
        btn.addEventListener('click', e => { appScrollIntoView(e, newsSection, stepFormWrap) })
    });

    goToContact.length && goToContact.forEach(btn => {
        btn.addEventListener('click', e => { appScrollIntoView(e, newsSection, contactUsWrap) })
    });

    // request a demo section animations handler
    requestDemoControls.length && requestDemoControls.forEach((btn, i) => { btn.addEventListener('click', e => { requestDemoControlsHandler(i) }) });

    
    initCounters();
    sliderTextToggle(); // force hide slider contents (page onload)
    updateNewsSectionHeight();
    initNewsSlider();






    // FUNCTIONS *****

    // advanced native scrollIntoView for except add hide/show section which can scroll or swiping, while scrollIntoView end (for correct scrolls calc)
    function appScrollIntoView(e, barrier, dest) {
        try {
            e.preventDefault();
            e.stopPropagation();

            barrier.style.display = 'none';

            dest.scrollIntoView({ block: "start", behavior: "smooth" });

            let scrollTimeout;
            app.addEventListener('scroll', function(e) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(e => { barrier.style.display = 'block' }, 100);
            });
        } catch(err) {
            console.warn(err);
        }
    }

    //touch screen check
    function isTouchEnabled() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
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

    function elementIsVisibleInViewport(el, partiallyVisible = false) {
        const { top, left, bottom, right } = el.getBoundingClientRect();
        const { innerHeight, innerWidth } = window;
        
        return partiallyVisible
        ? ((top > 0 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    };

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

    function dynamicCounters() {
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
    }

    function newsScrolls(e) {
        try {
            if (checkDeviceWidth() < 1150) return

            const sectionOffsetTop = newsSection.getBoundingClientRect().top;

            if (sectionOffsetTop > 0) return
            
            newsSectionNewsList.scrollTo({top: Math.abs(sectionOffsetTop)});
            newsSectionNewsListLogo.scrollTo({left: sectionOffsetTop / 3.1});

            const isScrollEnd = !(newsSectionNewsList.scrollHeight - newsSectionNewsList.clientHeight - newsSectionNewsList.scrollTop);
            const targetEndScroll = newsSectionNewsList.scrollHeight - newsSectionNewsList.clientHeight;
            const scrollProgress = 100 - +(newsSectionNewsList.scrollTop / targetEndScroll * 100).toFixed(2);

            newsSectionNewsListProgress.style.transform = `translateY(-${scrollProgress}%)`;

        } catch(err) {
            console.warn(err);
        }
    }

    function updateNewsSectionHeight() {
        try {
            if (checkDeviceWidth() >= 1150) {
                newsSection.style.height = newsSectionNewsList.scrollHeight + 'px';
            } else {
                newsSection.style.removeProperty('height');
            }      
        } catch(err) {
            console.warn(err);
        }
    }

    function initNewsSlider() {
        const isDestroyed = newsSectionSlider.destroyed;

        if (isDestroyed) {
            newsSectionSlider = new Swiper("#newsSectionSlider", newsSectionSliderParams);
        }

        const isInit = newsSectionSlider.initialized;
        const isMobile = checkDeviceWidth() < 1150;

        if (isMobile && !isInit) {
            newsSectionSlider.init();
            console.log('newsSectionSlider init...');
            return
        }

        if (!isMobile && isInit) {
            console.log('newsSectionSlider already initialized, destroying...');
            newsSectionSlider.destroy();
        }
    }

    function requestDemoControlsHandler(i) {
        try {
            if (i != 0 && i != 1 && i != 2) return    
            
            requestDemoControls.forEach(btn => { btn.classList.remove('active') });
            requestDemoControls[i].classList.add('active');            

            // *** on macbook click
            if (i == '0') {
                // current
                requestDemoControlsImage[0].style.opacity = '1';
                requestDemoControlsImage[0].style.transform = 'none';
                requestDemoControlsImage[0].classList.add('active');
                
                requestDemoControlWrap.classList.remove('isPhone');
                requestDemoControlWrap.classList.remove('isTablet');
                requestDemoControlWrap.classList.add('isLaptop');

                // rest
                requestDemoControlsImage[1].style.opacity = '0';
                requestDemoControlsImage[1].style.transform = 'rotate(19deg) translateX(35%) scale(0.9)';
                requestDemoControlsImage[1].classList.remove('active');

                requestDemoControlsImage[2].style.opacity = '0';
                requestDemoControlsImage[2].style.transform = 'translateY(50%) scale(0.9)';
                requestDemoControlsImage[2].classList.remove('active');
            }

            // *** on iphone click
            else if (i == '1') {
                // current
                requestDemoControlsImage[1].style.opacity = '1';
                requestDemoControlsImage[1].style.transform = 'none';
                requestDemoControlsImage[1].classList.add('active');
                
                requestDemoControlWrap.classList.remove('isLaptop');
                requestDemoControlWrap.classList.remove('isTablet');
                requestDemoControlWrap.classList.add('isPhone');

                // rest
                requestDemoControlsImage[0].style.opacity = '0';
                requestDemoControlsImage[0].style.transform = 'rotate(-10deg) translateX(-75%) scale(0.9)';
                requestDemoControlsImage[0].classList.remove('active');

                requestDemoControlsImage[2].style.opacity = '0';
                requestDemoControlsImage[2].style.transform = 'rotate(19deg) translateX(10%) scale(0.9)';
                requestDemoControlsImage[2].classList.remove('active');
            }

            // *** on ipad click
            else if (i == '2') {
                // current
                requestDemoControlsImage[2].style.opacity = '1';
                requestDemoControlsImage[2].style.transform = 'none';
                requestDemoControlsImage[2].classList.add('active');
                
                requestDemoControlWrap.classList.remove('isPhone');
                requestDemoControlWrap.classList.remove('isLaptop');
                requestDemoControlWrap.classList.add('isTablet');

                // rest
                requestDemoControlsImage[0].style.opacity = '0';
                requestDemoControlsImage[0].style.transform = 'rotate(-10deg) translateX(-75%) scale(0.9)';
                requestDemoControlsImage[0].classList.remove('active');

                requestDemoControlsImage[1].style.opacity = '0';
                requestDemoControlsImage[1].style.transform = 'rotate(-19deg) translateX(-35%) scale(0.9)';
                requestDemoControlsImage[1].classList.remove('active');
            }          

            
        } catch(err) {
            console.warn(err);
        }
    }

});
