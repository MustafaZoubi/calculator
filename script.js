function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "Try again, Einstein.";
    }
    return a / b;
}
function operate(operator, a, b) {
    if (a == undefined || b == undefined || operator == undefined)
        return;

    switch (operator) {
        case "+":
            return add(a, b);

        case "–":
            return subtract(a, b);

        case "×":
            return multiply(a, b);

        case "÷":
            return divide(a, b);
    }
}

let num1 = "", num2 = "", operator = "";


//==Elements==

//Numbers 
const numbers = Array.from(document.querySelectorAll(".number"));

//Operators
const addBtn = document.querySelector(".add");
const subtractBtn = document.querySelector(".subtract");
const multiplyBtn = document.querySelector(".multiply");
const divideBtn = document.querySelector(".divide");
const equal = document.querySelector(".equal");
const operators = Array.from(document.querySelectorAll(".operator"));

//Operations
const clearAll = document.querySelector(".clear");
const clearDigit = document.querySelector(".erase");
const dot = document.querySelector(".dot");

//Display
const screen = document.querySelector(".screen");

//Event Listeners

numbers.forEach((number) => number.addEventListener("click", handlePress));
addBtn.addEventListener("click", handlePress);
subtractBtn.addEventListener("click", handlePress);
multiplyBtn.addEventListener("click", handlePress);
divideBtn.addEventListener("click", handlePress);
equal.addEventListener("click", calculateResult);
document.addEventListener("keydown", (e) => {
    if (checkKey(e))
        mappingKeyboard(e);
})
function calculateResult() {
    let result = operate(operator, +num1, +num2);
    if (result != undefined) {
        if (+result != result) {
            displayOnScreen(result);
            rest(false);
            return;
        }
        if (!Number.isInteger(result))
            result = +result.toFixed(10);
        displayOnScreen(result);
        rest(false);
    }
}
dot.addEventListener("click", handlePress);

clearDigit.addEventListener("click", removeDigit);
clearAll.addEventListener("click", () => rest(true));

//==Funcitons==
let operatorPressed = false;
let dotPressed = false;
let expression = "";
function handlePress(e) {
    if (num1.length + num2.length + operator.length > 14) {
        displayOnScreen("Overflow")
        return;
    }
    if (numbers.includes(e.target) || e.target == dot) {
        if (!operatorPressed) {
            if (e.target == dot) {
                if (dotPressed)
                    return;
                dotPressed = true;
                num1 += e.target.textContent;
            } else {
                num1 += e.target.textContent;
            }
        } else {
            if (e.target == dot) {
                if (dotPressed)
                    return;
                dotPressed = true;
                num2 += e.target.textContent;
            } else {
                num2 += e.target.textContent;
            }
        }
    } else {
        if (num1.length == 0) {
            if (e.target.textContent == "–") {
                num1 += "-";
            } else {
                return;
            }
        } else if (operator.length != 0) {
            if (num2.length != 0) {
                {
                    calculateResult();
                    return;
                }

            } else {
                operator = e.target.textContent;
            }

        } else {
            if (num1.length == 1 && num1.at(0) == "-")
                return;
            operator += e.target.textContent;
            operatorPressed = true;
            dotPressed = false;
        }
    }

    expression = `${num1} ${operator} ${num2}`;
    displayOnScreen(expression.trim());
}

function removeDigit() {
    let digit;
    if (expression) {
        expression = expression.trimEnd();
        digit = expression.at(expression.length - 1);
        if (num2.length != 0) {
            num2 = num2.slice(0, num2.length - 1);
            if (digit == ".")
                dotPressed = false;
        } else {
            if (operator != 0) {
                operator = "";
                operatorPressed = false;
            } else {
                num1 = num1.slice(0, num1.length - 1);
                if (digit == ".")
                    dotPressed = false;
                if (digit == "-")
                    operatorPressed = false;
            }
        }
    }
    expression = `${num1} ${operator} ${num2}`;
    displayOnScreen(expression.trim());
}

function displayOnScreen(content) {
    if (content.length == 0)
        content = 0;
    screen.textContent = content;
}

function rest(screenRest) {
    num1 = "";
    num2 = "";
    operator = "";
    expression = "";
    dotPressed = false;
    operatorPressed = false;
    if (screenRest)
        displayOnScreen("");
}

function checkKey(e) {
    return (e.key > '0' && e.key < '9') || ['-', '+', '/', '*', '=', "Delete", "Backspace"].includes(e.key);
}

function mappingKeyboard(e) {
    const buttons = Array.from(document.querySelectorAll(".button"));
    buttons.forEach((item) => {
        let key = item.textContent;
        if (item.textContent == '–') {
            key = "-";
        } else if (item.textContent == "÷") {
            key = "/";
        } else if (item.textContent == "×") {
            key = "*";
        } else if (item.textContent == "CE") {
            key = "Backspace";
        } else if (item.textContent == "C") {
            key = "Delete";
        }
        if (key == e.key) {
            item.click();
        }
    });
}