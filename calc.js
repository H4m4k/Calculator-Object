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
    state: ''
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

// ----=== ARROW FUNCTIONS ===----- 


const functionKeysOperations = (operation) => {
    switch (operation) {

        case OPERATIONS.PERCENT:
            return display(OPERATIONS.PERCENT);   // not ready

        case OPERATIONS.CE:
            return display(OPERATIONS.CE);   // not ready

        case OPERATIONS.C:
            clear();
            return display(0);

        case OPERATIONS.DIVIDE_BY_X:
            return display(1 / obiekt.value);

        case 'x2':
            return display(exponent(obiekt.value));
    }
} // end.of.function


const numberKeys = (type) => {
    switch (screen.textContent) {

        case '0':
            return display(screen.textContent = type);
    }
    return display(screen.textContent += type)
}


function getNumberKey(numberEvent) {
    if (numberEvent.target.classList.contains(TYPES.NUMBER)) {  // keyboard listener
        return numberKeys(numberEvent.target.textContent)
    }
} // end.of.function

function getArithmeticOperator(operator) {
    const operation = operator.target.dataset.operator || null

    if (operation) {
        obiekt.operator = operation;
        return operatorCheck(operation);
    }
} // end.of.function


function getFunctionPress(event) {
    if (event.target.classList.contains(TYPES.SQRT)) {  // functions listener
        return display(Math.sqrt(obiekt.value));

    } else if (event.target.classList.contains(TYPES.FUNCTION)) {   // functions listener
        return functionKeysOperations(event.target.textContent)

    } else if (event.target.classList.contains(TYPES.SIGN)) { // sign change
        return display(screen.textContent *= -1);

    } else if (event.target.classList.contains(TYPES.DOT)) {
        operatorCheck(event.target.textContent);
    }
} // end.of.function


function exponent(number) {
    return screen.textContent = number ** 2;
} // end.of.function


function display(content) {

    switch (obiekt.state) {
        case '':
            obiekt.value = content * 1;
            return screen.textContent = `${obiekt.value}`;

        case OPERATOR_PRESENT_KEY:
            return screen.textContent = `${obiekt.value}${obiekt.operator}`

        case SECONDARY_VALUE_KEY:
            obiekt.secondValue = content * 1;
            return screen.textContent = `${obiekt.value}${obiekt.operator}${obiekt.secondValue}`
    }
} // end.of.function


function clear() {
    obiekt.operator = '';
    obiekt.state = '';
}


function operatorCheck(operator) {
    if (!screen.textContent.includes(operator)) {
        switch (obiekt.state) {
            case '':
                obiekt.operator = operator;
                obiekt.state = OPERATOR_PRESENT_KEY;
                return display(screen.textContent + obiekt.operator)

            case OPERATOR_PRESENT_KEY:
                return display(screen.textContent);

        }
    }
} // end.of.function


initialize()


/* Project guidelines:

Screen = value operator secondValue

Number object keys:                             // done
1. value
2. operator - for selecting the operation
3. secondValue
  a. state ( before or after operation) ??
  b. Possible sub-states ??

Operation object keys:
1. Type of operation (
  a. +
  b. -
  c. *
  d. /
  e. sqr  // done
  f. **   // done
  g. %
  h. 1/x  // done
  i. CE
  j. C    // done
  k. DEL

Result object keys
1. value
2. state

Functions:
1. opSelector - operation selector
2. setSign - set sign of number                // done
3. checkState - check the state of the number ( before or after operation)
4. delScreenElement - remove last number added
5. displayFunction                             // doneFunctionPress - listener for pressing of buttons // done
7. checkOperator - checks for any adjacent . or arithmetic operators  // done
8. clear - resets the display, object state, object operator  // done

QoL:
1. Prevent multiple signs in adjacent places    // done
2. Prevent multiple decimal separators in adjacent places // done
3. Math round numbers that overexpand the display size

*/
