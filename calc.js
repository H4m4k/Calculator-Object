const screen = document.querySelector('#display');

const keys = document.querySelector('#keyboard');
const arithmeticKeys = document.querySelector('#arithmetic');
const operationKeys = document.querySelector('#functions');

keys.addEventListener('click', getNumberKey);
arithmeticKeys.addEventListener('click', getArithmeticOperator);
operationKeys.addEventListener('click', getFunctionPress);

const obiekt = {
    value: 0,
    operator: '',
    secondValue: 0,
    state: '',
    result: ''
};

const OPERATOR_PRESENT_KEY = 'operatorPresent'
const SECONDARY_VALUE_KEY = 'secondaryValue'

const OPERATIONS = {
    DIVIDE_BY_X: '1/x',
    CHANGE_SYMBOL: '+/-',
    CE: 'CE',
    C: 'C',
    PERCENT: '%',
}

const TYPES = {
    NUMBER: 'number',
    SIGN: 'sign',
    DOT: 'dot',
    OPERATION: 'arith',
    FUNCTION: 'funct',
    SQRT: 'sqrt'
}
const BUTTON_CLASS = ['button', 'shadow']
const NUMBER_KEYBOARD_CLASS = [...BUTTON_CLASS, TYPES.NUMBER]
const NUMBER_KEYBOARD_SIGN_CLASS = [...BUTTON_CLASS, TYPES.SIGN]
const NUMBER_KEYBOARD_DOT_CLASS = [...BUTTON_CLASS, TYPES.DOT]
const ARITHMETIC_KEYBOARD_CLASS = [...BUTTON_CLASS, TYPES.OPERATION]
const FUNCTION_KEYBOARD_CLASS = [...BUTTON_CLASS, TYPES.FUNCTION]
const SQRT_KEYBOARD_CLASS = [...FUNCTION_KEYBOARD_CLASS, TYPES.SQRT]

const CALCULATOR_KEYBOARD = [
    { order: 0, value: 7, classes: NUMBER_KEYBOARD_CLASS },
    { order: 1, value: 8, classes: NUMBER_KEYBOARD_CLASS },
    { order: 2, value: 9, classes: NUMBER_KEYBOARD_CLASS },
    { order: 3, value: 4, classes: NUMBER_KEYBOARD_CLASS },
    { order: 4, value: 5, classes: NUMBER_KEYBOARD_CLASS },
    { order: 5, value: 6, classes: NUMBER_KEYBOARD_CLASS },
    { order: 6, value: 1, classes: NUMBER_KEYBOARD_CLASS },
    { order: 7, value: 2, classes: NUMBER_KEYBOARD_CLASS },
    { order: 8, value: 3, classes: NUMBER_KEYBOARD_CLASS },
    { order: 9, value: OPERATIONS.CHANGE_SYMBOL, classes: NUMBER_KEYBOARD_SIGN_CLASS },
    { order: 10, value: 0, classes: NUMBER_KEYBOARD_CLASS },
    { order: 11, value: '.', classes: NUMBER_KEYBOARD_DOT_CLASS },
]

const ARITHMETIC_KEYBOARD = [
    { order: 0, value: 'DEL', classes: ARITHMETIC_KEYBOARD_CLASS, dataset: true },
    { order: 1, value: '/', classes: ARITHMETIC_KEYBOARD_CLASS, dataset: true },
    { order: 2, value: '*', classes: ARITHMETIC_KEYBOARD_CLASS, dataset: true },
    { order: 3, value: '-', classes: ARITHMETIC_KEYBOARD_CLASS, dataset: true },
    { order: 4, value: '+', classes: ARITHMETIC_KEYBOARD_CLASS, dataset: true },
    { order: 5, value: '=', classes: ARITHMETIC_KEYBOARD_CLASS, dataset: true },
]

const FUNCTIONS_KEYBOARD = [
    { order: 0, value: OPERATIONS.PERCENT, classes: FUNCTION_KEYBOARD_CLASS },
    { order: 1, value: OPERATIONS.CE, classes: FUNCTION_KEYBOARD_CLASS },
    { order: 2, value: OPERATIONS.C, classes: FUNCTION_KEYBOARD_CLASS },
    { order: 3, value: OPERATIONS.DIVIDE_BY_X, classes: FUNCTION_KEYBOARD_CLASS },
    { order: 4, value: 'x<sup>2</sup>', classes: FUNCTION_KEYBOARD_CLASS, html: true },
    { order: 5, value: '&#8730;', classes: SQRT_KEYBOARD_CLASS, html: true },
]

const renderButtons = (root, elements) => {
    elements.sort((a, b) => a.order - b.order).forEach(({ value, classes, dataset, html }) => {
        const div = document.createElement('div')
        div.attributes;
        if (html) {
            div.innerHTML = value
        } else {
            div.textContent = value;
        }

        if (dataset) div.dataset.operator = value;
        div.classList.add(...classes)
        root.appendChild(div)
    });

}

const initialize = () => {
    renderButtons(keys, CALCULATOR_KEYBOARD)
    renderButtons(arithmeticKeys, ARITHMETIC_KEYBOARD)
    renderButtons(operationKeys, FUNCTIONS_KEYBOARD)
}


const functionKeysOperations = (operation) => {
    
    switch (operation) {
    
        case OPERATIONS.PERCENT:
            return calculate('runPercent');   // not ready

        case OPERATIONS.CE:
            obiekt.secondValue = '';
            obiekt.operator = '';
            obiekt.state = '';
            return display(obiekt.value);  

        case OPERATIONS.C:
            clear();
            return display(0);

        case OPERATIONS.DIVIDE_BY_X:
            return display(setResult(1 / obiekt.value));

        case 'x2':
            return display(setResult(exponent(obiekt.value)));
    }
} // end.of.function


// ----=== LISTENER FUNCTIONS ===----- 

const numberKeys = (type) => {
    switch (screen.textContent) {

        case '0':
            return display(type);
    }
    return display(screen.textContent += type)
}


function getNumberKey(numberEvent) {
    if (numberEvent.target.classList.contains(TYPES.NUMBER)) { 
        return numberKeys(numberEvent.target.textContent);
    } else if (numberEvent.target.classList.contains(TYPES.DOT)) {
        return operatorCheck(numberEvent.target.textContent);
    } else if (numberEvent.target.classList.contains(TYPES.SIGN)) { 
        return display(obiekt.value *= -1);
    }
} // end.of.function


function getArithmeticOperator(operatorEvent) {
    const operation = operatorEvent.target.dataset.operator || null
    switch(operation) {
        case 'DEL':
            return del();

        case '=': 
            return screen.textContent = calculate();
        
    }

    if (operation) {
        obiekt.operator = operation;
        return operatorCheck(operation);
    }
} // end.of.function


function getFunctionPress(event) {
    if (event.target.classList.contains(TYPES.SQRT)) {  
        return display(Math.sqrt(obiekt.value));

    } else if (event.target.classList.contains(TYPES.FUNCTION)) { 
        return functionKeysOperations(event.target.textContent)
    } 
} // end.of.function



// ----=== SUPPORT FUNCTIONS ===----- 


function exponent(number) {
    return setResult(screen.textContent = number ** 2);
} // end.of.function


function display(content) {
   /* display is controlled through changing the state of the object 'obiekt'.
    The display sentence is completed through assigning values to object keys.
    Display components are : 
    1st - obiekt.value
    2nd - obiekt.operator
    3rd - obiekt.secondValue 
    */

    console.log(`value = ${obiekt.value} operator = ${obiekt.operator} secondValue =  ${obiekt.secondValue}`)
    switch (obiekt.state) {
        case '':
            obiekt.value = content;
            return screen.textContent = `${obiekt.value}`;

        case OPERATOR_PRESENT_KEY:
            obiekt.state = SECONDARY_VALUE_KEY;
            return screen.textContent = `${obiekt.value}${obiekt.operator}`;

        case SECONDARY_VALUE_KEY:
            secondValue();
            return screen.textContent= `${obiekt.value}${obiekt.operator}${obiekt.secondValue}`;
    }
 } // end.of.function


function secondValue() {
    let arr = screen.textContent.split(obiekt.operator);
    const [arrOne , arrTwo] = arr;
    obiekt.value = arrOne*1;
    obiekt.secondValue = arrTwo*1;
    return;
} // end.of.function

function clear() {
    obiekt.value = '';
    obiekt.operator = '';
    obiekt.secondValue = '';
    obiekt.state = '';
} // end.of.function


function operatorCheck(operator) {
    if (!screen.textContent.includes(operator)) {
        switch (obiekt.state) {

            case '':

            if (operator === '.') {
                console.log(operator)
                obiekt.state = '';
                return display(obiekt.value + operator);

            } else if (operator === '=') {
                obiekt.state = 'equal'; // obiekt.state should be cleared

            } else {
                obiekt.operator = operator;
                obiekt.state = OPERATOR_PRESENT_KEY;
                return display();
            }

            case OPERATOR_PRESENT_KEY:
                return display();
        }
    }
} // end.of.function


function del() {
    return display(screen.textContent.slice(0,-1));
} // end.of.function

function calculate(test) {
    switch (obiekt.operator) {
        case '':
            break;
        
        case '/':
            return (test)?setResult(obiekt.value / percent()):setResult(obiekt.value / obiekt.secondValue);

        case '*':
            return (test)?setResult(obiekt.value * percent()):setResult(obiekt.value * obiekt.secondValue);
        
        case '+':
            return (test)?setResult(obiekt.value + percent()):setResult(obiekt.value + obiekt.secondValue);

        case '-':
            return (test)?setResult(obiekt.value - percent()):setResult(obiekt.value - obiekt.secondValue);

    }
} // end.of.function

function setResult(result) {
    clear();
    obiekt.value = result;
    return screen.textContent = result.toString().substring(0,15);
} // end.of.function

function percent() {
    return obiekt.secondValue = (obiekt.value * obiekt.secondValue)/100; 
}

initialize()

/* Project guidelines:

Screen = value operator secondValue

Number object keys:                             // done
1. value
2. operator - for selecting the operation
3. secondValue
  a. state ( before or after operation) ??
  b. result ( clear the screen after pressing equal and return the value to 1.)

Operation object keys:
1. Type of operation (
  a. +  // done
  b. -  // done
  c. *  // done
  d. /  // done
  e. sqr  // done
  f. **   // done
  g. %    // done
  h. 1/x  // done
  i. CE   // done
  j. C    // done
  k. DEL  // done


// Used as a key of object instead of a independent object 
Result object keys
1. value
2. state

Functions:
1. opSelector - ad.7 operotarCheck  // done 
2. setSign - set sign of number                // done
3. checkState - check the state of the number ( before or after operation)  // done   operator check and display use this in switch/case
4. delScreenElement - remove last number added  // done
5. displayFunction                             // done
6. FunctionPress - listener for pressing of buttons // done
7. checkOperator - checks for any adjacent . or arithmetic operators  // done
8. clear - resets the display, object state, object operator  // done

QoL:
1. Prevent multiple signs in adjacent places    // done
2. Prevent multiple decimal separators in adjacent places // done
3. Math round (substring or toFixed with regular expression) numbers that overexpand the display size  // done
4. Allow operations on two decimal numbers
*/
