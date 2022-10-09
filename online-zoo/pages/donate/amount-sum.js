const arrayInputsOfSum = document.querySelectorAll('.progress-bar__input');
const inputAmount = document.querySelector('.input-amount');
const arrayOfValueInputs = [];

//create array of values of summ dollars
const createArrayOfInputsValue = () => {
    for (let i = 0; i < arrayInputsOfSum.length; i++) {
        arrayOfValueInputs.push(arrayInputsOfSum[i].value);
    }
};

createArrayOfInputsValue();

const hasValueInArrayOfValueInput = (curVal) => {
    if (arrayOfValueInputs.includes(curVal)) {
        return true;
    }
};

for (let i = 0; i < arrayInputsOfSum.length; i++) {
    if (arrayInputsOfSum[i].checked) {
        inputAmount.value = arrayInputsOfSum[i].value;
    }

    arrayInputsOfSum[i].addEventListener('change', () => {
        if (arrayInputsOfSum[i].checked) {
            inputAmount.value = arrayInputsOfSum[i].value;
        }
    });
}

inputAmount.addEventListener('input', () => {
    let currentValue = inputAmount.value;
    if (hasValueInArrayOfValueInput(currentValue)) {
        arrayInputsOfSum.forEach(inputItem => {
            if (inputItem.value == currentValue) {
                inputItem.checked = true;
            }
        });
    }
    else {
        arrayInputsOfSum.forEach(inputItem => {
            inputItem.checked = false;
        });
    }
    if (inputAmount.value.length > 4) {
        alert('Количество цифер в вводимой сумме должно быть не более 4-х.');
        inputAmount.value = '';
    }
});











/*
window.addEventListener('resize',function(){
    location.reload();  
});

let widthWindow = window.innerWidth;

let arrayInputsOfProgressBar = document.querySelectorAll('.progress-bar__input');

if (widthWindow <= 1600) {
    arrayInputsOfProgressBar[5].checked = "checked";
}


if (widthWindow <= 700) {
    arrayInputsOfProgressBar[5].checked = "checked";
}
*/