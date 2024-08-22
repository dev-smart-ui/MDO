import {store} from "./data-store.js";
import {
    addedBgScroll,
    calculateTotalCost,
    changePackageSelect,
    determineDefaultState,
    dropdownTogglePanel,
    findSegmentById,
    getAvailableServices,
    getServicesFromSelectedSegments,
    openModalModule,
    resetForm,
    showModulePanel,
    updateShadows,
} from "./helpers-presentation.js";
import {licencesSelect, optionsPackageSelect} from "./request-invoice.js";
import {validateForm} from "./validation-form-presentation.js";


let stepFormState = {
    // page 1
    selectedSegmentNames: [],

    // page 2
    suggestedServices: [],
    availableServices: [],
    defaultService: '',


    //page3
    isChangedDefaultState: false,
    currentPackageSelected: '',
    currentLicencesSelected: '',
    regionsArr: ["Global"],
    totalCost: 0,


    // page 4
    userDetails: {
        fistName: '',
    }
};

function buildSubscriptionModulesPanel() {
    const checkedServices = [];

    stepFormState.suggestedServices.forEach(service => {
        if (service.checked) {
            checkedServices.push(service);
        }
    });

    stepFormState.availableServices.forEach(service => {
        if (service.checked) {
            checkedServices.push(service);
        }
    });

    let subscriptionModulesPanelHtml = '';

    for (const service of checkedServices) {
        let tabsHtml = "";
        // Iterate over serviceTabs and concatenate their titles
        service.serviceTabs.forEach(item => {
            tabsHtml += `
                            <li class="dropdown-item">${item.title}</li>
                      `;
        });

        subscriptionModulesPanelHtml += `
                                     <div class="dropdown-box closing" data-tab-item="${service.name}">
                                          <div class="toggle-container">
                                                <button class="dropdown-toggle">
                                                <div class="module-info flex w-full items-center justify-start">
                                                            <img src="${service.iconImg}" alt="${service.name}">
                                                            <span>${service.name}</span>
                                                        </div>
                                                        <label class="custom-checkbox-label pointer-events-none checkbox-label-toggle">
                                                             <span class="module-price">$${service.price.toFixed(2)}</span>
                                                              <span class="checkmark"></span>
                                                            </label>
                                                </button>
                                                <div class="dropdown-toggle-arrow">
                                                     <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13 1L7 7L1 0.999999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                      </svg>

                                                </div>
                                          </div>
                                          <ul class="dropdown-menu">
                                          ${tabsHtml}
                                          </ul>
                                    </div> `;
    }

    $('#currentBoxModules').html(subscriptionModulesPanelHtml);
    $('#subscriptionTotalMobileTitle').text(stepFormState.currentPackageSelected);
    $('#subscriptionModulesTitle').text(stepFormState.currentPackageSelected);
    dropdownTogglePanel("#currentBoxModules");
    showModulePanel("Research Package", "", "currentBoxModules",);

}

function buildLeftPanel(accordionPanelId, presentationMenuId, isAddedCheckboxes, slideId) {
    let selectedSegments = [];

    for (let segmentName of stepFormState.selectedSegmentNames) {
        let segment = findSegmentById(store.targetSegments, segmentName);
        if (segment) {
            selectedSegments.push(segment);
        }
    }


    if (!stepFormState.isChangedDefaultState) {
        let suggestedServices;
        suggestedServices = getServicesFromSelectedSegments(selectedSegments, store.allServices, stepFormState.currentPackageSelected);
        stepFormState.suggestedServices = suggestedServices;
        stepFormState.availableServices = getAvailableServices(store.allServices, suggestedServices, stepFormState.currentPackageSelected);
    }

    stepFormState.defaultService = determineDefaultState(store.targetSegments, store.allServices, stepFormState.selectedSegmentNames);


    let suggestedModuleItemsHtml = '';
    for (const module of stepFormState.suggestedServices) {
        const elemClass = 'presentation-modules-item ' + ' flex items-center w-full justify-start';

        if (isAddedCheckboxes) {
            suggestedModuleItemsHtml += `
                                                <div class="${elemClass} justify-between">
                                                        <div class="module-info flex  items-center justify-start" data-mobile-modal-open data-tab-modules-item="${module.name}">
                                                            <img src="${module.iconImg}" alt="${module.name}">
                                                            <span>${module.name}</span>
                                                        </div>
                                                        <label data-animate-fade-in  class="custom-checkbox-label animate__animated animate__fadeInShowOwn animate__fadeOutDisappear ${module.name === "Research Package" && "pointer-events-none"} ${module.checked && "checkbox-label-toggle"}" data-checkbox-label-id="${module.name}">
                                                             <span class="module-price">$${module.price.toFixed(2)}</span>
                                                              <span class="checkmark"></span>
                                                            </label>
                                                    </div>
                                            `;
        } else {

            suggestedModuleItemsHtml += `
                                            <div class="${elemClass}" data-mobile-modal-open data-tab-modules-item="${module.name}">
                                              <img src="${module.iconImg}" alt="${module.name}">
                                              <span class="presentation-modules-item-text">${module.name}</span>
                                            </div>
                                            `;
        }

    }


    let otherAvailableModuleItemsHtml = '';
    for (const module of stepFormState.availableServices) {
        const elemClass = 'presentation-modules-item ' + ' flex items-center ';
        if (isAddedCheckboxes) {
            otherAvailableModuleItemsHtml += `
                                            <div class="${elemClass} justify-between">
                                                        <div class="module-info flex  items-center justify-start" data-mobile-modal-open data-tab-modules-item="${module.name}">
                                                            <img src="${module.iconImg}" alt="${module.name}">
                                                            <span>${module.name}</span>
                                                        </div>
                                                        <label data-animate-fade-in class="custom-checkbox-label animate__animated animate__fadeInShowOwn animate__fadeOutDisappear ${module.checked && "checkbox-label-toggle"}" data-checkbox-label-id="${module.name}">
                                                             <span class="module-price">$${module.price.toFixed(2)}</span>
                                                              <span class="checkmark"></span>
                                                            </label>
                                                    </div>
                                            `;
        } else {
            otherAvailableModuleItemsHtml += `
                                            <div class="presentation-modules-item flex items-center w-full justify-start" data-mobile-modal-open data-tab-modules-item="${module.name}">
                                              <img src="${module.iconImg}" alt="${module.name}">
                                              <span class="presentation-modules-item-text">${module.name}</span>
                                            </div>
                                            `;
        }

    }

    let suggestedModulesHtml = '';
    suggestedModulesHtml = `<div class="presentation-menu-box" data-section-scroll=${presentationMenuId.slice(-1)}>
                                                      <h5>Suggested Modules</h5>
                                                      <div class="presentation-modules">
                                                        ${suggestedModuleItemsHtml}
                                                      </div>
                                                      <h5>Other Available Modules</h5>
                                                      <div class="presentation-modules">
                                                        ${otherAvailableModuleItemsHtml}
                                                      </div>
                                                </div>
                                             `;

    $('.presentation-menu').html(suggestedModulesHtml);
    openModalModule(slideId);

    if (isAddedCheckboxes) {

        const checkboxLabelsId = document.querySelectorAll('[data-checkbox-label-id]');
        checkboxLabelsId.forEach(checkboxLabel => {
            checkboxLabel.addEventListener('click', () => {
                checkboxLabel.classList.toggle("checkbox-label-toggle");
                const currentModule = checkboxLabel.getAttribute("data-checkbox-label-id");
                handleCheckboxChange(currentModule);
            });
        });


        function handleCheckboxChange(moduleName) {
            stepFormState.isChangedDefaultState = true;

            const module = stepFormState.suggestedServices.find(service => service.name === moduleName) ||
                stepFormState.availableServices.find(service => service.name === moduleName);

            if (module) {
                module.checked = !module.checked;
                calculateTotalCost(stepFormState);
                changePackageSelect(stepFormState);

            }

        }
    }


    calculateTotalCost(stepFormState);
    showModulePanel(stepFormState.defaultService, presentationMenuId, accordionPanelId);
    addedBgScroll();
}


function buildRightPanel(currentService, accordionPanelId, presentationMenuId, slideId, isFirstDefaultOpen) {
    let commonInfoServiceHtml = '';
    let videoInfoServiceHtml = '';
    let titleMobile = '';
    const isMobile = window.innerWidth < 1024;

    for (const availableService of store.allServices) {
        if (availableService.name === currentService) {
            titleMobile=`${availableService.name}`
            commonInfoServiceHtml += `
                                        <div class="package-info--img relative">
                                            <img src=${availableService.img} alt=${availableService.name}>
                                            <button data-video-btn id="videoBtn" type="button" class="package-info--video-btn">
                                                 <img src="./src/images/presentation/request-invoice/play_arrow.svg" alt="play_arrow"/>
                                                 <span>info</span>
                                            </button>
                                        </div>
                                        <h3 class="package-info-descktop-title hidden lg:block">${availableService.name}</h3>
                                        <p>${availableService.overviewDescription}</p>

					                    `;
            videoInfoServiceHtml += `
                                         <h2 class="modal-demo-content-title">${availableService.name}</h2>
                                        <iframe src="${availableService.video}"
                                                 title="YouTube video player" frameborder="0"
                                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                 referrerpolicy="strict-origin-when-cross-origin"
                                                 allowfullscreen></iframe> `;

        }
    }

    $('.package-info-mobile-title').text(titleMobile);
    $('.package-info').html(commonInfoServiceHtml);
    $('#modalVideoContent').html(videoInfoServiceHtml);

    if (isMobile) {
        const titleH = $('.package-info-mobile-title').outerHeight(true);
        $('.package-info-inner-wrapper').css('height', `calc(100% - ${titleH}px - 43px)`);
    }

    $("[data-video-btn]").click(function () {
        $("#modalVideo").css("display", "flex").hide().fadeIn(800);
        document.querySelector("header").classList.add('header-hide');
        $("#bgOpacityInner").addClass("bg-opacity-inner-open backdrop-blur-sm");
    });


    let suggestedModuleItemsHtml = '';
    for (const module of store.allServices) {
        if (module.name === currentService) {
            module.serviceTabs.forEach((item, index) => {
                    if (item.info) {
                        suggestedModuleItemsHtml += `
                                     <div class="dropdown-box" data-tab-item="${module.name}">
                                          <div class="toggle-container">
                                                <button class="dropdown-toggle">${item.title}</button>
                                                <div class="dropdown-toggle-arrow">
                                                     <svg width="6" height="12" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13 1L7 7L1 0.999999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                </div>
                                          </div>
                                          <div class="${index === 0 && isFirstDefaultOpen ? 'dropdown-menu-container' : ''}" >
                                            ${item.info}
                                            </div>
                                         
                                    </div> `;
                    } else {
                        suggestedModuleItemsHtml += `
                                     <div class="dropdown-box" data-tab-item="${module.name}">
                                          <div class="toggle-container cursor-default">
                                                <button class="dropdown-toggle">${item.title}</button>
                                          </div>
                                         
                                    </div> `;
                    }
            });

        }
    }
    $(`#${accordionPanelId}`).html(suggestedModuleItemsHtml);
    dropdownTogglePanel(`#${slideId} .package-info-inner-wrapper`);
    showModulePanel(stepFormState.defaultService, presentationMenuId, accordionPanelId);
    addedBgScroll();
}

function togglePresentationMenuItem(accordionPanelId, presentationMenuId, slideId, mobileShadowBox) {
    // Add handler for items inside dropdown

    const iiDesktop = window.innerWidth > 1025;

    const numberOfAcc = String(slideId.slice(-1));
    const dropdownTabs =Array.from(document.querySelectorAll(`#${slideId} [data-tab-modules-item]`));
    const scrollWrap = iiDesktop ? document.querySelector(`[data-section-scroll-class="acc${numberOfAcc}"]`) : document.querySelector(`[data-section-scroll-class="${mobileShadowBox}"]`);
    const scrollElement = iiDesktop ? document.querySelector(`[data-section-scroll="acc${numberOfAcc}"]`) : document.querySelector(`[data-section-scroll="${mobileShadowBox}"]`);


    dropdownTabs.forEach((dropdownTab, index) => {
        dropdownTab.addEventListener('click', (event) => {
            if (event.isTrusted) {
                // Remove 'presentation-modules-item-active' class from all elements
                const scrolls = document.querySelectorAll('.scrolled');
                const activeItems = document.querySelectorAll('.presentation-modules-item-active');
                activeItems.forEach(item => item.classList.remove('presentation-modules-item-active'));
                scrolls.forEach(item => item.classList.remove('scrolled'));

                // Add the 'presentation-modules-item-active' class to the clicked item
                const currentItem = dropdownTab.getAttribute("data-tab-modules-item");
                dropdownTab.classList.add('presentation-modules-item-active');

                buildRightPanel(currentItem, accordionPanelId, presentationMenuId, slideId);
                showModulePanel(currentItem, presentationMenuId, accordionPanelId);


                setTimeout(() => {
                    updateShadows(scrollElement, scrollWrap);
                }, 500);
            }

        });
    });
}


$(document).ready(function () {


    const getStarted = document.getElementById("getStarted");
    const segmentItemsList = document.querySelectorAll("[data-segment-item]");
    const btnSegmentsNext = document.getElementById("btnSegmentsNext");
    const requestInvoiceBtns = document.querySelectorAll("[data-request-invoice]");
    const requestInvoiceSubscriptionBtns = document.querySelectorAll("[data-request-invoice-subscription]");
    const requestInvoiceSuccessfulBts = document.querySelectorAll("[data-request-invoice-successful]");
    const modalSuccessfulClose = document.getElementById("modalSuccessfulClose");

    stepFormState.currentPackageSelected = optionsPackageSelect.getValue().value;
    stepFormState.currentLicencesSelected = licencesSelect.getValue().value;


    segmentItemsList.forEach((segmentItem, index) => {
        segmentItem.addEventListener('click', () => {
            segmentItem.classList.toggle("swiper-slide-checked");

            const allCheckedSegments = document.querySelectorAll('.swiper-slide-checked');

            if (allCheckedSegments.length > 0) {
                $('#btnSegmentsNext').removeAttr('disabled');
            } else {
                $('#btnSegmentsNext').attr('disabled', 'disabled');
            }

            const selectedEl = segmentItem.getAttribute("data-segment");

            const selectedIndex = stepFormState.selectedSegmentNames.indexOf(selectedEl);
            if (selectedIndex === -1) {
                stepFormState.selectedSegmentNames.push(selectedEl);
            } else {
                stepFormState.selectedSegmentNames.splice(selectedIndex, 1);
            }
        });
    });


    const addedCheckboxes = true;
    const noAddedCheckboxes = false;
    const sectionBackBtns = document.querySelectorAll('[data-section-back-btn]');
    const isFirstDefaultOpen = true;

    sectionBackBtns.forEach((sectionBackBtn, index) => {
        const adjustedIndex = index + 1;
        sectionBackBtn.addEventListener('click', () => {
            const isDefaultSegment = determineDefaultState(store.targetSegments, store.allServices, stepFormState.selectedSegmentNames);

            //for add checkboxes

            if (adjustedIndex === 3) {
                if (window.innerWidth > 1025) {
                    //for desktop
                    const animateFadeIn = document.querySelectorAll('[data-animate-fade-in]');
                    animateFadeIn.forEach(animateFadeInItem => {
                        animateFadeInItem.classList.remove("animate__fadeInShowOwn");
                    });
                    //setTimeout for animation of labels checkboxes
                    setTimeout(() => {
                        buildLeftPanel(`accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, noAddedCheckboxes, `slide${adjustedIndex}`);
                        togglePresentationMenuItem(`accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, `slide${adjustedIndex}`);
                    }, 700);
                    //
                } else {
                    buildLeftPanel(`accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, noAddedCheckboxes, `slide${adjustedIndex}`);
                }

                togglePresentationMenuItem(`accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, `slide${adjustedIndex}`);
                buildRightPanel(isDefaultSegment, `accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, `slide${adjustedIndex}`, isFirstDefaultOpen);

            }

            //for add checkboxes
            if (adjustedIndex === 4) {
                buildLeftPanel(`accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, addedCheckboxes, `slide${adjustedIndex}`);
                buildRightPanel(isDefaultSegment, `accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, `slide${adjustedIndex}`);
                togglePresentationMenuItem(`accordionPanelSlide${adjustedIndex}`, `presentationMenuSlide${adjustedIndex}`, `slide${adjustedIndex}`);
            }
        });

    });


    //go yo slide 2

    getStarted.addEventListener("click", ()=>{
        //for add bottom bg shadow
        const scrollWrapSegments = document.querySelector(` [data-section-scroll-class="2"]`);
        const scrollElementSegments = document.querySelector("[data-section-scroll='2']");

        updateShadows(scrollElementSegments,scrollWrapSegments )
    })

    //go to slide3
    btnSegmentsNext.addEventListener('click', () => {
        const mobileShadowBox = "6";
        const isDefaultSegment = determineDefaultState(store.targetSegments, store.allServices, stepFormState.selectedSegmentNames);
        buildLeftPanel("accordionPanelSlide3", "presentationMenuSlide3", noAddedCheckboxes, "slide3");
        buildRightPanel(isDefaultSegment, "accordionPanelSlide3", "presentationMenuSlide3","slide3" );
        togglePresentationMenuItem("accordionPanelSlide3", "presentationMenuSlide3", "slide3", mobileShadowBox);


        //for add bottom bg shadow
        const scrollWrap = document.querySelector(` [data-section-scroll-class="acc3"]`);
        const scrollElement = document.querySelector("[data-section-scroll='acc3']");

        setTimeout(() => {
            updateShadows(scrollElement, scrollWrap);
        }, 400);

    });

    //go to slide4

    requestInvoiceBtns.forEach(requestInvoiceBtn => {
        requestInvoiceBtn.addEventListener('click', () => {
            const mobileShadowBox = "7";
            const isDefaultSegment = determineDefaultState(store.targetSegments, store.allServices, stepFormState.selectedSegmentNames);

            if (window.innerWidth < 1025) {
                //setTimeout for animation of labels checkboxes
                setTimeout(() => {
                    buildLeftPanel("accordionPanelSlide4", "presentationMenuSlide4", addedCheckboxes, "slide4");
                    togglePresentationMenuItem("accordionPanelSlide4", "presentationMenuSlide4", "slide4", mobileShadowBox);
                }, 500);
                //
            } else {
                buildLeftPanel("accordionPanelSlide4", "presentationMenuSlide4", addedCheckboxes, "slide4");
                togglePresentationMenuItem("accordionPanelSlide4", "presentationMenuSlide4", "slide4", mobileShadowBox);
            }


            buildRightPanel(isDefaultSegment, "accordionPanelSlide4", "presentationMenuSlide4","slide4", isFirstDefaultOpen);


            //for add bottom bg shadow
            const scrollWrap = document.querySelector(` [data-section-scroll-class="acc4"]`);
            const scrollElement = document.querySelector("[data-section-scroll='acc4']");


            setTimeout(() => {
                updateShadows(scrollElement, scrollWrap);
            }, 500);


        });
    });

    //go to slide5
    requestInvoiceSubscriptionBtns.forEach(requestInvoiceSubscription => {
        requestInvoiceSubscription.addEventListener('click', () => {
            buildSubscriptionModulesPanel();

            //for add bottom bg shadow
            const scrollWraps = document.querySelectorAll(`#slide5 [data-section-scroll-class]`);
            const scrollElements = document.querySelectorAll("#slide5 [data-section-scroll]");

            scrollWraps.forEach((scrollWrap, index)=>{
                setTimeout(() => {
                    updateShadows(scrollElements[index], scrollWrap);
                }, 500);
            })

        });
    });


    //finish step

    requestInvoiceSuccessfulBts.forEach(requestInvoiceSuccessful => {
        requestInvoiceSuccessful.addEventListener('click', () => {
            const isValidForm = validateForm();
            if (!isValidForm) {
                return;
            } else {
                $("#modalSuccessful").css("display", "flex").hide().fadeIn(500);
                $(".modal-successful-content").addClass("modal-successful-content-show");
            }
        });
    });


    //reset
    modalSuccessfulClose.addEventListener('click', () => {
        resetForm();
    });


});

export {stepFormState, buildLeftPanel};

