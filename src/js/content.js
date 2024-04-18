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

let selectedItems = {};

function createDropdownsOfPackageCustom(data, packageTotal) {
    const optionsDetails = document.getElementById('optionsDetails');
    const totalCounter = document.getElementById('totalCounter');

    optionsDetails.innerHTML = '';
    let total = packageTotal;

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

                    total += itemDropDown.price;
                    checkBox.classList.add("checked-custom-value");
                } else {
                    total -= itemDropDown.price;
                    checkBox.classList.remove("checked-custom-value");
                }

                totalCounter.innerText = `${total}`;
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
        totalCounter.innerText = packageTotal;
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
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "Mine Financials",
        imgLink: 'src/images/step-form/listItem7.png',
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
        price: 2000.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "2Ownership",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem2.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "3Deposit Type & Geology",
        price: 20.00,
        imgLink: 'src/images/step-form/listItem3.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "4Reserves & Resources",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem4.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "5Commodity Production",
        price: 10.00,
        imgLink: 'src/images/step-form/listItem5.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "6Workforce",
        price: 10.00,
        imgLink: 'src/images/step-form/listItem6.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "7Mine Financials",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
];
const dataDropdownsUltimatePackage = [
    {
        btnTitle: "1Mine / Project Overview",
        price: 2000.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "2Ownership",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem2.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "3Deposit Type & Geology",
        price: 20.00,
        imgLink: 'src/images/step-form/listItem3.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "4Reserves & Resources",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem4.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "5Commodity Production",
        price: 10.00,
        imgLink: 'src/images/step-form/listItem5.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "6Workforce",
        price: 10.00,
        imgLink: 'src/images/step-form/listItem6.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "7Mine Financials",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem7.png',
        itemsArr: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
    },
    {
        btnTitle: "1Mine / Project Overview",
        price: 12.00,
        imgLink: 'src/images/step-form/listItem1.png',
        itemsArr: ["Geographic Location", "Mine Office Address", "Development Stage", "Mine Type", "Commodities", "Life of Mine"]
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