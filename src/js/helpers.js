
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


export {setupDropdownToggle}