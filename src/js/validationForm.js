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

function validateAccessCheckBox(){
    // Check the agree to terms of use checkbox
    const termsCheckbox = document.getElementById('checkboxAccepted');
    if (!termsCheckbox.checked) {
        const errorDiv = document.getElementById('error-' + termsCheckbox.id);
        if (errorDiv) {
            errorDiv.textContent = 'You must accept the terms of use';
            errorDiv.style.display = 'block';
        }
    } else {
        const errorDiv = document.getElementById('error-' + termsCheckbox.id);
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
}

function validateForm() {
    let isValid = true;

    // Check each required field
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        isValid &= validateField(field);
    });


    // Check the agree to terms of use checkbox
    const termsCheckbox = document.getElementById('checkboxAccepted');
    if (!termsCheckbox.checked) {
        const errorDiv = document.getElementById('error-' + termsCheckbox.id);
        if (errorDiv) {
            errorDiv.textContent = 'You must accept the terms of use';
            errorDiv.style.display = 'block';
        }
        isValid = false;
    } else {
        const errorDiv = document.getElementById('error-' + termsCheckbox.id);
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }

    return isValid;
}

window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('phone').addEventListener('input', function(e) {
        const regex = /^[+0-9\s-]*$/;
        if (!regex.test(this.value)) {
            this.value = this.value.replace(/[^+0-9\s-]/g, '');
        }
    });
})


// Connect the validation function to all fields with the required attribute
document.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
        validateField(field);
    });
});

export { validateField, validateForm, validateAccessCheckBox }