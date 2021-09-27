class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute()
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        };
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }

    /* (to have better presentation of display of calc, by separating big numbers with ",".
    also through the if condition line in updateDisplay(), we can present operation
    in the display) => getDisplayNumber()*/
    getDisplayNumber(number){
        /*this the first and simple version of this function:
        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en'); */
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        //the last format of integer part of the number
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        };
        // getting the decimal part and making the correct format of concatenation and return it
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        };
    }

    updateDisplay() {
        /*this.currentOperandText.innerText = this.currentOperand;
        we replace this line of code with getting value from getDisplayNumber()*/
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);

        /* this.previousOperandText.innerText = this.previousOperand; 
        we replace this line of code with new one and put it in the if condition*/
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        };
    }
}

/*
todo accessing to the html tags
*/
const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const equalsButton = document.querySelector('[equalsBtn]');
const deleteButton = document.querySelector('[deleteBtn]');
const clearButton = document.querySelector('[clearBtn]');
const previousOperandText = document.querySelector('[previous-operand]');
const currentOperandText = document.querySelector('[current-operand]');

// making an instantiate of Calculator Class
const calculator = new Calculator(previousOperandText, currentOperandText);

// selecting each of numbers and giving event listener to them
numberButtons.forEach(function(button){
    button.addEventListener('click', function(){
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// selecting each of operators and giving event listener to them
operationButtons.forEach(function(button){
    button.addEventListener('click', function(){
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// selecting equals button and giving event listener to it
equalsButton.addEventListener('click', function(){
    calculator.compute();
    calculator.updateDisplay();
});

// selecting clear button and giving event listener to it
clearButton.addEventListener('click', function(){
    calculator.clear();
    calculator.updateDisplay();
});

// selecting delete button and giving event listener to it
deleteButton.addEventListener('click', function(){
    calculator.delete();
    calculator.updateDisplay();
});