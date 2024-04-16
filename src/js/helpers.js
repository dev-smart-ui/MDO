import {validateField} from "./validationForm";

window.addEventListener('DOMContentLoaded', ()=>{
    // Connect the validation function to all fields with the required attribute
    document.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('input', () => {
            validateField(field);
        });
    });

})
