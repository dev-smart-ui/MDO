(()=>{
    const formSteps = document.querySelectorAll(".step");
    const toStep2Button = document.getElementById("toStep2");
    const toStep3Button = document.getElementById("toStep3");
    const finishButton = document.getElementById("finish");
    const optionsSelect = document.getElementById("optionsSelect");
    const optionsList = document.getElementById("optionsList");

    let formData = {};

// Функция для переключения шагов
    function switchStep(currentStep, nextStep) {
        formSteps[currentStep].style.display = 'none';
        formSteps[nextStep].style.display = 'flex';
    }

// Обработка событий для переключения шагов
    toStep2Button.addEventListener("click", () => switchStep(0, 1));
    toStep3Button.addEventListener("click", () => switchStep(1, 2));
    finishButton.addEventListener("click", () => {
        console.log(formData);
        // Отправка данных на бэкенд
    });

// Логика для обновления правой части при выборе опции
    optionsSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        // Обновление правой части в зависимости от выбранной опции
        if (value === "basic") {
            optionsList.innerHTML = "<p>Опция Basic</p>";
        } else if (value === "customResearch") {
            optionsList.innerHTML = "<p>Опция Custom Research</p>";
        } else if (value === "ultimate") {
            optionsList.innerHTML = "<p>Опция Ultimate</p>";
        }
        // Сохранение выбранной опции в formData
        formData['selectedOption'] = value;
    });

    console.log('tezr')
})()