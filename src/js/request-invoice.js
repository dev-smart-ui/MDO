import {buildLeftPanel, stepFormState} from "./packages-modules.js";
import {calculateTotalCost} from "./helpers-presentation.js";


export const optionalSelectContent = {
    "Research Package": {
        name: "Research Package",
        additionalTextBottom: "Perfect for mining industry research! Encompasses Mine Type, Location, Address, Ownership, Deposit, Reserves, Commodity Production, LOM, Workforce, and Financials. Exceptonal value for your dollar!",
    },
    "Custom Package": {
        name: "Custom Package",
        additionalTextBottom: "Ideal for business development, specialized research or when your budget is limited! Includes all Research Package data points plus your selection of optional data modules.",
    },
    "Ultimate Package": {
        name: "Ultimate Package",
        additionalTextBottom: "Comprehensive mining intelligence! Best suitable for large corporations, consulting firms and institutional investors. Includes all Research Package data points and all optional data modules.",
    },
};

export const mainRegionSelectValue = "Global";
export const maxRegionsValues = 5;


//create licenses select
const choicesArray = [];
for (let i = 1; i <= 99; i++) {
    choicesArray.push({
        value: `${i}`,
        label: `${i}`
    });
}

export const licencesSelect = new Choices('#licencesSelectPresentation', {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
    choices: choicesArray,
});


//create option select
export const optionsPackageSelect = new Choices('#optionsSelectPresentation', {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
});


document.addEventListener('DOMContentLoaded', () => {
    const globalCheckbox = document.querySelector('input[value="global"]');
    const checkboxes = document.querySelectorAll('[data-regions-input]');
    const regionSelectedItems = document.getElementById('selectedItemsPresentation');
    const regionsSelect = document.getElementById('regionsSelectPresentation');
    const regionsItemBox = document.getElementById('regionsItemBoxPresentation');
    const additionalTextOptionsSelect = document.getElementById('additionalTextOptionsSelect');
    let regionsIng = [];


    //region custom select code start

    //toggle select regions click outside
    regionSelectedItems.addEventListener('click', (event) => {
        regionsItemBox.classList.toggle("open");
        regionSelectedItems.classList.add("open");
        event.stopPropagation();
    });

    //close select click outside
    document.addEventListener('click', (event) => {
        if (!regionsSelect.contains(event.target)) {
            regionsItemBox.classList.remove("open");
            regionSelectedItems.classList.remove("open");
        }
    });

    //update regions select when choose value
    function updateItemsDisplay() {
        stepFormState.regionsArr = [];
        const selectedCheckboxes = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue.toLowerCase());
        if (globalCheckbox.checked) {
            regionSelectedItems.textContent = mainRegionSelectValue;
            stepFormState.regionsArr.push(mainRegionSelectValue);
            calculateTotalCost(stepFormState);

            $('#requestInvoicePackage').removeAttr('disabled');

            return mainRegionSelectValue;
        } else {
            const count = selectedCheckboxes.length;

            checkboxes.forEach(item => {

                if (!item.checked) {
                    item.parentNode.classList.remove("choose");
                }

                if (count === 1 && item.checked) {
                    regionSelectedItems.textContent = item.name;
                    stepFormState.regionsArr.push(item.value);
                    calculateTotalCost(stepFormState);
                    item.parentNode.classList.add("choose");
                    $('#requestInvoicePackage').removeAttr('disabled');
                    return item.value;
                } else if (count === 0 && !item.checked) {
                    regionSelectedItems.textContent = `Region (${count})`;
                    calculateTotalCost(stepFormState);
                    stepFormState.regionsArr = [];
                    $('#requestInvoicePackage').attr('disabled', 'disabled');
                    return `Region (${count})`;
                } else if (count >= 2 && item.checked) {
                    regionSelectedItems.textContent = `Regions (${count})`;
                    stepFormState.regionsArr.push(item.value);
                    calculateTotalCost(stepFormState);
                    item.parentNode.classList.add("choose");
                    $('#requestInvoicePackage').removeAttr('disabled');
                    return `Regions (${count})`;
                }
            });

        }
    }


    function handleCheckboxChange() {
        const selectedCheckboxes = Array.from(checkboxes).filter(c => c.checked && c !== globalCheckbox);

        if (globalCheckbox.checked) {
            selectedCheckboxes.forEach(c => {
                c.checked = false;
                c.parentNode.classList.remove('choose');
            });
        } else if (selectedCheckboxes.length >= maxRegionsValues) {
            globalCheckbox.checked = true;
            checkboxes.forEach(c => {
                if (c !== globalCheckbox) {
                    c.checked = false;
                    c.parentNode.classList.remove('choose');
                } else {
                    c.parentNode.classList.add('choose');
                }
            });
        } else {
            checkboxes.forEach(c => {
                c.disabled = false;
                c.parentNode.classList.remove('disabled');
            });
            globalCheckbox.parentNode.classList.remove('choose');
        }

        updateItemsDisplay();
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox !== globalCheckbox) {
                globalCheckbox.checked = false;
                globalCheckbox.parentNode.classList.remove('choose');
            }
            handleCheckboxChange();
        });
    });

    //region custom select code finish


    //package select
    optionsPackageSelect.passedElement.element.addEventListener('change', (event) => {
        const value = event.detail.value;
        const currentPackage = optionsPackageSelect.getValue().value;
        stepFormState.currentPackageSelected = currentPackage;
        const addedCheckboxes = true;
        stepFormState.isChangedDefaultState = false;

        if (currentPackage === "Research Package") {
            buildLeftPanel("accordionPanelSlide4", "presentationMenuSlide4", addedCheckboxes);
            calculateTotalCost(stepFormState);
        }

        if (currentPackage === "Custom Package") {
            buildLeftPanel("accordionPanelSlide4", "presentationMenuSlide4", addedCheckboxes);
            calculateTotalCost(stepFormState);

        }

        if (currentPackage === "Ultimate Package") {
            buildLeftPanel("accordionPanelSlide4", "presentationMenuSlide4", addedCheckboxes);
            calculateTotalCost(stepFormState);
        }


        additionalTextOptionsSelect.innerHTML = optionalSelectContent[value].additionalTextBottom;

        let screenWidth = $(window).width();
        if(screenWidth>1024){
            additionalTextOptionsSelect.classList.add('show-additional-text');
        }

    });

    // change event for licenses select
    licencesSelect.passedElement.element.addEventListener('change', () => {
        stepFormState.currentLicencesSelected = licencesSelect.getValue().value;
        calculateTotalCost(stepFormState);
    });

});




