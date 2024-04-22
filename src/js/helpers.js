import {selectedItems} from "./content.js";
import {
    basePercent,
    basePriceValues,
    isGlobalSelected,
    maxRegionsValues,
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

 function calculateTotal(currentPackageSelect, licensesValue) {
    let total = 0;

    if (currentPackageSelect) {
        const basePrice = basePriceValues[currentPackageSelect];

        total+=basePrice;
        Object.keys(selectedItems).forEach(key => {
            total += selectedItems[key].price;
        });

        const selectedRegionCount = isGlobalSelected ? maxRegionsValues : regionsIngLength;
        const additionalRegionCost = selectedRegionCount * basePercent / 100 * basePrice;
        total += additionalRegionCost;
        const licensesCount = parseInt(licensesValue);
        const additionalLicenseCost = licensesCount * basePercent / 100 * basePrice;

        total += additionalLicenseCost;

        newSumOfPackage[currentPackageSelect] = total;

        document.getElementById("totalCounter").innerText = total;
        document.getElementById("totalCounterSecond").innerText = total;
    }

}

function scrollToStepForm() {
    if (window.innerWidth < 1024) {
        const container = document.querySelector('.step-form-step');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function adjustContainerHeight() {
    const activeStep = document.querySelector('.step-form-step.active');
    const container = document.querySelector('.step-form-box');

    if (activeStep.classList.contains("step-form-step-three")) {
        container.style.height = `${window.innerHeight}px`;
    }else {
        container.style.height = ``

        if (activeStep) {
            const height = activeStep.scrollHeight;
            container.style.height = `${height}px`;
        }
    }

    scrollToStepForm()
}


adjustContainerHeight()


window.addEventListener('resize', adjustContainerHeight);


export {setupDropdownToggle, calculateTotal, adjustContainerHeight}