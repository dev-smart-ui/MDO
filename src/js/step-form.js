import {
    createDropdownsOfPackageCustom,
    createDropdownsOfPackageResearch,
    createDropdownsOfUltimateCustom,
    dataDropdownsCustomPackage,
    dataDropdownsResearchPackage,
    dataDropdownsUltimatePackage,
    selectedItems
} from "/src/js/content.js";


(() => {
    document.addEventListener('DOMContentLoaded', () => {
        let currentStep = 0;
        const steps = document.querySelectorAll('[data-step-form]');
        const nextButtons = document.querySelectorAll('[data-next-btn]');
        const optionsDetails = document.getElementById('optionsDetails');
        const additionalTextOptionsSelect = document.getElementById('additionalTextOptionsSelect');
        const selectedOptions = document.getElementById('selectedOptions');
        const globalCheckbox = document.querySelector('input[value="global"]');
        const checkboxes = document.querySelectorAll('#regionsSelect .regions-item-box input[type="checkbox"]');
        const regionSelectedItems = document.getElementById('selectedItems');
        const regionsSelect = document.getElementById('regionsSelect');
        const regionsItemBox = document.getElementById('regionsItemBox');
        const totalCounter = document.getElementById('totalCounter');
        const packageSelectInfo = document.getElementById('packageSelectInfo');
        const packageSelectInfoText = document.getElementById('packageSelectInfoText');
        const packageSelectInfoTextClose = document.getElementById('packageSelectInfoTextClose');
        let formData = {};
        const mainRegionSelectValue = "Global";
        let regionsIng = [];
        let researchPackageTotal = 5600;
        let ultimatePackageTotal = 5600;
        let customPackageTotal = 2000;
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

        function updateItemsDisplay() {
            regionsIng.length = 0;
            const selectedCheckboxes = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue.toLowerCase());

            if (selectedCheckboxes.length === 0 || globalCheckbox.checked) {
                regionSelectedItems.textContent = mainRegionSelectValue;
                regionsIng.push(mainRegionSelectValue);
                return mainRegionSelectValue;
            } else {
                regionSelectedItems.textContent = selectedCheckboxes.map(c => {
                    regionsIng.push(c.value);
                    return c.value;
                }).join(", ") + ` (${selectedCheckboxes.length})`;

            }
        }

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
                if (selectedCount >= 4) {
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
                    if (selectedNonGlobalCheckboxes >= 4) {
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


        //create licenses select
        const licencesSelect = new Choices('#licencesSelect', {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            position:'bottom',
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
            position:'bottom',
            choices: [
                {value: 'researchPackage', label: 'Research Package'},
                {value: 'customPackage', label: 'Custom Package'},
                {value: 'ultimatePackage', label: 'Ultimate Package'}
            ],
        });

        // change event for option select
        optionsPackageSelect.passedElement.element.addEventListener('change', (event) => {
            const value = event.detail.value;
            if (document.querySelector(".disabled-step-form-box-right")) {
                document.querySelector(".disabled-step-form-box-right").classList.remove("disabled-step-form-box-right");
            }


            optionalSelectContent[value].innerContent();
            additionalTextOptionsSelect.innerHTML = optionalSelectContent[value].additionalTextBottom;
            additionalTextOptionsSelect.style.paddingTop = '16px';
        });


        const optionalSelectContent = {
            researchPackage: {
                innerContent: () => createDropdownsOfPackageResearch(dataDropdownsResearchPackage, researchPackageTotal),
                additionalTextBottom: "Perfect for mining industry research! Encompasses Mine Type, Location, Address, Ownership, Deposit, Reserves, Commodity Production, LOM, Workforce, and Financials. Exceptonal value for your dollar!",
            },
            customPackage: {
                innerContent: () => createDropdownsOfPackageCustom(dataDropdownsCustomPackage, customPackageTotal),
                additionalTextBottom: "Ideal for business development, specialized research or when your budget is limited! Includes all Research Package data points plus your selection of optional data modules.",
            },
            ultimatePackage: {
                innerContent: () => createDropdownsOfUltimateCustom(dataDropdownsUltimatePackage, ultimatePackageTotal),
                additionalTextBottom: "Comprehensive mining intelligence! Best suitable for large corporations, consulting firms and institutional investors. Includes all Research Package data points and all optional data modules.",
            },
        };


        // Next button click event
        nextButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (index < steps.length - 1) {
                    steps[currentStep].classList.remove('active');
                    currentStep++;
                    steps[currentStep].classList.add('active');
                    if (currentStep === 1) {

                        // Update formData with choices from step 1
                        formData = {
                            selectedRegions: regionsIng,
                            selectedPackageOption: optionsPackageSelect.getValue(true),
                            totalPrice: document.getElementById("totalCounter").innerText,
                            numberLicense: licencesSelect.getValue(true),
                        };

                        if (optionsPackageSelect.getValue(true) === "customPackage") {
                            formData.selectedCustomPackageValues = selectedItems;
                        }

                        currentPackageInnerHtmRight = optionsDetails.innerHTML;
                        selectedOptions.innerHTML = currentPackageInnerHtmRight;
                    }
                    if (currentStep === 2) {

                        // Final step, gather all data
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
                        Object.assign(formData, {name, email, paymentMethod});
                        console.log(formData);
                    }
                } else {
                    // Reset form and formData for demonstration purposes
                    optionsPackageSelect.setChoiceByValue('');
                    regionsIng = [];
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.querySelectorAll('input[name="payment"]:checked').checked = false;
                    optionsDetails.innerHTML = '';
                    selectedOptions.innerHTML = '';
                    formData = {};
                    steps[currentStep].classList.remove('active');
                    currentStep = 0;
                    steps[currentStep].classList.add('active');

                    //load research package default at start
                    optionalSelectContent.researchPackage.innerContent(dataDropdownsCustomPackage);
                }
            });
        });


        //open dropdowns
        optionsDetails.addEventListener('click', (event) => {
            const dropDownButton = event.target.closest('.dropdown-toggle');
            if (dropDownButton) {
                const dropdownBox = dropDownButton.closest('.dropdown-box');
                if (dropdownBox) {
                    dropdownBox.classList.toggle('drop-down-item-open');
                }
            }
        });

        //load research package default at start
        createDropdownsOfPackageResearch(dataDropdownsResearchPackage, 0);


        packageSelectInfo.addEventListener('click', ()=>{
            packageSelectInfoText.classList.add("package-select-info-text-toggle")
        })

        packageSelectInfoTextClose.addEventListener('click', ()=>{
            packageSelectInfoText.classList.remove("package-select-info-text-toggle")
        })


        document.addEventListener('click', (event) => {

            if (!packageSelectInfo.contains(event.target)) {
                packageSelectInfoText.classList.remove("package-select-info-text-toggle")
            }
        });
    });


})();




