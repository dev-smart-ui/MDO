
import {
    createDropdownsOfPackageCustom,
    createDropdownsOfPackageResearch, createDropdownsOfUltimateCustom, dataDropdownsCustomPackage,
    dataDropdownsResearchPackage, dataDropdownsUltimatePackage
} from "./content.js";

function setupDropdownToggle(element) {
    element.addEventListener('click', (event) => {
        const dropDownButton = event.target.closest('.dropdown-toggle');
        if (dropDownButton) {
            const dropdownBox = dropDownButton.closest('.dropdown-box');
            if (dropdownBox) {
                dropdownBox.classList.toggle('drop-down-item-open');
            }
        }
    });
}
const optionalSelectContent = {
    researchPackage: {
        name:"Research Package",
        innerContent: () => createDropdownsOfPackageResearch(dataDropdownsResearchPackage, researchPackageTotal),
        additionalTextBottom: "Perfect for mining industry research! Encompasses Mine Type, Location, Address, Ownership, Deposit, Reserves, Commodity Production, LOM, Workforce, and Financials. Exceptonal value for your dollar!",
    },
    customPackage: {
        name:"Custom Package",
        innerContent: () => createDropdownsOfPackageCustom(dataDropdownsCustomPackage, customPackageTotal),
        additionalTextBottom: "Ideal for business development, specialized research or when your budget is limited! Includes all Research Package data points plus your selection of optional data modules.",
    },
    ultimatePackage: {
        name:"Ultimate Package",
        innerContent: () => createDropdownsOfUltimateCustom(dataDropdownsUltimatePackage, ultimatePackageTotal),
        additionalTextBottom: "Comprehensive mining intelligence! Best suitable for large corporations, consulting firms and institutional investors. Includes all Research Package data points and all optional data modules.",
    },
};

export {setupDropdownToggle, optionalSelectContent}