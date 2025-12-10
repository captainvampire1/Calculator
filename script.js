class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.expression = "";
		this.resultDisplayed = false;
	}

	delete() {
		if (this.resultDisplayed) return;
		this.expression = this.expression.slice(0, -1);
	}

	appendNumber(number) {
		// If result was just displayed, start fresh
		if (this.resultDisplayed) {
			this.expression = "";
			this.resultDisplayed = false;
		}

		// Prevent multiple decimals in the current number
		const lastNumber = this.expression.split(/[\+\-\×\÷\(\)]/).pop();
		if (number === "." && lastNumber.includes(".")) return;

		this.expression += number;
	}

	appendBracket(bracket) {
		if (this.resultDisplayed) {
			this.expression = "";
			this.resultDisplayed = false;
		}
		this.expression += bracket;
	}

	appendOperation(operation) {
		if (this.resultDisplayed) {
			this.resultDisplayed = false;
		}

		if (this.expression === "") return;

		// Don't add operator if last character is already an operator
		const lastChar = this.expression[this.expression.length - 1];
		if (["+", "-", "×", "÷"].includes(lastChar)) {
			this.expression = this.expression.slice(0, -1);
		}

		this.expression += operation;
	}

	compute() {
		if (this.expression === "") return;

		try {
			// Convert symbols to JavaScript operators
			let jsExpression = this.expression.replace(/×/g, "*").replace(/÷/g, "/");

			// Evaluate the expression
			let result = eval(jsExpression);

			// Round to avoid floating point errors
			result = Math.round(result * 100000000) / 100000000;

			this.expression = result.toString();
			this.resultDisplayed = true;
		} catch (error) {
			this.expression = "Error";
			this.resultDisplayed = true;
		}
	}

	updateDisplay() {
		if (this.expression === "") {
			this.currentOperandTextElement.innerText = "0";
		} else {
			this.currentOperandTextElement.innerText = this.expression;
		}
		this.previousOperandTextElement.innerText = "";
	}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const bracketButtons = document.querySelectorAll("[data-bracket]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
	"[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-current-operand]"
);

const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendOperation(button.innerText);
		calculator.updateDisplay();
	});
});

bracketButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendBracket(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});

// Initialize display
calculator.updateDisplay();

document.addEventListener("keydown", (e) => {
	if (e.key >= "0" && e.key <= "9") calculator.appendNumber(e.key);
	if (e.key === ".") calculator.appendNumber(e.key);
	if (e.key === "=" || e.key === "Enter") {
		e.preventDefault();
		calculator.compute();
	}
	if (e.key === "Backspace") calculator.delete();
	if (e.key === "Escape") calculator.clear();
	if (e.key === "+" || e.key === "-") calculator.appendOperation(e.key);
	if (e.key === "*") calculator.appendOperation("×");
	if (e.key === "/") {
		e.preventDefault();
		calculator.appendOperation("÷");
	}
	if (e.key === "(" || e.key === ")") calculator.appendBracket(e.key);
	calculator.updateDisplay();
});
