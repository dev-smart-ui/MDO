import {
    createChooseDropdownsOfPackageCustom,
    createDropdownsOfPackageCustom,
    createDropdownsOfPackageResearch,
    createDropdownsOfUltimate,
    dataDropdownsCustomPackage,
    dataDropdownsResearchPackage,
    dataDropdownsUltimatePackage,
    selectedItems
} from "./content.js";
import {resetFormElements, validateCheckboxAccepted, validateForm} from "./validationForm.js";
import {adjustContainerHeight, calculateTotal, setupDropdownToggle} from "./helpers.js";

export const optionalSelectContent = {
    researchPackage: {
        name: "Research Package",
        additionalTextBottom: "Perfect for mining industry research! Encompasses Mine Type, Location, Address, Ownership, Deposit, Reserves, Commodity Production, LOM, Workforce, and Financials. Exceptonal value for your dollar!",
    },
    customPackage: {
        name: "Custom Package",
        additionalTextBottom: "Ideal for business development, specialized research or when your budget is limited! Includes all Research Package data points plus your selection of optional data modules.",
    },
    ultimatePackage: {
        name: "Ultimate Package",
        additionalTextBottom: "Comprehensive mining intelligence! Best suitable for large corporations, consulting firms and institutional investors. Includes all Research Package data points and all optional data modules.",
    },
};


const ultimatePackageTotal = dataDropdownsUltimatePackage.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
);


export let isGlobalSelected = true;
export let regionsIngLength = 0;
export const mainRegionSelectValue = "Global";
export const maxRegionsValues = 5;
export const basePercent = 10;

export const basePriceValues = {
    researchPackage: 2000,
    customPackage: 2000,
    ultimatePackage: ultimatePackageTotal,
};
export const newSumOfPackage = {
    researchPackage: 2000,
    customPackage: 2000,
    ultimatePackage: ultimatePackageTotal,
};

//create licenses select
const choicesArray = [];
for (let i = 1; i <= 99; i++) {
    choicesArray.push({
        value: `${i}`,
        label: `${i}`
    });
}

export const licencesSelect = new Choices('#licencesSelect', {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
    choices: choicesArray,
});


//create option select
export const optionsPackageSelect = new Choices('#optionsSelect', {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
    choices: [
        {value: 'researchPackage', label: 'Research Package', },
        {value: 'customPackage', label: 'Custom Package'},
        {value: 'ultimatePackage', label: 'Ultimate Package'}
    ],
});


(() => {
    //step1
    document.addEventListener('DOMContentLoaded', () => {
        let currentStep = 0;
        const steps = document.querySelectorAll('[data-step-form]');
        const nextButtons = document.querySelectorAll('[data-next-btn]');
        const dataSubscriptionInputs = document.querySelectorAll('[data-subscription-input]');
        const optionsDetails = document.getElementById('optionsDetails');
        const additionalTextOptionsSelect = document.getElementById('additionalTextOptionsSelect');
        const selectedOptions = document.getElementById('selectedOptions');
        const selectedOptionsContainer = document.getElementById('selectedOptionsContainer');
        const packageChooseInfo = document.getElementById('packageChooseInfo');
        const continueBtnStepOne = document.getElementById('continueBtnStepOne');
        const continueBtnTotal = document.getElementById('continueBtnTotal');
        const stepFormWrap = document.getElementById('stepFormWrap');
        const packageChooseName = document.getElementById('packageChooseName');
        const packageChooseTotal = document.getElementById('packageChooseTotal');
        const prevButton = document.getElementById('prevButton');
        const nameOfChoosePackage = document.getElementById('nameOfChoosePackage');
        const globalCheckbox = document.querySelector('input[value="global"]');
        const checkboxes = document.querySelectorAll('[data-regions-input]');
        const regionSelectedItems = document.getElementById('selectedItems');
        const regionsSelect = document.getElementById('regionsSelect');
        const regionsItemBox = document.getElementById('regionsItemBox');
        const totalCounterSecond = document.getElementById('totalCounterSecond');
        const packageSelectInfo = document.getElementById('packageSelectInfo');
        const packageSelectInfoText = document.getElementById('packageSelectInfoText');
        const closeBtns = document.querySelectorAll("[data-close-modal]");
        const checkboxAccepted = document.getElementById('checkboxAccepted');
        const disabledContainer = document.getElementById('disabledContainer');
        const selectedItem = document.querySelector('.is-highlighted');
        const app = document.querySelector('#app');
        let formData = {};
        let regionsIng = [];
        let currentPackageInnerHtmRight = '';
        


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

        function updateGlobalSelection() {
            isGlobalSelected = regionsIng.includes(mainRegionSelectValue);
            regionsIngLength = regionsIng.length;
        }


        //update regions select when choose value
        function updateItemsDisplay() {
            regionsIng = [];
            const selectedCheckboxes = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue.toLowerCase());
            if (globalCheckbox.checked) {
                regionSelectedItems.textContent = mainRegionSelectValue;
                regionsIng.push(mainRegionSelectValue);

                continueBtnStepOne.classList.remove('disabled-btn')
                return mainRegionSelectValue;
            } else {
                const count = selectedCheckboxes.length;

                checkboxes.forEach(item => {

                    if(!item.checked){
                        item.parentNode.classList.remove("choose")
                    }

                    if (count === 1 && item.checked) {
                        regionSelectedItems.textContent = item.name;
                        regionsIng.push(item.value);
                        item.parentNode.classList.add("choose")
                        continueBtnStepOne.classList.remove('disabled-btn')
                        return item.value;
                    }
                   else if (count === 0 &&  !item.checked) {
                        regionSelectedItems.textContent = `Region (${count})`;
                        regionsIng.push(item.value);
                        regionsIng=[];
                        continueBtnStepOne.classList.add('disabled-btn')
                        return `Region (${count})`;
                    }
                   else if (count >= 2 &&  item.checked) {
                        regionSelectedItems.textContent = `Regions (${count})`;
                        regionsIng.push(item.value);
                        item.parentNode.classList.add("choose")
                        continueBtnStepOne.classList.remove('disabled-btn')
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
            updateGlobalSelection();
            calculateTotal(
                optionsPackageSelect.getValue().value,
            );
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


        // change event for option select

        selectedItem.classList.remove('is-highlighted') //update class
        optionsPackageSelect.passedElement.element.addEventListener('change', (event) => {
            const value = event.detail.value;

            if (document.querySelector(".disabled-step-form-box-right")) {
                document.querySelector(".disabled-step-form-box-right").classList.remove("disabled-step-form-box-right");
            }

            if (optionsPackageSelect.getValue().value === "researchPackage") {
                createDropdownsOfPackageResearch(dataDropdownsResearchPackage, newSumOfPackage.researchPackage);
            }

            if (optionsPackageSelect.getValue().value === "customPackage") {
                createDropdownsOfPackageCustom(
                    dataDropdownsCustomPackage,
                    optionsPackageSelect.getValue().value,
                );
            }

            if (optionsPackageSelect.getValue().value === "ultimatePackage") {
                createDropdownsOfUltimate(dataDropdownsUltimatePackage, newSumOfPackage.ultimatePackage);
            }

            calculateTotal(
                optionsPackageSelect.getValue().value,
            );

            additionalTextOptionsSelect.innerHTML = optionalSelectContent[value].additionalTextBottom;
            additionalTextOptionsSelect.style.paddingTop = '16px';
            continueBtnTotal.innerHTML=`Total: $${newSumOfPackage[optionsPackageSelect.getValue(true)]} USD  <img src="src/images/step-form/arrow-right-white.svg" alt="arrow"/>`
        });

        // change event for licenses select
        licencesSelect.passedElement.element.addEventListener('change', () => {
            calculateTotal(
                optionsPackageSelect.getValue().value,
            );
        });


        //step2

        //open dropdowns
        setupDropdownToggle(optionsDetails);
        setupDropdownToggle(selectedOptions);


        //load research package default at start
        createDropdownsOfPackageResearch(dataDropdownsResearchPackage, 0);

        //change checkbox accepted state
        checkboxAccepted.addEventListener("click", validateCheckboxAccepted);


        packageSelectInfo.addEventListener('click', () => {
            packageSelectInfoText.classList.add("package-select-info-text-toggle");
            app.classList.add('has-blur');
        });

        closeBtns.forEach(btnClose => {
            btnClose.addEventListener('click', () => {
                packageSelectInfoText.classList.remove("package-select-info-text-toggle");
                selectedOptionsContainer.classList.remove("selected-options-container-show");
                stepFormWrap.classList.remove("step-form-wrap-open-package");
                stepFormWrap.classList.remove("relative");
                stepFormWrap.removeAttribute('style');
                app.style.overflowY = 'scroll';
                app.classList.remove('has-blur');
            });
        });


        packageChooseInfo.addEventListener("click", () => {
            selectedOptionsContainer.classList.add("selected-options-container-show");
            stepFormWrap.classList.add("step-form-wrap-open-package");
            stepFormWrap.classList.add("relative");
            stepFormWrap.style.zIndex = '30';
            app.style.overflowY = 'hidden';
            //header.style.zIndex="-1"
        });

        document.addEventListener('click', (event) => {
            if (!packageSelectInfo.contains(event.target)) {
                packageSelectInfoText.classList.remove("package-select-info-text-toggle");
                app.classList.remove('has-blur');
            }
        });

        prevButton.addEventListener("click", () => {
            resetForm();
            setTimeout(adjustContainerHeight, 400);
        });


        nextButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                setTimeout(adjustContainerHeight, 400);
                if (index < steps.length - 1) {
                    if (currentStep === 0) {
                        formData = {
                            selectedRegions: regionsIng,
                            selectedPackageOption: optionsPackageSelect.getValue(true),
                            totalPrice: newSumOfPackage[optionsPackageSelect.getValue(true)],
                            numberLicense: licencesSelect.getValue(true),
                        };

                        if (optionsPackageSelect.getValue(true) === "customPackage") {
                            formData.selectedCustomPackageValues = selectedItems;
                        }

                        currentPackageInnerHtmRight = optionsDetails.innerHTML;
                        nameOfChoosePackage.innerHTML = optionalSelectContent[formData.selectedPackageOption].name;
                        packageChooseName.innerHTML = optionalSelectContent[formData.selectedPackageOption].name;

                        if(optionsPackageSelect.getValue().value === "customPackage"){
                            const criteriaValues = Object.values(formData.selectedCustomPackageValues);
                            const filteredDropdowns = dataDropdownsCustomPackage.filter((dropdown, index) => {
                                return index === 0 || criteriaValues.some(criterion => {
                                    return criterion.name === dropdown.btnTitle && criterion.price === dropdown.price;
                                });
                            });

                            createChooseDropdownsOfPackageCustom(
                                filteredDropdowns,
                                optionsPackageSelect.getValue().value,
                            );
                        } else {
                            selectedOptions.innerHTML = currentPackageInnerHtmRight;
                        }

                        totalCounterSecond.innerHTML = `${newSumOfPackage[optionsPackageSelect.getValue(true)]}`;
                        continueBtnTotal.innerHTML = `Total: $${newSumOfPackage[optionsPackageSelect.getValue(true)]} USD <img src="src/images/step-form/arrow-right-white.svg" alt="arrow"/>`;
                        packageChooseTotal.innerHTML = `$${newSumOfPackage[optionsPackageSelect.getValue(true)]}`;
                        packageChooseTotal.innerHTML = `$${newSumOfPackage[optionsPackageSelect.getValue(true)]}`;
                    }

                    if (currentStep === 1) {
                        const isValidForm = validateForm();
                        if (!isValidForm) {
                            return;
                        } else {
                            document.querySelector("header").style.display="none"
                            dataSubscriptionInputs.forEach(input => {
                                if (input.type === 'radio' && !input.checked) return;

                                if (input.type === 'radio' && input.checked) {
                                    formData["paymentMethod"] = input.value;
                                } else {
                                    formData[input.id] = input.value;
                                }
                            });
                        }
                    }

                    steps[currentStep].classList.remove('active');
                    currentStep++;
                    steps[currentStep].classList.add('active');

                } else {
                    resetForm();
                }
            });
        });

        function resetForm() {
            // Reset form and formData for demonstration purposes
            document.querySelector("header").style.display="block"
            formData = {};
            steps.forEach(step => step.classList.remove('active'));
            steps[0].classList.add('active');
            optionsPackageSelect.getValue(false);
            optionsPackageSelect.setChoiceByValue('');
            const selectedItem = document.querySelector('.is-highlighted');
            selectedItem.classList.remove('is-highlighted')
            licencesSelect.setChoiceByValue('1');
            additionalTextOptionsSelect.innerHTML = "";
            regionsIng = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.value === mainRegionSelectValue.toLowerCase()) {
                    checkbox.checked = true;
                    checkbox.parentNode.classList.add('choose');
                    updateItemsDisplay();
                    handleCheckboxChange();
                } else {
                    checkbox.checked = false;
                    checkbox.parentNode.classList.remove('choose');
                }

            });
            optionsDetails.innerHTML = '';
            continueBtnTotal.innerHTML = `Continue to billing <img src="src/images/step-form/arrow-right-white.svg" alt="arrow"/>`;
            steps[currentStep].classList.remove('active');
            currentStep = 0;
            steps[currentStep].classList.add('active');
            disabledContainer.classList.add("disabled-step-form-box-right");
            resetFormElements()

            //load research package default at start
            createDropdownsOfPackageResearch(dataDropdownsResearchPackage, 0);
        }

    });
})();




