const dataDropdownsResearchPackage = [
    {
        btnTitle: "Mine / Project Overview",
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Ownership",
        imgLink: 'src/images/step-form/listItem2.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Deposit Type & Geology",
        imgLink: 'src/images/step-form/listItem3.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Reserves & Resources",
        imgLink: 'src/images/step-form/listItem4.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Commodity Production",
        imgLink: 'src/images/step-form/listItem5.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Workforce",
        imgLink: 'src/images/step-form/listItem6.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
];

const dataDropdownsCustomPackage = [
    {
        btnTitle: "1Mine / Project Overview",
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Ownership",
        imgLink: 'src/images/step-form/listItem2.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Deposit Type & Geology",
        imgLink: 'src/images/step-form/listItem3.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Reserves & Resources",
        imgLink: 'src/images/step-form/listItem4.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Commodity Production",
        imgLink: 'src/images/step-form/listItem5.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Workforce",
        imgLink: 'src/images/step-form/listItem6.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
];

const dataDropdownsUltimatePackage = [
    {
        btnTitle: "1Mine / Project Overview",
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Ownership",
        imgLink: 'src/images/step-form/listItem2.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Deposit Type & Geology",
        imgLink: 'src/images/step-form/listItem3.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Reserves & Resources",
        imgLink: 'src/images/step-form/listItem4.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Commodity Production",
        imgLink: 'src/images/step-form/listItem5.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Workforce",
        imgLink: 'src/images/step-form/listItem6.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
];


(() => {
    document.addEventListener('DOMContentLoaded', () => {
        let currentStep = 0;
        const steps = document.querySelectorAll('.step');
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
        let formData = {};
        const mainRegionSelectValue = "Global";
        let regionsIng = [];
        let researchPackageTotal="5600"


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

        //right side

        function createDropdownsOfPackageAndUltimateResearch(data) {
            const optionsDetails = document.getElementById('optionsDetails');
            optionsDetails.innerHTML = '';
            data.map((itemDropDown, index) => {
                const dropdownBox = document.createElement("div");
                dropdownBox.classList.add("dropdown-box");
                index === 0 && dropdownBox.classList.add("drop-down-item-open");

                const dropdownButton = document.createElement("button");
                dropdownButton.classList.add("dropdown-toggle", "flex", "items-center", "flex-row-reverse", "justify-end");

                const titleArrowBox = document.createElement("div");
                titleArrowBox.classList.add("title-arrow-box");
                const titleBox = document.createElement("span");
                titleBox.innerText = itemDropDown.btnTitle;


                titleArrowBox.appendChild(titleBox);
                const imgBox = document.createElement("div");
                imgBox.classList.add("dropdown-toggle-img-box", "flex", "justify-center", "items-center",);
                const imgItem = document.createElement("img");
                imgItem.setAttribute('src', itemDropDown.imgLink);
                imgBox.appendChild(imgItem);

                dropdownButton.appendChild(titleArrowBox);
                dropdownButton.appendChild(imgBox);
                dropdownBox.appendChild(dropdownButton);

                const list = document.createElement("ul");
                list.classList.add("dropdown-menu", "list-disc");
                itemDropDown.itemsArr.map((dropDownItemInList) => {
                    const listItem = document.createElement("li");
                    listItem.classList.add("dropdown-item");
                    listItem.innerText = `${dropDownItemInList}`;
                    list.appendChild(listItem);
                });

                dropdownBox.appendChild(list);
                optionsDetails.appendChild(dropdownBox);
                totalCounter.innerText=researchPackageTotal;
            });
        }

        function createDropdownsOfPackageCustom(data) {

        }

        function createDropdownsOfPackageCustom(data) {

        }


        const optionalSelectContent = {
            researchPackage: {
                innerContent: () => createDropdownsOfPackageAndUltimateResearch(dataDropdownsResearchPackage),
                additionalTextBottom: "Perfect for mining industry research! Encompasses Mine Type, Location, Address, Ownership, Deposit, Reserves, Commodity Production, LOM, Workforce, and Financials. Exceptonal value for your dollar!",
            },
            customPackage: {
                innerContent: () => createDropdownsOfPackageCustom(dataDropdownsCustomPackage),
                additionalTextBottom: "Ideal for business development, specialized research or when your budget is limited! Includes all Research Package data points plus your selection of optional data modules.",
            },
            ultimatePackage: {
                innerContent: () => createDropdownsOfPackageAndUltimateResearch(dataDropdownsUltimatePackage),
                additionalTextBottom: "Comprehensive mining intelligence! Best suitable for large corporations, consulting firms and institutional investors. Includes all Research Package data points and all optional data modules.",
            },
        };


        //create optional select
        const optionsSelect = new Choices('#optionsSelect', {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            choices: [
                {value: 'researchPackage', label: 'Research Package'},
                {value: 'customPackage', label: 'Custom Package'},
                {value: 'ultimatePackage', label: 'Ultimate Package'}
            ],
        });

        // Choices.js change event для optionsSelect
        optionsSelect.passedElement.element.addEventListener('change', (event) => {
            const value = event.detail.value;
            optionalSelectContent[value].innerContent();
            additionalTextOptionsSelect.innerHTML = optionalSelectContent[value].additionalTextBottom;
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
                            selectedOption: optionsSelect.getValue(true),
                            optionsDetails: optionsDetails.innerHTML,
                        };
                        selectedOptions.innerHTML = formData.optionsDetails;
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
                    regionsIng = [];
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
        optionalSelectContent.researchPackage.innerContent(dataDropdownsResearchPackage);
    });
})();


