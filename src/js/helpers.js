import {selectedItems} from "./content.js";
import {
    basePercent,
    basePriceValues,
    isGlobalSelected, licencesSelect,
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


 function calculateTotal(currentPackageSelect) {
    let total = 0;
   const  licensesValue= licencesSelect.getValue()?.value

    if (currentPackageSelect) {
        const basePrice = basePriceValues[currentPackageSelect];
        total+=basePrice;
        if(currentPackageSelect==="customPackage"){
            let newBaseCustomPercent=total;
            Object.keys(selectedItems).forEach(key => {
                newBaseCustomPercent += selectedItems[key].price;
            });

            total=newBaseCustomPercent

            const selectedRegionCount = isGlobalSelected ? 10 : regionsIngLength;
            const additionalRegionCost = selectedRegionCount * basePercent / 100 * newBaseCustomPercent;
            total += additionalRegionCost;

            const licenceFormatted=parseInt(licensesValue)
            const licensesCount = licenceFormatted>1?licenceFormatted-1:0;
            const additionalLicenseCost = licensesCount * basePercent / 100 * newBaseCustomPercent;

            total += additionalLicenseCost;

        } else {

            const selectedRegionCount = isGlobalSelected ? 10 : regionsIngLength;
            const additionalRegionCost = selectedRegionCount * basePercent / 100 * basePrice;
            total += additionalRegionCost;

            const licenceFormatted=parseInt(licensesValue)
            const licensesCount = licenceFormatted>1?licenceFormatted-1:0;
            const additionalLicenseCost = licensesCount * basePercent / 100 * basePrice;

            total += additionalLicenseCost;


        }

        newSumOfPackage[currentPackageSelect] = total;
        document.getElementById("totalCounter").innerText = total;
        document.getElementById("totalCounterSecond").innerText = total;
    }

}

function scrollToStepForm() {
    if (window.innerWidth < 1024) {
        const container = document.getElementById('stepFormWrap');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function adjustContainerHeight() {
    const activeStep = document.querySelector('.step-form-step.active');
    const stepFormStep = document.querySelector('.step-form-step');
    const container = document.querySelector('.step-form-box');

    if (window.innerWidth > 1024) {
        if (activeStep) {
            const height = activeStep.scrollHeight;
            container.style.height = `${height}px`;
        }

        if (activeStep.classList.contains("step-form-step-three")) {

            const height = stepFormStep.scrollHeight;
            container.style.height = `${height}px`;
        }





    } else {
        if (activeStep) {
            container.style.height = `${window.innerHeight}px`;
        }

       /* else {

            if (activeStep) {
                const height = activeStep.scrollHeight;
                container.style.height = `${height}px`;
            }
        }*/
    }



    scrollToStepForm()
}


adjustContainerHeight()


/*window.addEventListener('resize', adjustContainerHeight);*/


export {setupDropdownToggle, calculateTotal, adjustContainerHeight}