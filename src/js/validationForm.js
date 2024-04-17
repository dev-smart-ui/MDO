function validateField(field) {
    if (!field.value.trim()) {
        const errorDiv = document.getElementById('error-' + field.id);
        if (errorDiv) {
            errorDiv.textContent = 'Please fill';
            errorDiv.style.display = 'block';
        }
        return false;
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
            errorDiv.textContent = 'Please fill';
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

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const errorDiv = document.getElementById('error-phone');
    const regex = /^\d+$/;
    if (phoneInput.value.trim() === '' || !regex.test(phoneInput.value)) {
        phoneInput.value = phoneInput.value.replace(/[^+\d]/g, '');
        phoneInput.value = phoneInput.value.replace(/(\+\d*)[^0-9].*/, '$1');
        if (errorDiv) {
            errorDiv.textContent = 'Please fill';
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
    let isValidAllInputs = true;

    // Check each required field
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        isValidAllInputs &= validateField(field);
    });

    const isValidPayment = validateRadioButtons();
    const isCheckboxAccepted = validateCheckboxAccepted();
    const isValidEmail = validateEmailInput();
    const isValidatePhone = validatePhone();

    if (isValidPayment && isCheckboxAccepted && isValidEmail && isValidatePhone && isValidAllInputs) {
        return true;
    } else {
        return false;
    }

}


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

document.getElementById('phone').addEventListener('input', function () {
    this.value = this.value.replace(/[^+\d]/g, '');
    this.value = this.value.replace(/(\+\d*)[^0-9].*/, '$1');
});

export {validateField, validateForm, validateCheckboxAccepted};