document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.nextBtn');
    const optionsDetails = document.getElementById('optionsDetails');
    const selectedOptions = document.getElementById('selectedOptions');
    const globalCheckbox = document.querySelector('input[value="global"]');
    const checkboxes = document.querySelectorAll('#regionsSelect .items input[type="checkbox"]');
    const regionSelectedItems = document.getElementById('selected-items');
    let formData = {};
    const mainRegionSelectValue = "Global";
    const regionsIng = [];

    function updateItemsDisplay() {
        regionsIng.length = 0;
        const selectedCheckboxes = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue);

        if (selectedCheckboxes.length === 0 || globalCheckbox.checked) {
            regionSelectedItems.textContent = mainRegionSelectValue;
            regionsIng.push(mainRegionSelectValue);
        } else {
            regionSelectedItems.textContent = selectedCheckboxes.map(c => {
                regionsIng.push(c.value);
                return c.value;
            }).join(", ") + ` (${selectedCheckboxes.length})`;

        }
    }

    regionSelectedItems.addEventListener('click', ()=>{

    })

    function handleCheckboxChange() {
        if (globalCheckbox.checked) {
            checkboxes.forEach(c => {
                if (c !== globalCheckbox) {
                    c.checked = false;
                    c.disabled = true;
                }
            });
        } else {
            const selectedCount = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue).length;
            if (selectedCount >= 4) {
                checkboxes.forEach(c => {
                    if (!c.checked) {
                        c.disabled = true;
                    }
                });
            } else {
                checkboxes.forEach(c => c.disabled = false);
                globalCheckbox.disabled = false;
            }
        }
        updateItemsDisplay();
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.value === mainRegionSelectValue) {
                checkboxes.forEach(c => {
                    if (c.value !== mainRegionSelectValue) {
                        c.disabled = this.checked;
                    }
                });
            } else {
                const selectedNonGlobalCheckboxes = Array.from(checkboxes).filter(c => c.checked && c.value !== mainRegionSelectValue).length;
                if (selectedNonGlobalCheckboxes >= 4) {
                    globalCheckbox.checked = true;
                    handleCheckboxChange();
                    return;
                }
            }
            handleCheckboxChange();
        });
    });


    handleCheckboxChange();

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
            case 'customPackage':
                optionsDetails.innerHTML = `<p>Details for customPackage</p>`;
                break;
            case 'researchPackage':
                optionsDetails.innerHTML = `<p>Details for researchPackageh</p>`;
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
