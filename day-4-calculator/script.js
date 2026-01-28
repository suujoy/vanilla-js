class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appentNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;

        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;

            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation !== null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButtons = document.querySelector("[data-equals]");
const allClearButtons = document.querySelector("[data-all-clear]");
const deleteButtons = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]",
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]",
);

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement,
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appentNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButtons.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButtons.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButtons.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
});
