(() => {
    document.addEventListener('DOMContentLoaded', () => {
        let currentStep = 0;
        const steps = document.querySelectorAll('.step');
        const nextButtons = document.querySelectorAll('[data-next-btn]');
        const optionsDetails = document.getElementById('optionsDetails');
        const selectedOptions = document.getElementById('selectedOptions');
        const globalCheckbox = document.querySelector('input[value="global"]');
        const checkboxes = document.querySelectorAll('#regionsSelect .regions-item-box input[type="checkbox"]');
        const regionSelectedItems = document.getElementById('selectedItems');
        const regionsSelect = document.getElementById('regionsSelect');
        const regionsItemBox = document.getElementById('regionsItemBox');
        let formData = {};
        const mainRegionSelectValue = "Global";
        let regionsIng = [];

        //region select code start

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
                return mainRegionSelectValue
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
                        if(c.checked && c.value !== mainRegionSelectValue.toLowerCase()){
                            c.parentNode.classList.add('choose');
                            return c.checked && c.value !== mainRegionSelectValue.toLowerCase()
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

        //region select code finish

        //

        const optionsSelect = new Choices('#optionsSelect', {
            searchEnabled: false,
            itemSelectText: '',
            choices: [
                {value: 'researchPackage', label: 'Research Package'},
                {value: 'customPackage', label: 'Custom Package'},
                {value: 'ultimatePackage', label: 'Ultimate Package'}
            ],
        });

        // Choices.js change event for optionsSelect to update optionsDetails
        optionsSelect.passedElement.element.addEventListener('change', (event) => {
            const value = event.detail.value;
            switch (value) {
                case 'researchPackage':
                    optionsDetails.innerHTML = `<p>Details for researchPackageh</p>`;
                    break;
                case 'customPackage':
                    optionsDetails.innerHTML = `<p>Details for customPackage</p>`;
                    break;
                case 'ultimatePackage':
                    optionsDetails.innerHTML = `<p>Details for ultimatePackage</p>`;
                    break;
                default:
                    optionsDetails.innerHTML = ``;
                    break;
            }
        });


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
                            regions: regionsIng,
                            selectedOption: optionsSelect.getValue(true)[0],
                            optionsDetails: optionsDetails.innerHTML,
                        };
                        selectedOptions.innerHTML = `Selected Regions: ${formData.regions.join(', ')}<br>Selected Option: ${formData.selectedOption}`;
                    }
                    if (currentStep === 2) {
                        // Final step, gather all data
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
                        Object.assign(formData, {name, email, paymentMethod});
                        console.log(formData); // Here you can send formData to the server
                    }
                } else {
                    // Reset form and formData for demonstration purposes
                    optionsSelect.setChoiceByValue('');
                    regionsIng = []
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.querySelector('input[name="payment"]:checked').checked = false;
                    optionsDetails.innerHTML = '';
                    selectedOptions.innerHTML = '';
                    formData = {};
                    steps[currentStep].classList.remove('active');
                    currentStep = 0;
                    steps[currentStep].classList.add('active');
                }
            });
        });
    });
})();
