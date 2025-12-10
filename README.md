# Calculator

A robust and aesthetically pleasing calculator application built using **Vanilla JavaScript**, **HTML**, and **CSS**. It supports standard arithmetic operations, keyboard input, and maintains a history of the current operation.

## 🚀 Features

-   **Standard Operations**: Addition, Subtraction, Multiplication, Division.
-   **History Display**: Shows the previous operand and operator above the current result.
-   **Keyboard Support**: Fully usable with a physical keyboard (Numpad, Enter, Backspace, Escape).
-   **Formatted Output**: Automatically adds commas for large numbers (e.g., 1,000,000).
-   **Clean UI**: A glassmorphism-inspired design with responsive buttons.

## 🛠️ Tech Stack

-   **HTML5**: Structure of the calculator grid.
-   **CSS3**: Styling using CSS Grid for layout and custom variables for theming.
-   **JavaScript (ES6+)**: Logic for computations and DOM manipulation.

## 💡 Key Concepts Explained

### 1. Class-Based Logic
The entire logic is encapsulated within a `Calculator` class. This keeps the code organized and reusable. The class holds the state (current number, previous number, operation) and has methods to modify it.

**Simple Example:**
Think of a `Car` class. It has properties like `speed` and `fuel`. It has methods like `accelerate()` and `brake()`.
```javascript
class Calculator {
  constructor() {
    this.currentOperand = '';
  }

  appendNumber(number) {
    this.currentOperand += number;
  }
}
```
When you click a button, we call `calculator.appendNumber('5')`, just like pressing the gas pedal calls `car.accelerate()`.

### 2. Event Delegation & Handling
Instead of writing separate logic for every single button, we attach event listeners to groups of buttons (like all number buttons).
```javascript
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
```
This is efficient and makes the code cleaner. We also listen for `keydown` events globally to support typing.

## 📦 How to Run

1.  Navigate to the project directory:
    ```bash
    cd calculator
    ```
2.  Open `index.html` in your web browser.
    - You can simply double-click the file, or use a Live Server extension in VS Code.
