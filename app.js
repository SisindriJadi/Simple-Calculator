// app.js
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let output = "";

// Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.slice(0, -1);
  } else if (btnValue === "=") {
    if (output) {
      try {
        // Remove trailing operators from the end of the expression
        output = output.replace(/[/*\-+%]+$/, "");
        const result = eval(output);
        if (!isFinite(result)) {
          // Check for infinite or NaN results and reset the output
          output = "";
        } else {
          output = result.toString();
        }
      } catch (error) {
        output = "";
      }
    }
  } else {
    // Ensure that the first character is not *, /, or %
    if (output === "" && ["%", "*", "/"].includes(btnValue)) {
      return;
    }
    // Ensure that consecutive operators are not added
    if (["%", "*", "/", "-", "+"].includes(output.slice(-1)) && ["%", "*", "/", "-", "+"].includes(btnValue)) {
      return;
    }
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
