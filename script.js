// basic math function
const math = {
    '+': (a, b) => a+b,
    '-': (a, b) => a-b,
    '*': (a, b) => a*b,
    '/': (a, b) => a/b,
};

let num1 = '0';
let num2 = '';
let operator = '';

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    }
}

let doneCalculating = true; // if doneCalculating true => when typing in new number, the creen will reset
let doneNum1 = true;
let doneNum2 = false;

const screen = document.querySelector('.screen');
const numbs = document.querySelectorAll('.numb');
const operators = document.querySelectorAll('.operator > button');
const equal = document.querySelector('#equal');
const reset = document.querySelector('#reset');

function addScreenContent(content) {
    screen.textContent = content;
}
function resetScreen() {
    screen.textContent = '';
}
function error() {
    screen.textContent = 'ERROR';
}

for (let numb of numbs) {
    numb.addEventListener('click', () => {
        if (operator === '') {
            if (doneCalculating === true) {            
                doneCalculating = false;
                resetScreen();
                num1 = '';
                doneNum1 = false;
                num1 += numb.value;
                addScreenContent(num1);
            } else if (doneNum1 === false) {
                num1 += numb.value;
                addScreenContent(num1);
            } else if (doneNum1 === true) {
                num2 += numb.value;
                addScreenContent(num2);
            }
        } else {
            num2 += numb.value;
            addScreenContent(num2);
            doneCalculating = false;
        }
    });
}
let result;

for (let oper of operators) {
    oper.addEventListener('click', () => {
    
        if (doneCalculating === true) {
            operator = oper.value;
            doneCalculating = false;
            doneNum1 = true
        } else if (doneNum1 === false) {
            doneNum1 = true;
            operator = oper.value;
        } else if (doneNum1 === true) {
            doneCalculating = true;
            if (num2 === '' || (num2 === '0' && operator === '/')) {
                error();  
                num1 = '0';
                num2 = '' ;
                operator = '';
            } else {
                result = Math.round((math[operator](+num1, +num2))*1000000)/1000000;
                num1 = result.toString();
                addScreenContent(num1);
                num2 = '';
                operator = oper.value;
            }
        }
        
    });
}

equal.addEventListener('click', () => {
    if (operator === '') {
        addScreenContent(num1);
    } else {
        if (num2 === '' || (num2 === '0' && operator === '/')) {
            error();  
            num1 = '0';
        } else {
            result = Math.round((math[operator](+num1, +num2))*1000000)/1000000 ;
            num1 = result.toString();
            addScreenContent(num1);
        }
    }
    num2 = '';
    operator = '';
    doneCalculating = true;
    doneNum1 = true;
});

reset.addEventListener('click', () => {
    num1 = '0';
    num2 = '';
    operator = '';
    doneNum1 = true;
    doneCalculating = true;
    resetScreen();
});

// if doneNum1 == false => make num1 until type in an operator => save the operator infor
// if doneNum1 == True and oprator has a valid value => make num2 until type in an operator, make the calcalation and save it to num1, doneNum1 = true