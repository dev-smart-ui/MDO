import {selectedItems} from "./content.js";
import {
    basePercent,
    basePriceValues,
    isGlobalSelected,
    licencesSelect,
    newSumOfPackage,
    regionsIngLength
} from "./step-form.js";

function setupDropdownToggle(element) {
    element.addEventListener('click', (event) => {
        const checkBox = event.target.closest('.check-box-label');
        const defaultPrice= event.target.closest('.default-price-string');
        const dropDownButton = event.target.closest('.dropdown-toggle') || event.target.closest('.toggle-container');


        if (!checkBox &&!defaultPrice && dropDownButton ) {
            const dropdownBox = dropDownButton.closest('.dropdown-box');
            if (dropdownBox) {
                document.querySelectorAll('.dropdown-box').forEach(box => {
                    if (box === dropdownBox) {
                        box.classList.remove('closing');
                        box.classList.add('drop-down-item-open');
                    } else {
                        box.classList.add('closing');
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
        document.getElementById("totalCounter").innerText = total;
        document.getElementById("totalCounterSecond").innerText = total;
        document.getElementById("continueBtnTotal").innerHTML = `Total: $${total} USD <img src="src/images/step-form/arrow-right-white.svg" alt="arrow"/>`;
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
        const atBottom = optionsDetails.scrollTop + optionsDetails.clientHeight >= optionsDetails.scrollHeight;

        if(optionsDetails.scrollTop>2 && !atBottom) {
            disabledContainer.classList.add('shadow-bottom')
        } else if (atBottom){
            disabledContainer.classList.remove('shadow-bottom')
        }
    })


//determine position of licenses select
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.licences-select-wrap');
    const dropdownContent = document.querySelector('.licences-select-wrap .choices__list--dropdown');

    dropdown.addEventListener('click', function (event) {
        const dropdownRect = dropdown.getBoundingClientRect();

        const spaceBelow = window.innerHeight - dropdownRect.bottom;
        const dropdownHeight = dropdownContent.offsetHeight;

        if (spaceBelow < 130) {
            dropdownContent.style.top = `-${dropdownHeight}px`;
            dropdownContent.style.bottom = 'auto';
        } else {
            dropdownContent.style.top = '100%';
            dropdownContent.style.bottom = 'auto';
        }

        dropdownContent.classList.toggle('show');
    });
});



export {setupDropdownToggle, calculateTotal, adjustContainerHeight};