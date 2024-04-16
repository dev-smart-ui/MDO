function showError(element, message) {
    const errorDiv = document.getElementById('error-' + element.id);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearError(element) {
    const errorDiv = document.getElementById('error-' + element.id);
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}
function clearErrorForSelect(selectorId) {
    const errorDiv = document.getElementById('error-' + selectorId);
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function validateChoicesSelect(choicesInstance, selectId) {
    const selectedValue = choicesInstance.getValue(true);
    if (!selectedValue) {
        showError(document.getElementById(selectId), 'This select is required');
        return false;
    } else {
        clearError(document.getElementById(selectId));
        return true;
    }
}

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

function validateForm() {
    let isValid = true;

    // Check each required field
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        isValid &= validateField(field); // Вызываем функцию валидации для каждого поля
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


document.getElementById('phone').addEventListener('input', function(e) {
    // Разрешаем только номера, знаки плюса, тире и пробелы
    const regex = /^[+0-9\s-]*$/;
    if (!regex.test(this.value)) {
        // Если введены недопустимые символы, очищаем поле
        this.value = this.value.replace(/[^+0-9\s-]/g, '');
    }
});

// Connect the validation function to all fields with the required attribute
document.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
        validateField(field);
    });
});

export {showError,clearError, validateChoicesSelect, validateField, validateForm, clearErrorForSelect}