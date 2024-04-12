/*
import { optionalSelectContent } from './content.js';

 function createDropdownsOfPackageResearch(data) {
     const optionsDetails = document.getElementById('optionsDetails');

    data.map((itemDropDown, index) => {
        const dropdownBox = document.createElement("div");
        dropdownBox.classList.add("dropdown-box");

        const dropdownButton = document.createElement("button");
        dropdownButton.classList.add("dropdown-toggle");
        dropdownButton.setAttribute('data-dropdown-toggle', index);
        dropdownButton.innerText = itemDropDown.btnTitle;

        const imgItem = document.createElement("img");
        imgItem.setAttribute('src', itemDropDown.imgLink);


        dropdownButton.appendChild(imgItem);
        dropdownBox.appendChild(dropdownButton);

        const list = document.createElement("ul");
        list.classList.add("dropdown-menu");
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
 function createDropdownsOfPackageCustom(data) {
    // Ваш код для customPackage...
}

 function createDropdownsOfPackageUltimate(data) {
    // Ваш код для ultimatePackage...
}

document.addEventListener('DOMContentLoaded', () => {


    // Поскольку вы импортировали optionalSelectContent, вы можете использовать его здесь.
    optionalSelectContent.researchPackage.innerContent = createDropdownsOfPackageResearch;
    optionalSelectContent.customPackage.innerContent = createDropdownsOfPackageCustom;
    optionalSelectContent.ultimatePackage.innerContent = createDropdownsOfPackageUltimate;
});

export { createDropdownsOfPackageResearch, createDropdownsOfPackageCustom, createDropdownsOfPackageUltimate };


*/
