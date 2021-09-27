//Calculating functions

function clearDisplay(){
    previousOperand = '';
    currentOperand = '';
    currentOperation = undefined;
}

function deleteDisplay(){
    currentOperand = currentOperand && currentOperand.toString().slice(0, -1);
}

function appendNumber(number){
    if(number == '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand ? currentOperand.toString() + number.toString() : number.toString();
}

function chooseOperation(operation){
    if(currentOperand === '') return;
    if(previousOperand !== ''){
        compute();
    };
    currentOperation = operation;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute(){
    let computation;
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(previous) || isNaN(current)) return;
    switch (currentOperation) {
        case '+':
            computation = previous + current;
            break;
        case '-':
            computation = previous - current;
            break;
        case '✕':
            computation = previous * current;
            break;
        case '÷':
            computation = previous / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    previousOperand = '';
    currentOperation = undefined;
}

function displayNumberFormat(number){
    let integerDisplay;
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    if(isNaN(integerDigits)){
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    };
    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay;
    };
}

function updateDisplay(){
    currentOperandText.innerText = displayNumberFormat(currentOperand);
    if(currentOperation != null){
        previousOperandText.innerText = `${displayNumberFormat(previousOperand)} ${currentOperation}` ;
    }else{
        previousOperandText.innerText = '';
    }
}

function equalsFunctionSetting(){
    currentOperand = '';
}


//accessing to the html tags
const clearButton = document.querySelector('[clearBtn]');
const deleteButton = document.querySelector('[deleteBtn]');
const equalsButton = document.querySelector('[equalsBtn]');
const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const previousOperandText = document.querySelector('[previous-operand]');
const currentOperandText = document.querySelector('[current-operand]');
let currentOperand;
let previousOperand;
let currentOperation;

// selecting each of numberButtons and adding event listener to them
numberButtons.forEach(function(button){
    button.addEventListener('click', function(){
        appendNumber(button.innerText);
        updateDisplay();
    });
});

// selecting each of numberButtons and adding event listener to them
operationButtons.forEach(function(button){
    button.addEventListener('click', function(){
        chooseOperation(button.innerText);
        updateDisplay();
    });
});

// selecting clearButton and adding event listener to it
clearButton.addEventListener('click', function(){
    clearDisplay();
    updateDisplay();
});

// selecting deleteButton and adding event listener to it
deleteButton.addEventListener('click', function(){
    deleteDisplay();
    updateDisplay();
});

// selecting equalsButton and adding event listener to it
equalsButton.addEventListener('click', function(){
    compute();
    updateDisplay();
    equalsFunctionSetting();
});
