import {selectedItems} from "./content.js";
import {
    basePercent,
    basePriceValues,
    isGlobalSelected,
    licencesSelect,
    newSumOfPackage,
    regionsIngLength
} from "./step-form.js";
import {clearContactInputs, validateContactForm, validateEmailContact} from "./validation-form.js";

function setupDropdownToggle(element) {
    element.addEventListener('click', (event) => {
        const checkBox = event.target.closest('.check-box-label');
        const dropDownButton = event.target.closest('.dropdown-toggle') || event.target.closest('.toggle-container');


        if (!checkBox && dropDownButton ) {
            const dropdownBox = dropDownButton.closest('.dropdown-box');
            if (dropdownBox) {
                const root = dropdownBox.closest('.optional-content');
                const isSelectedOptionsContainer = !!dropdownBox.closest('#selectedOptionsContainer');
                const isMobile = window.innerWidth < 1024;
                
                document.querySelectorAll('.dropdown-box').forEach(box => {
                    const drop = box.querySelector('.dropdown-menu');

                    if (box === dropdownBox) {
                        box.classList.remove('closing');
                        box.classList.add('drop-down-item-open');

                        const dropHeight = drop.scrollHeight;
                        drop.style.maxHeight = `${dropHeight}px`;
                        
                        setTimeout(() => { 
                            if (root.scrollTop > box.offsetTop - 90) { // if the drop is outside of overflow        
                                const scrollVal = isSelectedOptionsContainer ? 
                                    root.scrollTop - (root.scrollTop - box.offsetTop) - (isMobile ? 60 : 90) : // add a root title height value
                                    root.scrollTop - (root.scrollTop - box.offsetTop);

                                root.scrollTo({ top: scrollVal, behavior: "smooth" });                                
                            }
                         }, 400);                        
                    } else {
                        box.classList.add('closing');
                        drop.removeAttribute('style');
                        setTimeout(() => {
                            box.classList.remove('drop-down-item-open');
                        }, 10);
                    }
                });
            }
        }
    });
}

function calculateTotal(currentPackageSelect) {
    let total = 0;
    const licensesValue = licencesSelect.getValue()?.value;

    if (currentPackageSelect) {
        const basePrice = basePriceValues[currentPackageSelect];
        total += basePrice;
        if (currentPackageSelect === "customPackage") {
            let newBaseCustomPercent = total;
            Object.keys(selectedItems).forEach(key => {
                newBaseCustomPercent += selectedItems[key].price;
            });

            total = newBaseCustomPercent;

            const selectedRegionCount = isGlobalSelected ? 10 : regionsIngLength;
            const additionalRegionCost = selectedRegionCount * basePercent / 100 * newBaseCustomPercent;
            total += additionalRegionCost;

            const licenceFormatted = parseInt(licensesValue);
            const licensesCount = licenceFormatted > 1 ? licenceFormatted - 1 : 0;
            const additionalLicenseCost = licensesCount * basePercent / 100 * newBaseCustomPercent;

            total += additionalLicenseCost;

        } else {

            const selectedRegionCount = isGlobalSelected ? basePercent : regionsIngLength;
            const additionalRegionCost = selectedRegionCount * basePercent / 100 * basePrice;
            total += additionalRegionCost;

            const licenceFormatted = parseInt(licensesValue);
            const licensesCount = licenceFormatted > 1 ? licenceFormatted - 1 : 0;
            const additionalLicenseCost = licensesCount * basePercent / 100 * basePrice;

            total += additionalLicenseCost;


        }

        newSumOfPackage[currentPackageSelect] = total;
        document.getElementById("totalCounter").innerText = `${total.toLocaleString('en-US')}`;
        document.getElementById("totalCounterSecond").innerText = `${total.toLocaleString('en-US')}`;
        document.getElementById("continueBtnTotal").innerHTML = `Total: $${total.toLocaleString('en-US')} USD <img src="src/images/step-form/arrow-right-white.svg" alt="arrow"/>`;
    }

}



function adjustContainerHeight() {
    const activeStep = document.querySelector('.step-form-step.active');
    const container = document.querySelector('.step-form-box');

    if (!activeStep || !container) {
        return;
    }


    if (activeStep && window.innerHeight<1061 || (window.innerHeight>=1061 && window.innerWidth<=1024) ) {
        container.style.maxHeight = `${window.innerHeight}px`;
    }


    if(activeStep && window.innerWidth>=1024 && window.innerHeight>=1061){
        container.style.maxHeight = `839px`;
    }

}

document.addEventListener('DOMContentLoaded', adjustContainerHeight);
window.addEventListener('resize', adjustContainerHeight);
window.addEventListener('orientationchange', adjustContainerHeight);


const optionsDetails = document.getElementById('optionsDetails');
const disabledContainer = document.getElementById('disabledContainer');

    optionsDetails.addEventListener("scroll",()=>{
        const atBottom = optionsDetails.scrollTop + optionsDetails.clientHeight >= optionsDetails.scrollHeight - 1;

        if(optionsDetails.scrollTop>2 && !atBottom) {
            disabledContainer.classList.add('shadow-bottom')
        } else if (atBottom){
            disabledContainer.classList.remove('shadow-bottom')
        }
    })


//determine position of licenses select
document.addEventListener('DOMContentLoaded',  () =>{
    const dropdown = document.querySelector('.licences-select-wrap');
    const dropdownContent = document.querySelector('.licences-select-wrap .choices__list--dropdown');

    dropdown.addEventListener('click', function (event) {
        const dropdownRect = dropdown.getBoundingClientRect();

        const spaceBelow = window.innerHeight - dropdownRect.bottom;

        if (spaceBelow < 130) {
            dropdownContent.style.bottom = `107%`;
            dropdownContent.style.top = 'auto';
        } else {
            dropdownContent.style.top = '107%';
            dropdownContent.style.bottom = 'auto';
        }

        dropdownContent.classList.toggle('show');
    });
});


    //toggle terms modal
window.addEventListener('DOMContentLoaded', () => {
    const termsOfUse = document.getElementById('termsOfUse');
    const termsOfUseModal = document.getElementById('termsOfUseModal');
    const termsOfUseClose = document.getElementById('termsOfUseClose');
    const app = document.getElementById('app');

    termsOfUse.addEventListener('click', (event) => {
        termsOfUseModal.classList.add("terms-of-use-modal-toggle")
        app.classList.add('has-blur');
    });

    termsOfUseClose.addEventListener('click', () => {
        termsOfUseModal.classList.remove("terms-of-use-modal-toggle")
        app.classList.remove('has-blur');
    });

});


window.addEventListener('DOMContentLoaded', () => {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const successfulModal = document.getElementById('successfulModal');
    const successfulModalClose = document.getElementById('successfulModalClose');
    const app = document.getElementById('app');
    const header = document.querySelector('header');


    sendMessageBtn.addEventListener('click', (event) => {
        const isValidForm = validateContactForm();
        const isValidEmail = validateEmailContact();

        if (isValidForm && isValidEmail) {
            clearContactInputs();
            successfulModal.classList.add("successful-modal-toggle");
            app.classList.add('has-blur');
            /*     app.classList.add('has-blur', '!overflow-hidden');
                 header.style.right="0"*/
        }
    });

    successfulModalClose.addEventListener('click', () => {
        successfulModal.classList.remove("successful-modal-toggle");
        app.classList.remove('has-blur');
        /*      app.classList.remove('has-blur', '!overflow-hidden');
              header.style.right="17px"*/
    });
});




export {setupDropdownToggle, calculateTotal, adjustContainerHeight};
