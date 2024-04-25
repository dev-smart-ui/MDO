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
                dropdownBox.classList.toggle('drop-down-item-open');
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
    }

}



function adjustContainerHeight() {
    const activeStep = document.querySelector('.step-form-step.active');
    const container = document.querySelector('.step-form-box');

    if (!activeStep || !container) {
        return;
    }

    if (activeStep) {
        container.style.maxHeight = `${window.innerHeight}px`;
    }


}

document.addEventListener('DOMContentLoaded', adjustContainerHeight);
window.addEventListener('resize', adjustContainerHeight);
window.addEventListener('orientationchange', adjustContainerHeight);




export {setupDropdownToggle, calculateTotal, adjustContainerHeight};