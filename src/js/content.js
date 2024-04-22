import {calculateTotal} from "./helpers.js";

let selectedItems = {};

function createDropdownsOfPackageResearch(data, packageTotal) {
    const optionsDetails = document.getElementById('optionsDetails');
    const totalCounter = document.getElementById('totalCounter');

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
        totalCounter.innerText = packageTotal;
    });
}

function createDropdownsOfPackageCustom(data, currentPackageSelect,) {
    const optionsDetails = document.getElementById('optionsDetails');

    optionsDetails.innerHTML = '';
    selectedItems={}

    data.map((itemDropDown, index) => {
        const dropdownBox = document.createElement("div");

        if (index === 0) dropdownBox.classList.add("dropdown-box", "default-price");
        dropdownBox.classList.add("dropdown-box");

        const toggleContainer = document.createElement("div");
        toggleContainer.classList.add("toggle-container", "flex");

        const dropdownButton = document.createElement("button");
        dropdownButton.classList.add("dropdown-toggle", "dropdown-custom", "flex", "items-center", "flex-row-reverse", "justify-end");

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

        if (index > 0) {
            const label = document.createElement("label");
            label.htmlFor = `checkbox-${index}`;
            label.classList.add("check-box-label", "flex", "items-center");

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.id = `checkbox-${index}`;
            checkBox.setAttribute("data-name-checkbox", itemDropDown.btnTitle);
            checkBox.classList.add("check-box-list");

            const checkmark = document.createElement("span");
            checkmark.classList.add("checkmark");

            const priceString = document.createElement("span");
            priceString.classList.add("price-string");
            priceString.innerText = `$${itemDropDown.price}.00`;


            checkBox.addEventListener('click', function () {
                if (this.checked) {
                    selectedItems[index] = {
                        name: checkBox.getAttribute("data-name-checkbox"),
                        price: itemDropDown.price
                    };

                    checkBox.classList.add("checked-custom-value");
                } else {
                    delete selectedItems[index];
                    checkBox.classList.remove("checked-custom-value");
                }
                calculateTotal(currentPackageSelect);

            });


            label.appendChild(checkBox);
            label.appendChild(priceString);
            label.appendChild(checkmark);
            toggleContainer.appendChild(dropdownButton);
            toggleContainer.appendChild(label);
        } else {
            const priceBox = document.createElement("span");
            priceBox.classList.add("default-price-string");
            priceBox.innerText = `$${itemDropDown.price}`;

            dropdownButton.appendChild(priceBox);
            toggleContainer.appendChild(dropdownButton);
        }


        dropdownButton.appendChild(titleArrowBox);
        dropdownButton.appendChild(imgBox);
        dropdownBox.appendChild(toggleContainer);

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
    });
}

function createDropdownsOfUltimate(data, packageTotal) {
    const optionsDetails = document.getElementById('optionsDetails');
    const totalCounter = document.getElementById('totalCounter');

    optionsDetails.innerHTML = '';
    let total = packageTotal;

    data.map((itemDropDown, index) => {
        const dropdownBox = document.createElement("div");

        dropdownBox.classList.add("dropdown-box", "default-price");

        const toggleContainer = document.createElement("div");
        toggleContainer.classList.add("toggle-container", "flex");

        const dropdownButton = document.createElement("button");
        dropdownButton.classList.add("dropdown-toggle", "dropdown-custom", "flex", "items-center", "flex-row-reverse", "justify-end");

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


        const priceBox = document.createElement("span");
        priceBox.classList.add("default-price-string");
        priceBox.innerText = `$${itemDropDown.price}.00`;

        dropdownButton.appendChild(priceBox);
        toggleContainer.appendChild(dropdownButton);


        dropdownButton.appendChild(titleArrowBox);
        dropdownButton.appendChild(imgBox);
        dropdownBox.appendChild(toggleContainer);

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
        totalCounter.innerText = packageTotal;
    });
}


const dataDropdownsResearchPackage = [
    {
        btnTitle: "Mine / Project Overview",
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Ownership",
        imgLink: 'src/images/step-form/listItem2.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Deposit Type & Geology",
        imgLink: 'src/images/step-form/listItem3.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Reserves & Resources",
        imgLink: 'src/images/step-form/listItem4.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Commodity Production",
        imgLink: 'src/images/step-form/listItem5.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Workforce",
        imgLink: 'src/images/step-form/listItem6.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Technical & Annual Reports",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "Data Download",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company"]
    },
    {
        btnTitle: "Search Assets by:",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company"]
    },


];
const dataDropdownsCustomPackage = [
    {
        btnTitle: "Research Package",
        price: 2000.00,
        imgLink: 'src/images/step-form/custom1.png',
        itemsArr: ["Mine / Project Overview", "Ownership", "Deposit Type & Geology", "Reserves & Resources", "Commodity Production", "Workforce", "Mine Financials", "Technical & Annual Reports", "Data Download", "Search Assets by",]
    },
    {
        btnTitle: "Key Managers and Superintendents",
        price: 100.00,
        imgLink: 'src/images/step-form/custom2.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Heavy Mobile Equipment (optional)",
        price: 100.00,
        imgLink: 'src/images/step-form/custom3.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Mineral Processing",
        price: 100.00,
        imgLink: 'src/images/step-form/custom4.png',
        itemsArr: ["Processing Technologies", "Reagents", "Recovery Technologies", "Recovery Rates", "Flowsheet Diagrams",]
    },
    {
        btnTitle: "Project Costs and Returns ",
        price: 100.00,
        imgLink: 'src/images/step-form/custom5.png',
        itemsArr: ["CapEx", "OpEx", "Revenue", "Cash Flow"]
    },
    {
        btnTitle: "Mining Contracts (optional)",
        price: 100.00,
        imgLink: 'src/images/step-form/custom6.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Mapper and Coordinates",
        price: 100.00,
        imgLink: 'src/images/step-form/custom7.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Mining Operations (optional)",
        price: 100.00,
        imgLink: 'src/images/step-form/custom8.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Crushing and Grinding Equipment",
        price: 100.00,
        imgLink: 'src/images/step-form/custom9.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Production Costs",
        price: 100.00,
        imgLink: 'src/images/step-form/custom10.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Project Timeline",
        price: 100.00,
        imgLink: 'src/images/step-form/custom11.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Remote Camps",
        price: 100.00,
        imgLink: 'src/images/step-form/custom12.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Pipelines and Water Supply",
        price: 100.00,
        imgLink: 'src/images/step-form/custom13.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company", ]
    },
    {
        btnTitle: "Additional user license",
        price: 100.00,
        imgLink: 'src/images/step-form/custom14.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Power Supply",
        price: 100.00,
        imgLink: 'src/images/step-form/custom15.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
];
const dataDropdownsUltimatePackage = [
     {
        btnTitle: "Research Package",
        price: 2000.00,
        imgLink: 'src/images/step-form/custom1.png',
        itemsArr: ["Mine / Project Overview", "Ownership", "Deposit Type & Geology", "Reserves & Resources", "Commodity Production", "Workforce", "Mine Financials", "Technical & Annual Reports", "Data Download", "Search Assets by",]
    },
    {
        btnTitle: "Key Managers and Superintendents",
        price: 100.00,
        imgLink: 'src/images/step-form/custom2.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Heavy Mobile Equipment (optional)",
        price: 100.00,
        imgLink: 'src/images/step-form/custom3.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Mineral Processing",
        price: 100.00,
        imgLink: 'src/images/step-form/custom4.png',
        itemsArr: ["Processing Technologies", "Reagents", "Recovery Technologies", "Recovery Rates", "Flowsheet Diagrams",]
    },
    {
        btnTitle: "Project Costs and Returns ",
        price: 100.00,
        imgLink: 'src/images/step-form/custom5.png',
        itemsArr: ["CapEx", "OpEx", "Revenue", "Cash Flow"]
    },
    {
        btnTitle: "Mining Contracts (optional)",
        price: 100.00,
        imgLink: 'src/images/step-form/custom6.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Mapper and Coordinates",
        price: 100.00,
        imgLink: 'src/images/step-form/custom7.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Mining Operations (optional)",
        price: 100.00,
        imgLink: 'src/images/step-form/custom8.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Crushing and Grinding Equipment",
        price: 100.00,
        imgLink: 'src/images/step-form/custom9.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Production Costs",
        price: 100.00,
        imgLink: 'src/images/step-form/custom10.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Project Timeline",
        price: 100.00,
        imgLink: 'src/images/step-form/custom11.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Remote Camps",
        price: 100.00,
        imgLink: 'src/images/step-form/custom12.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Pipelines and Water Supply",
        price: 100.00,
        imgLink: 'src/images/step-form/custom13.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company", ]
    },
    {
        btnTitle: "Additional user license",
        price: 100.00,
        imgLink: 'src/images/step-form/custom14.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
    {
        btnTitle: "Power Supply",
        price: 100.00,
        imgLink: 'src/images/step-form/custom15.png',
        itemsArr: ["Includes: 7,000 decision makers and consultants", "Search by job category, job title, consulting company",]
    },
];

export {
    createDropdownsOfPackageResearch,
    createDropdownsOfPackageCustom,
    createDropdownsOfUltimate,
    dataDropdownsResearchPackage,
    dataDropdownsCustomPackage,
    dataDropdownsUltimatePackage,
    selectedItems
};