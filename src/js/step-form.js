import {
    createDropdownsOfPackageCustom,
    createDropdownsOfPackageResearch,
    createDropdownsOfUltimate,
    dataDropdownsCustomPackage,
    dataDropdownsResearchPackage,
    dataDropdownsUltimatePackage,
    selectedItems
} from "./content.js";
import {validateCheckboxAccepted, validateForm} from "./validationForm.js";
import {setupDropdownToggle} from "./helpers.js";


(() => {
    //step1
    document.addEventListener('DOMContentLoaded', () => {
        //create licenses select
        const licencesSelect = new Choices('#licencesSelect', {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            position: 'bottom',
            choices: [
                {value: '1', label: '1'},
                {value: '2', label: '2'},
                {value: '3', label: '3'}
            ],
        });
        //create option select
        const optionsPackageSelect = new Choices('#optionsSelect', {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            position: 'bottom',
            choices: [
                {value: 'researchPackage', label: 'Research Package'},
                {value: 'customPackage', label: 'Custom Package'},
                {value: 'ultimatePackage', label: 'Ultimate Package'}
            ],
        });
        let currentStep = 0;
        const steps = document.querySelectorAll('[data-step-form]');
        const nextButtons = document.querySelectorAll('[data-next-btn]');
        const dataSubscriptionInputs = document.querySelectorAll('[data-subscription-input]');
        const optionsDetails = document.getElementById('optionsDetails');
        const additionalTextOptionsSelect = document.getElementById('additionalTextOptionsSelect');
        const selectedOptions = document.getElementById('selectedOptions');
        const selectedOptionsContainer = document.getElementById('selectedOptionsContainer');
        const packageChooseInfo = document.getElementById('packageChooseInfo');
        const stepFormWrap = document.getElementById('stepFormWrap');
        const packageChooseName = document.getElementById('packageChooseName');
        const packageChooseTotal = document.getElementById('packageChooseTotal');
        const prevButton = document.getElementById('prevButton');
        const nameOfChoosePackage = document.getElementById('nameOfChoosePackage');
        const globalCheckbox = document.querySelector('input[value="global"]');
        const checkboxes = document.querySelectorAll('#regionsSelect .regions-item-box input[type="checkbox"]');
        const regionSelectedItems = document.getElementById('selectedItems');
        const regionsSelect = document.getElementById('regionsSelect');
        const regionsItemBox = document.getElementById('regionsItemBox');
        const totalCounter = document.getElementById('totalCounter');
        const totalCounterSecond = document.getElementById('totalCounterSecond');
        const packageSelectInfo = document.getElementById('packageSelectInfo');
        const packageSelectInfoText = document.getElementById('packageSelectInfoText');
        const closeBtns = document.querySelectorAll("[data-close-modal]");
        const checkboxAccepted = document.getElementById('checkboxAccepted');
        const disabledContainer = document.getElementById('disabledContainer');
        let formData = {};
        const mainRegionSelectValue = "Global";
        const maxRegionsValues = 5;
        let regionsIng = [];
        let currentPackageInnerHtmRight = '';
        const basePercent = 10;

        const basePriceValues = {
            researchPackage: 1000,
            customPackage: 2000,
            ultimatePackage: 1000,
        };

        const newSumOfPackage = {
            researchPackage: 1000,
            customPackage: 2000,
            ultimatePackage: 1000,
        };

        const optionalSelectContent = {
            researchPackage: {
                name: "Research Package",
                innerContent: () => createDropdownsOfPackageResearch(dataDropdownsResearchPackage, newSumOfPackage.researchPackage),
                additionalTextBottom: "Perfect for mining industry research! Encompasses Mine Type, Location, Address, Ownership, Deposit, Reserves, Commodity Production, LOM, Workforce, and Financials. Exceptonal value for your dollar!",
            },
            customPackage: {
                name: "Custom Package",
                innerContent: () => createDropdownsOfPackageCustom(dataDropdownsCustomPackage, newSumOfPackage.customPackage),
                additionalTextBottom: "Ideal for business development, specialized research or when your budget is limited! Includes all Research Package data points plus your selection of optional data modules.",
            },
            ultimatePackage: {
                name: "Ultimate Package",
                innerContent: () => createDropdownsOfUltimate(dataDropdownsUltimatePackage, newSumOfPackage.ultimatePackage),
                additionalTextBottom: "Comprehensive mining intelligence! Best suitable for large corporations, consulting firms and institutional investors. Includes all Research Package data points and all optional data modules.",
            },
        };


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
            regionsIng = [];
            const selectedCheckboxes = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue.toLowerCase());
            if (globalCheckbox.checked) {
                regionSelectedItems.textContent = mainRegionSelectValue;
                regionsIng.push(mainRegionSelectValue);
                console.log("updateItemsDisplay", regionsIng.length);
                return mainRegionSelectValue;
            } else {
                selectedCheckboxes.forEach(c => regionsIng.push(c.value));
                console.log("updateItemsDisplay", regionsIng.length);
                const count = selectedCheckboxes.length;
                if (count >= 2) {
                    regionSelectedItems.textContent = `Regions (${count})`;
                    return `Regions (${count})`;
                } else {
                    regionSelectedItems.textContent = `Region (${count})`;
                    return `Region (${count})`;
                }
            }
        }


        //change state for regions select values
        function handleCheckboxChange() {
            if (globalCheckbox.checked) {
                globalCheckbox.parentNode.classList.add('choose');
                checkboxes.forEach(c => {
                    if (c !== globalCheckbox) {
                        c.checked = false;
                        c.disabled = true;
                        c.parentNode.classList.add('disabled');
                        c.parentNode.classList.remove('choose');
                    }
                });
            } else {
                const selectedCount = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue.toLowerCase()).length;
                if (selectedCount >= maxRegionsValues) {
                    checkboxes.forEach(c => {
                        if (!c.checked) {
                            c.disabled = true;
                        }
                    });
                } else {
                    checkboxes.forEach(c => {
                        c.disabled = false;
                        c.parentNode.classList.remove('disabled');
                    });
                    globalCheckbox.disabled = false;
                }
            }
            updateItemsDisplay();
            calculateTotal();
        }


        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.value === mainRegionSelectValue.toLowerCase()) {
                    checkboxes.forEach(c => {
                        if (c.value !== mainRegionSelectValue.toLowerCase()) {
                            c.disabled = this.checked;
                            c.parentNode.classList.remove('disabled');
                            globalCheckbox.parentNode.classList.remove('choose');
                        }
                    });
                } else {
                    const selectedNonGlobalCheckboxes = Array.from(checkboxes).filter(c => {

                        if (c.checked && c.value !== mainRegionSelectValue.toLowerCase()) {
                            c.parentNode.classList.add('choose');
                            return c.checked && c.value !== mainRegionSelectValue.toLowerCase();
                        }
                    }).length;
                    if (selectedNonGlobalCheckboxes >= maxRegionsValues) {
                        globalCheckbox.checked = true;
                        globalCheckbox.parentNode.classList.add('choose');
                        handleCheckboxChange();
                        return;
                    }
                }
                handleCheckboxChange();
            });
        });

        handleCheckboxChange();
        //region custom select code finish


        // change event for option select
        optionsPackageSelect.passedElement.element.addEventListener('change', (event) => {
            const value = event.detail.value;
            calculateTotal();
            if (document.querySelector(".disabled-step-form-box-right")) {
                document.querySelector(".disabled-step-form-box-right").classList.remove("disabled-step-form-box-right");
            }

            optionalSelectContent[value].innerContent();
            additionalTextOptionsSelect.innerHTML = optionalSelectContent[value].additionalTextBottom;
            additionalTextOptionsSelect.style.paddingTop = '16px';
        });

        // change event for licenses select
        licencesSelect.passedElement.element.addEventListener('change', calculateTotal);


        function calculateTotal() {
            let total = 0;

            const basePrice = basePriceValues[optionsPackageSelect.getValue().value];
            const isPackageSelect = optionsPackageSelect.getValue().value;

            const isGlobalSelected = regionsIng.includes("Global");
            const selectedRegionCount = isGlobalSelected ? maxRegionsValues : regionsIng.length;
            const additionalRegionCost = selectedRegionCount * basePercent / 100 * basePrice;


            const licensesCount = parseInt(licencesSelect.getValue()?.value); // кол-во выбранных лицензий
            const additionalLicenseCost = licensesCount * basePercent / 100 * basePrice;

            total = basePrice + additionalRegionCost + additionalLicenseCost;
            newSumOfPackage[optionsPackageSelect.getValue().value] = total;

            if (isPackageSelect) {
                document.getElementById("totalCounter").innerText = total;
                document.getElementById("totalCounterSecond").innerText = total;
            }

        }


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
        });

        closeBtns.forEach(btnClose => {
            btnClose.addEventListener('click', () => {
                packageSelectInfoText.classList.remove("package-select-info-text-toggle");
                selectedOptionsContainer.classList.remove("selected-options-container-show");
                stepFormWrap.classList.remove("step-form-wrap-open-package");
            });
        });


        packageChooseInfo.addEventListener("click", () => {
            selectedOptionsContainer.classList.add("selected-options-container-show");
            stepFormWrap.classList.add("step-form-wrap-open-package");
        });

        document.addEventListener('click', (event) => {
            if (!packageSelectInfo.contains(event.target)) {
                packageSelectInfoText.classList.remove("package-select-info-text-toggle");
            }
        });

        prevButton.addEventListener("click", () => {
            resetForm();
        });

        nextButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
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
                        currentPackageInnerHtmRight = optionsDetails.innerHTML;
                        nameOfChoosePackage.innerHTML = optionalSelectContent[formData.selectedPackageOption].name;
                        packageChooseName.innerHTML = optionalSelectContent[formData.selectedPackageOption].name;
                        selectedOptions.innerHTML = currentPackageInnerHtmRight;
                        totalCounterSecond.innerHTML = `${newSumOfPackage[optionsPackageSelect.getValue(true)]}`;
                        packageChooseTotal.innerHTML = `$${newSumOfPackage[optionsPackageSelect.getValue(true)]}`;
                    }


                    if (currentStep === 1) {
                        const isValidForm = validateForm();
                        if (!isValidForm) {
                            console.log('Form on second step is not valid');
                            return;
                        } else {
                            console.log('Form on second step is valid');
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

                    console.log(formData);
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
            formData = {};
            steps.forEach(step => step.classList.remove('active'));
            steps[0].classList.add('active');
            optionsPackageSelect.setChoiceByValue('');
            regionsIng = [];

            checkboxes.forEach(checkbox => {
                if(checkbox.value===mainRegionSelectValue.toLowerCase()){
                    checkbox.checked = true;
                    checkbox.parentNode.classList.add('choose');
                    updateItemsDisplay()
                    handleCheckboxChange()
                } else {
                    checkbox.checked = false;
                    checkbox.parentNode.classList.remove('choose');
                }

            });
            optionsDetails.innerHTML = '';
            selectedOptions.innerHTML = '';
            steps[currentStep].classList.remove('active');
            currentStep = 0;
            steps[currentStep].classList.add('active');

            disabledContainer.classList.add("disabled-step-form-box-right");

            //load research package default at start
            createDropdownsOfPackageResearch(dataDropdownsResearchPackage, 0);
        }

    });

})();




