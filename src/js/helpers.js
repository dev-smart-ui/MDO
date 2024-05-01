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
        const dropDownButton = event.target.closest('.dropdown-toggle');
        if (dropDownButton) {
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




export {setupDropdownToggle, calculateTotal, adjustContainerHeight};