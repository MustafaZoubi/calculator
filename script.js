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
    console.log("a value: " + a)
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

const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const erase = document.querySelector(".erase");
const clearAll = document.querySelector(".clear");
const screen = document.querySelector(".screen");

numbers.forEach((item) => {
    item.addEventListener("click", handlePress);
});
operators.forEach((item) => {
    item.addEventListener("click", handlePress);
});

equal.addEventListener("click", () => { displayOnScreen(operate(operator, +num1, +num2)); rest() });

clearAll.addEventListener("click", () => { rest(); displayOnScreen(); });
// erase.addEventListener("click", deleteDigit);

let operatorFlag = false;
let minusFlag = false;
let result = "";
function handlePress(e) {

    if (operators.includes(e.target)) {
        if (num1.length == 0) {
            if (e.target.textContent == "–" && !minusFlag) {
                console.log("hi");
                num1 += e.target.textContent;
                result = result.concat(`${e.target.textContent}`)
                console.log("test" + result);
                minusFlag = true;
            } else {
                return;
            }

        } else {
            operator += e.target.textContent;
            operatorFlag = true;
            result = result.concat(` ${operator}`);
            console.log(result);
            displayOnScreen(result);
        }
    } else {
        let pressedBtn = e.target;
        if (operatorFlag) {
            num2 += e.target.textContent;
            result = result.concat(` ${num2}`);
            console.log(result);
            displayOnScreen(result);
        } else {
            num1 += e.target.textContent;
            result = result.concat(`${num1}`);
            console.log(result);
            displayOnScreen(result);
        }

    }

}



function rest() {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    operatorFlag = false;
}

function displayOnScreen(result = 0) {
    screen.textContent = result;
}

// function deleteDigit() {
//     console.log("hi");
//     if (result.length != 0) {
//         console.log(result);
//         result = result.slice(0, result.length - 1);
//         console.log(result);

//         let arr = result.split(" ");
//         num1 = arr[0];
//         operator = arr[1];
//         num2 = arr[2];
//         displayOnScreen(result);
//     } else {
//         return;
//     }
// }
