
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";
let justCalculated = false;
let hasError = false;

function updateDisplay() {
    display.value = expression || "0";
}

function clearCalculator() {
    expression = "";
    justCalculated = hasError = false;
    updateDisplay();
}

function deleteLast() {
    if (hasError || justCalculated) return clearCalculator();
    expression = expression.slice(0, -1);
    updateDisplay();
}

function addNumber(value) {
    if (hasError || justCalculated) {
        expression = "";
        hasError = justCalculated = false;
    }

    const current = expression.split(/[+\-*/]/).pop();

    if (value === "." && current.includes(".")) return;
    if (value === "." && !current) expression += "0";

    if (value !== "." && /(^|[+\-*/])0$/.test(expression))
        expression = expression.slice(0, -1);

    expression += value;
    updateDisplay();
}

function addOperator(operator) {
    if (hasError) return clearCalculator();

    justCalculated = false;

    if (!expression) {
        if (operator === "-") expression = "-";
    } else {
        expression = expression.replace(/[+\-*/]$/, "") + operator;
    }

    updateDisplay();
}

function calculate() {
    if (!expression || hasError || /[+\-*/.]$/.test(expression)) return;

    try {
        const result = evaluateExpression(expression);
        if (!Number.isFinite(result)) throw Error();

        expression = String(Number(result.toPrecision(12)));
        justCalculated = true;
        updateDisplay();
    } catch {
        display.value = "Error";
        expression = "";
        hasError = true;
        justCalculated = false;
    }
}

function evaluateExpression(input) {
    const numbers = [];
    const operators = [];
    let current = "";

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (/[0-9.]/.test(char)) {
            current += char;
        } else if (/[+\-*/]/.test(char)) {
            if (char === "-" && (!current || /[+\-*/]$/.test(input.slice(0, i)))) {
                current += char;
                continue;
            }

            if (!current || !Number.isFinite(Number(current))) throw Error();

            numbers.push(Number(current));
            operators.push(char);
            current = "";
        }
    }

    if (!current || !Number.isFinite(Number(current))) throw Error();
    numbers.push(Number(current));

    for (let i = 0; i < operators.length;) {
        if ("*/".includes(operators[i])) {
            const result = operators[i] === "*"
                ? numbers[i] * numbers[i + 1]
                : numbers[i] / numbers[i + 1];

            if (!Number.isFinite(result)) throw Error();

            numbers.splice(i, 2, result);
            operators.splice(i, 1);
        } else {
            i++;
        }
    }

    let result = numbers[0];

    operators.forEach((op, i) => {
        result = op === "+" ? result + numbers[i + 1] : result - numbers[i + 1];
    });

    return result;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const { value, action } = button.dataset;

        if (action === "clear") clearCalculator();
        else if (action === "delete") deleteLast();
        else if (action === "equals") calculate();
        else if (/[0-9.]/.test(value)) addNumber(value);
        else if (/[+\-*/]/.test(value)) addOperator(value);
    });
});

updateDisplay();
