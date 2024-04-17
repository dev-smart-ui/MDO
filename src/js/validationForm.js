function validateField(field) {

    if (!field.value.trim()) {
        const errorDiv = document.getElementById('error-' + field.id);
        if (errorDiv) {
            errorDiv.textContent = 'Please fill';
            errorDiv.style.display = 'block';
        }
        return false;
    } else if (field.id==="email"){
        validateEmailInput()
    } else {
        const errorDiv = document.getElementById('error-' + field.id);
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
        return true;
    }
}

function validateCheckboxAccepted() {
    // Check the agree to terms of use checkbox
    const termsCheckbox = document.getElementById('checkboxAccepted');
    if (!termsCheckbox.checked) {
        const errorDiv = document.getElementById('error-' + termsCheckbox.id);
        if (errorDiv) {
            errorDiv.textContent = 'You must accept the terms of use';
            errorDiv.style.display = 'block';
        }
        return false;
    } else {
        const errorDiv = document.getElementById('error-' + termsCheckbox.id);
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
        return true;
    }
}

function validateRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"][name="payment"]');
    const isSelected = Array.from(radioButtons).some(radio => radio.checked);
    const errorDiv = document.getElementById('error-radio');

    if (!isSelected) {
        if (errorDiv) {
            errorDiv.textContent = 'Please select a payment method';
            errorDiv.style.display = 'block';
        }
        return false;
    } else {
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
        return true;
    }
}

function validateEmailInput() {
    const emailInput = document.getElementById('email');
    const errorDiv = document.getElementById('error-email');
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailInput.value.match(emailPattern)) {
        if (errorDiv) {
            errorDiv.textContent = 'Please fill properly';
            errorDiv.style.display = 'block';
        }
        return false;
    } else {
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
        return true;
    }
}


function validateForm() {
    let isValid = true;

    // Check each required field
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        isValid &= validateField(field);
    });

    const isValidPayment = validateRadioButtons();
    const isCheckboxAccepted = validateCheckboxAccepted();


    return !(!isValidPayment && !isCheckboxAccepted);

}

//number input validation
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('phone').addEventListener('input', function (e) {
        const regex = /^[+0-9\s-]*$/;
        if (!regex.test(this.value)) {
            this.value = this.value.replace(/[^+0-9\s-]/g, '');
        }
    });
});

//update radio buttons error state
document.querySelectorAll('[data-radio-item]').forEach(item => {
    item.addEventListener('click', validateRadioButtons);
});


// Connect the validation function to all fields with the required attribute
document.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
        validateField(field);
    });
});

export {validateField, validateForm, validateCheckboxAccepted};