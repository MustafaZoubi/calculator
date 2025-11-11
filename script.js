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
const numbers = document.querySelectorAll(".number");

//Operators
const add = document.querySelector(".add");
const subtract = document.querySelector(".subtract");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");
const equal = document.querySelector("equal");

//Operations
const clearAll = document.querySelector(".clear");
const clearDigit = document.querySelector(".erase");
const dot = document.querySelector(".dot");