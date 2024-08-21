import {stepFormState} from "./packages-modules.js";
import {licencesSelect, optionsPackageSelect} from "./request-invoice.js";
import {clearContactInputs, resetFormElements, validateContactForm, validateEmailContact} from "./validation-form-presentation.js";
import {pageSlider} from "./sliders.js";

//determine segments and modules
function findSegmentById(segments, name) {
    return segments.find(s => s.name === name);
}


function getServicesFromSelectedSegments(segments, allServices, currentPackage) {
    let result = [];
    let seenNames = new Set();


    let selectedServices = new Set();
    segments.forEach(segment => {
        segment.services.forEach(serviceName => {
            selectedServices.add(serviceName);
        });
    });

    allServices.forEach(serviceItem => {
        if (selectedServices.has(serviceItem.name) && !seenNames.has(serviceItem.name)) {
            seenNames.add(serviceItem.name);

            let isChecked = currentPackage === "Custom Package" || currentPackage === "Ultimate Package" || (currentPackage === "Research Package" && serviceItem.name === "Research Package");
            result.push(createServiceItem(serviceItem, isChecked));
        }
    });

    return result;
}


function getAvailableServices(allServices, suggestedServices, currentPackage) {
    let result = [];
    const suggestedServicesNames = new Set(suggestedServices.map(service => service.name));
    allServices.forEach(service => {
        if (!suggestedServicesNames.has(service.name)) {
            result.push(createServiceItem(service, currentPackage === "Ultimate Package"));
        }
    });
    return result;
}

function createServiceItem(service, checked) {
    return {
        name: service.name,
        price: service.price,
        iconImg: service.iconImg,
        img: service.img,
        overviewDescription: service.overviewDescription,
        checked: checked,
        serviceTabs: service.serviceTabs,
        video: service.video
    };
}


function determineDefaultState(allTargetSegments, allServices, chooseSegments) {
    let result = '';
    for (let allTargetSegment of allTargetSegments) {
        if (chooseSegments.length > 1) {
            if (allTargetSegment.name === chooseSegments[0]) {
                result = allTargetSegment.defaultSelected;
                return result;
            }

        }

        if (chooseSegments.includes(allTargetSegment.name)) {
            result = allTargetSegment.defaultSelected;
            return result;
        }
    }


}

//

//show modals

$(document).ready(function () {
    $("#packageSelectInfo").click(function () {
        $("#modalPackageSelectInfoText").css("display", "flex").hide().fadeIn(500);
        $("#bgOpacityInner").addClass("bg-opacity-inner-open backdrop-blur-sm");
    });

    function closeModal() {
        $("#modalPackageSelectInfoText").fadeOut(500, function () {
            $(this).css("display", "none");
        });

        $("#bgOpacityInner").removeClass("bg-opacity-inner-open backdrop-blur-sm");
    }

    $(".modal-select-info-close").click(function () {
        closeModal();
    });


    $(window).click(function (event) {
        if ($(event.target).hasClass('modal-select-info-text')) {
            closeModal();
        }
    });
});

$(document).ready(function () {
    function closeModal() {
        $("#modalSuccessful").fadeOut(500, function () {
            $(this).css("display", "none");
            $(".modal-successful-content").removeClass("modal-successful-content-show");
        });
    }

    $(".modal-successful-close").click(function () {
        closeModal();
    });


    $(window).click(function (event) {
        if ($(event.target).hasClass('modal-successful')) {
            closeModal();
        }
    });
});
$(document).ready(function () {
    $("[data-request-demo]").click(function () {
        $("#modalDemo").css("display", "flex").hide().fadeIn(500);
        $("#bgOpacityInner").addClass("bg-opacity-inner-open backdrop-blur-sm");
    });

    function closeModal() {
        $("#modalDemo").fadeOut(500, function () {
            $(this).css("display", "none");
            $("#bgOpacityInner").removeClass("bg-opacity-inner-open backdrop-blur-sm");
        });
    }

    $(".modal-demo-content-close").click(function () {
        closeModal();
    });

    $("#sendMessageBtn").click(function () {
        const isValidForm = validateContactForm();
        const isValidEmail = validateEmailContact();

        if (isValidForm && isValidEmail) {
            clearContactInputs();
            closeModal();
            pageSlider.slideTo(0);
            resetForm();
        }
    });

    $(window).click(function (event) {
        if ($(event.target).hasClass('modal-demo')) {
            closeModal();
        }
    });
});

$(document).ready(function () {
    function closeModal() {

        $("#modalVideo").fadeOut(500, function () {
            $(this).css("display", "none");
        });
        $("#bgOpacityInner").removeClass("bg-opacity-inner-open backdrop-blur-sm");


        let $videoIframe = $('#modalVideo iframe');
        let iframeSrc = $videoIframe.attr('src');

        setTimeout(() => {
            $videoIframe.attr('src', '');
            $videoIframe.attr('src', iframeSrc);
        }, 500);

    }

    $(".modal-demo-content-close").click(function () {
        closeModal();
    });


    $(window).click(function (event) {
        if ($(event.target).hasClass('modal-video')) {
            closeModal();
        }
    });
});

$(document).ready(function () {
    $("#termsOfUseOpen").click(function () {
        $("#termsOfUseModal").css("display", "flex").hide().fadeIn(500);
        $("#bgOpacityInner").addClass("bg-opacity-inner-open backdrop-blur-sm");
    });

    function closeModal() {
        $("#termsOfUseModal").fadeOut(500, function () {
            $(this).css("display", "none");
        });
        $("#bgOpacityInner").removeClass("bg-opacity-inner-open backdrop-blur-sm");
    }

    $("#termsOfUseClose").click(function () {
        closeModal();
    });


    $(window).click(function (event) {
        if ($(event.target).hasClass('modal-terms-of-use-box')) {
            closeModal();
        }
    });
});

function changePackageSelect(data) {
    let allChecked = true;
    let isOnlyResearchPackage = true;
    let checkedCount = 0;

    data.suggestedServices.forEach(service => {
        if (service.name === "Research Package") {
            if (!service.checked) {
                isOnlyResearchPackage = false;
            }
        } else {
            if (service.checked) {
                isOnlyResearchPackage = false;
            }
        }

        if (service.checked) {
            checkedCount++;
        } else {
            allChecked = false;
        }
    });


    data.availableServices.forEach(service => {
        if (service.checked) {
            isOnlyResearchPackage = false;
            checkedCount++;
        } else {
            allChecked = false;
        }
    });


    if (isOnlyResearchPackage) {
        optionsPackageSelect.setChoiceByValue('Research Package');
        stepFormState.currentPackageSelected = "Research Package";
        addCustomClassToChoice("Research Package");
    } else if (allChecked) {
        optionsPackageSelect.setChoiceByValue('Ultimate Package');
        stepFormState.currentPackageSelected = "Ultimate Package";
        addCustomClassToChoice("Ultimate Package");
    } else if (checkedCount > 1) {
        optionsPackageSelect.setChoiceByValue('Custom Package');
        stepFormState.currentPackageSelected = "Custom Package";
        addCustomClassToChoice("Custom Package");
    }
}

function addCustomClassToChoice(value) {
    const highlightedEl = document.querySelector('.is-highlighted');
    highlightedEl.classList.remove("is-highlighted");
    const choiceEl = document.querySelector(`.choices__list--dropdown [data-value="${value}"]`);
    if (choiceEl) {
        choiceEl.classList.add('is-highlighted');
    }
}


//

function dropdownTogglePanel(accordionPanelId) {
    const dropdownToggleList = document.querySelectorAll(".toggle-container");
    const isModulesSlide = accordionPanelId === "#currentBoxModules";
    dropdownToggleList.forEach(dropdownToggle => {

        dropdownToggle.addEventListener('click', (event) => {

            const dropDownButton = event.target.closest('.dropdown-toggle') || event.target.closest('.toggle-container') || event.target.closest('.dropdown-toggle-arrow') || event.target.closest('.presentation-modules-item');
            const dropdownBox = dropDownButton.closest('.dropdown-box');
            const allContainers = document.querySelectorAll('.dropdown-menu-container');

            if (dropdownBox) {

                allContainers.forEach(container => {
                    if (container.classList.contains("dropdown-menu-container")) {
                        container.classList.remove("dropdown-menu-container");
                    }
                });


                const root = document.querySelector(`${accordionPanelId}`);
                const headerHeight = document.querySelector('.package-info').clientHeight;

                document.querySelectorAll('.dropdown-box').forEach(box => {
                    const drop = box.querySelector('.dropdown-menu');
                    if (box === dropdownBox) {
                        box.classList.remove('closing');
                        box.classList.add('drop-down-item-open');

                        if (drop) {
                            const dropHeight = drop.scrollHeight;
                            drop.style.maxHeight = `${dropHeight}px`;
                        }

                        setTimeout(() => {
                            if (root.scrollTop > box.offsetTop - 30) { // if the drop is outside of overflow

                                const scrollVal = !isModulesSlide ? root.scrollTop - (root.scrollTop - box.offsetTop - headerHeight) : root.scrollTop - (root.scrollTop - box.offsetTop);
                                root.scrollTo({top: scrollVal, behavior: "smooth"});
                            }
                        }, 400);
                    } else {
                        box.classList.add('closing');

                        drop && drop.removeAttribute('style');
                        setTimeout(() => {
                            box.classList.remove('drop-down-item-open');
                        }, 10);
                    }
                });
            }
        });
    });

}


function showModulePanel(currentTab, presentationMenuId, accordionId) {
    const currentItemForOpenById = currentTab;
    const boxPanel = document.getElementById(`${presentationMenuId}`);
    const currentAccordion = document.getElementById(`${accordionId}`);

    if (currentItemForOpenById) {
        const defaultElement = currentAccordion.querySelector(`[data-tab-item="${currentItemForOpenById}"]`);
        const tabModulesItem = boxPanel && boxPanel.querySelector(`[data-tab-modules-item="${currentItemForOpenById}"]`);
        if (defaultElement) {
            defaultElement.classList.add('drop-down-item-open');

            if (accordionId === "accordionPanelSlide4") {
                tabModulesItem && tabModulesItem.parentNode.classList.add('presentation-modules-item-active');
            } else {
                tabModulesItem && tabModulesItem.classList.add('presentation-modules-item-active');
            }

            const drop = defaultElement.querySelector('.dropdown-menu');
            if (drop) {
                const dropHeight = drop.scrollHeight;
                drop.style.maxHeight = `${dropHeight}px`;
            }
        }
    }
}

function calculateTotalCost(store) {
    let total = 0;
    const licensesValue = store.currentLicencesSelected;
    const isGlobalSelected = store.regionsArr.includes("Global");
    const basePercent = 10; // Percentage for regions and licenses
    let basePriceValue = 0;


    //get basePriceValue
    store.suggestedServices.forEach(service => {
        if (service.checked) {
            basePriceValue += service.price;
        }
    });

    store.availableServices.forEach(service => {
        if (service.checked) {
            basePriceValue += service.price;
        }
    });

    total += basePriceValue;


    const selectedRegionCount = isGlobalSelected ? basePercent : store.regionsArr.length;
    const additionalRegionCost = selectedRegionCount * basePercent / 100 * basePriceValue;
    total += additionalRegionCost;

    const licenceFormatted = parseInt(licensesValue);
    const licensesCount = licenceFormatted > 1 ? licenceFormatted - 1 : 0;
    const additionalLicenseCost = licensesCount * basePercent / 100 * basePriceValue;

    total += additionalLicenseCost;

    store.totalCost = total;
    updateTotalCount(stepFormState);
}

function updateTotalCount(store) {
    const allTotalCounters = document.querySelectorAll('[data-total-counter-box]');
    allTotalCounters.forEach(totalCounter => {
        totalCounter.innerText = store.totalCost;
    });
}

function resetRegions() {

    const selectedItems = document.getElementById('selectedItemsPresentation');
    selectedItems.textContent = 'Global';

    const checkboxes = document.querySelectorAll('[data-regions-input]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentNode.classList.remove("choose");
    });

    const globalCheckbox = document.querySelector('input[name="Global"]');
    if (globalCheckbox) {
        globalCheckbox.checked = true;
        globalCheckbox.parentNode.classList.add("choose");
    }
}

function resetForm() {
    const additionalTextOptionsSelect = document.getElementById("additionalTextOptionsSelect");

    const comprehensiveSlideItems = document.querySelectorAll('.comprehensive-slide-item');
    // Reset form and formData for demonstration purposes

    //remove all styles & logic of segments oj 2 slide

    comprehensiveSlideItems.forEach(contentSegment => {
        const hiddenContentBox = contentSegment.querySelector(".hidden-content");
        const titleSegment = contentSegment.querySelector('.comprehensive-slide-item-top-title-box');
        hiddenContentBox.style.top = "";
        contentSegment.setAttribute('data-is-fixed', "false");

        hiddenContentBox.classList.remove("animate__bounceInUpOwn", "animate__bounceInDownOwn");
        titleSegment.classList.remove("animate__bounceInUpTitleOwn", "animate__bounceInDownTitleOwn");
    });

    clearObject(stepFormState);
    optionsPackageSelect.setChoiceByValue('Custom Package');
    stepFormState.currentPackageSelected = "Custom Package";
    addCustomClassToChoice("Custom Package");
    licencesSelect.setChoiceByValue('1');
    resetRegions();
    additionalTextOptionsSelect.innerHTML = "";
    resetFormElements();
    clearSegmentsList();

}

function clearObject(obj) {
    obj.selectedSegmentNames = [];
    obj.suggestedServices = [];
    obj.availableServices = [];
    obj.regionsArr = ["Global"];
    obj.defaultService = '';
    obj.currentPackageSelected = '';
    obj.currentLicencesSelected = '';
    obj.totalCost = 0;
    obj.isChangedDefaultState = false;
}

function clearSegmentsList() {
    const segmentItemsList = document.querySelectorAll("[data-segment-item]");
    segmentItemsList.forEach((segmentItem, index) => {
        if (segmentItem.classList.contains("swiper-slide-checked")) {
            segmentItem.classList.remove("swiper-slide-checked");
        }
    });

    $('#btnSegmentsNext').attr('disabled', 'disabled');
}

function animateCounter(element, endValue) {
    let startValue = 0;
    let startTime = null;
    const duration = 1500; // Total animation duration for all counters
    const increment = endValue / (60 * (duration / 1000)); // Calculate the step so that it depends on the final value

    const step = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
        element.textContent = currentValue;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = endValue;
        }
    };

    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const endValue = parseInt(counter.getAttribute('data-counter'), 10);
        animateCounter(counter, endValue);
    });
});

function openModalModule(slideId) {
    const packageContainerWrap = document.querySelector(`#${slideId} [data-package-container-wrap]`);
    const bgOpacityInner = document.getElementById('bgOpacityInner');
    const dropdownTabs = document.querySelectorAll(`#${slideId} [data-mobile-modal-open]`);


    dropdownTabs.forEach(dropdownTab => {
        dropdownTab.addEventListener('click', (event) => {

            if (event.isTrusted) {
                packageContainerWrap.classList.add('package-container-wrap-open');

                let screenWidth = $(window).width();
                if (screenWidth <= 1024) {
                    bgOpacityInner.classList.add('bg-opacity-inner-open');
                    document.querySelector("header").classList.add('header-hide');
                }
            }

        });
    });
}


document.addEventListener("click", () => {
    const packageModalCloseBtns = document.querySelectorAll("[data-package-modal-close]");
    const bgOpacityInner = document.getElementById("bgOpacityInner");
    const packageContainerWraps = document.querySelectorAll('[data-package-container-wrap]');
    const subscriptionModalInfo = document.getElementById("subscriptionModalInfo");


    packageModalCloseBtns.forEach(packageModalClose => {
        packageModalClose.addEventListener("click", () => {
            const openDDList = document.querySelectorAll(".drop-down-item-open");
            openDDList.forEach(openItem => {
                const dropdownMenu = openItem.querySelector(".dropdown-menu");
                if (dropdownMenu) {
                    dropdownMenu.style.maxHeight = "0";
                }

                openItem.classList.remove("drop-down-item-open");

            });


            packageContainerWraps.forEach(packageContainerWrap => {
                packageContainerWrap.classList.remove('package-container-wrap-open');
                document.querySelector("header").classList.remove('header-hide');
                packageContainerWrap.classList.remove('subscription-step-box-open');
                subscriptionModalInfo.classList.remove('subscription-modal-open');
            });

            bgOpacityInner.classList.remove('bg-opacity-inner-open');
            document.querySelector("header").classList.remove('header-hide');
        });
    });

});


document.addEventListener("DOMContentLoaded", () => {
    const subscriptionModalInfo = document.getElementById("subscriptionModalInfo");
    //for add bottom bg shadow
    const scrollWrap = document.querySelector(` [data-section-scroll-class="acc5"]`);
    const scrollElement = document.querySelector("[data-section-scroll='acc5']");

    subscriptionModalInfo.addEventListener("click", () => {
        const packageContainerWrap = document.querySelector(`#slide5 .subscription-step-box`);
        const bgOpacityInner = document.getElementById('bgOpacityInner');

        subscriptionModalInfo.classList.add('subscription-modal-open');
        setTimeout(() => {
            packageContainerWrap.classList.add('subscription-step-box-open');
            document.querySelector("header").classList.add('header-hide');
            bgOpacityInner.classList.add('bg-opacity-inner-open');
            showModulePanel("Research Package", "", "currentBoxModules",);
        }, 200);


//for add bottom bg shadow
        setTimeout(() => {
            updateShadows(scrollElement, scrollWrap);
        }, 500);

    });
});

document.addEventListener("DOMContentLoaded", () => {
    addedBgScroll();
});


function addedBgScroll() {
    const scrollSections = document.querySelectorAll("[data-section-scroll]");
    const scrollWrapsMap = new Map();
    let isMobile = /Mobi|Android/i.test(navigator.userAgent);
    //for remove down shadow
    const  wrap=document.getElementById('presentationMenuSlide3')

    document.querySelectorAll("[data-section-scroll-class]").forEach(wrap => {
        scrollWrapsMap.set(wrap.getAttribute("data-section-scroll-class"), wrap);
    });



    scrollSections.forEach(scrollElement => {
        const currentEvent=isMobile? "scroll":"wheel"


        scrollElement.addEventListener(currentEvent, () => {
            updateShadows(scrollElement, scrollWrapsMap.get(scrollElement.getAttribute("data-section-scroll")));
            wrap.classList.remove('scrolled-bottom-remove');
        });

     /*   updateShadows(scrollElement, scrollWrapsMap.get(scrollElement.getAttribute("data-section-scroll")));*/
    });
}


function updateShadows(scrollElement, scrollWrap) {
    if (!scrollWrap || !scrollElement ) return;

    if (scrollElement.scrollTop > 1) {
        scrollWrap.classList.add('scrolled-top');
        scrollWrap.classList.add('scrolled');
    } else {
        if (scrollWrap.classList.contains('scrolled-top')) {
            scrollWrap.classList.remove('scrolled-top');
        }
    }

    // Use setTimeout to give the browser time to finish updating the DOM
    setTimeout(() => {
        const scrollBottomPosition = Math.ceil(scrollElement.scrollTop + scrollElement.clientHeight);
        const scrollHeight = Math.floor(scrollElement.scrollHeight);
        const isScrolledToBottom = scrollBottomPosition >= scrollHeight;


        if (scrollElement.scrollHeight > scrollElement.clientHeight) {
            if (!isScrolledToBottom) {
                scrollWrap.classList.add('scrolled-bottom');
            } else {
                scrollWrap.classList.remove('scrolled-bottom');
                scrollWrap.classList.remove('scrolled');
            }
        } else {
            if(scrollWrap.classList.contains('scrolled-bottom')) scrollWrap.classList.remove('scrolled-bottom');
        }
    }, 150);
}

document.addEventListener('DOMContentLoaded', addedBgScroll);


document.addEventListener('DOMContentLoaded', () => {
    determinePositionForAnimationSegments();
});


window.addEventListener('resize', () => {
    determinePositionForAnimationSegments();
});

 function determinePositionForAnimationSegments() {
    const comprehensiveSlideItems = document.querySelectorAll('.comprehensive-slide-item');
    let isMobile = /Mobi|Android/i.test(navigator.userAgent);


    comprehensiveSlideItems.forEach((comprehensiveSlideItem) => {
        const titleSegment = comprehensiveSlideItem.querySelector('.comprehensive-slide-item-top-title-box');
        const titleSegmentHeight = titleSegment.getBoundingClientRect().height;
        const hiddenContentBox = comprehensiveSlideItem.querySelector('.hidden-content');

        let isFixed = comprehensiveSlideItem.getAttribute('data-is-fixed') === 'true';
        let isOnElement = false;

        const showHiddenContent = () => {

            hiddenContentBox.classList.remove("animate__bounceInDownOwn");
            titleSegment.classList.remove("animate__bounceInDownTitleOwn");

            hiddenContentBox.classList.add("animate__bounceInUpOwn");
            titleSegment.classList.add("animate__bounceInUpTitleOwn");
            hiddenContentBox.style.top = `${titleSegmentHeight}px`;

            if (!isMobile) {
                hiddenContentBox.style.opacity = '1';
            }

        };

        const hideHiddenContent = () => {

            hiddenContentBox.classList.remove("animate__bounceInUpOwn");
            titleSegment.classList.remove("animate__bounceInUpTitleOwn");

            hiddenContentBox.classList.add("animate__bounceInDownOwn");
            titleSegment.classList.add("animate__bounceInDownTitleOwn");

            hiddenContentBox.style.top = `100%`;

            if (!isMobile) {
                hiddenContentBox.style.opacity = '0';
            }
        };

        if (!isMobile) {
            comprehensiveSlideItem.addEventListener("mouseover", () => {
                isOnElement = true;
                 isFixed = comprehensiveSlideItem.getAttribute('data-is-fixed') === 'true';
                if (!isFixed) {
                    showHiddenContent();
                }
            });

            comprehensiveSlideItem.addEventListener("mouseleave", () => {
                isOnElement = false;

                if (!isFixed) {
                    hideHiddenContent();
                }
            });
        }

        comprehensiveSlideItem.addEventListener("click", () => {
            if (isMobile) {
                if (!isFixed) {
                    showHiddenContent();
                } else {
                    hideHiddenContent();
                }
                isFixed = !isFixed;
                comprehensiveSlideItem.setAttribute('data-is-fixed', isFixed);
            } else {
                if (isFixed) {
                    if (!isOnElement) {

                        hideHiddenContent();
                    }
                } else {

                    showHiddenContent();
                }

                isFixed = !isFixed;
                comprehensiveSlideItem.setAttribute('data-is-fixed', isFixed);
            }
        });
    });
}



/*document.addEventListener("click", (e) => {
    if (e && e.target) {
        console.log(e.target);
    } else {
        console.warn("Event target is not defined");
    }
});*/
export {
    showModulePanel,
    findSegmentById,
    getServicesFromSelectedSegments,
    getAvailableServices,
    determineDefaultState,
    dropdownTogglePanel,
    calculateTotalCost,
    updateTotalCount,
    changePackageSelect,
    resetForm,
    clearSegmentsList,
    openModalModule,
    addedBgScroll,
    updateShadows,
    determinePositionForAnimationSegments,
};
