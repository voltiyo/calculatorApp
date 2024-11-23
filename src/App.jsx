import React, { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [equal, setEqual] = useState(false);

  const handleCalcButton = (e) => {
    const value = e.target.value;
    let inputValue = display;

    if (equal) {
      if (value === ".") {
        setDisplay("0.");
      } else {
        setDisplay(value);
      }
      setEqual(false);
      return;
    }

    if (value === "." && inputValue.split(/[\+\-\*\/]/).pop().includes(".")) {
      return;
    }

    if (inputValue === "0" && value !== "." && value !== "=") {
      setDisplay(value);
    } else {
      setDisplay(inputValue + value);
    }
  };

  const clear = () => {
    setDisplay("0");
    setEqual(false);
  };

  const handleEqual = () => {
    try {
      let result = Function("return " + display.replace(/[^0-9+\-*/().]/g, ""))();
      setDisplay(result.toString());
      setEqual(true);
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleOperator = (operator) => {
    let lastChar = display[display.length - 1];
    let beforelastChar = display[display.length - 2]
    console.log(beforelastChar,lastChar)
    // Handling edge case for multiple operators, treat unary minus after operators
    if (equal) {
      setDisplay(display + operator);
      setEqual(false);
      return;
    }

    // If the last character is an operator or nothing (empty), handle `-` as a negative number
    if (beforelastChar === "*" && lastChar === "-" && operator === "+"){
      setDisplay(document.getElementById("display").value.slice(0, -2) + "+");
      console.log("done")
    }
    else if (operator === "-" && (["+", "-", "*", "/"].includes(lastChar) || lastChar === "")) {
      setDisplay(display + operator);
    }
    // If last character is an operator (not `-`), replace it with the new operator
    else if (["+", "*", "/", "%"].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + operator);
    }
    // Prevent appending an operator if the last character is another operator or a decimal
    else if (lastChar !== "-" && lastChar !== ".") {
      setDisplay(display + operator);
    }
    else if (lastChar === "-" && operator === "+"){
      setDisplay(display.slice(0, -1) + "+");
    }
    
    
  };

  return (
    <div className="container">
      <div className="calculator">
        <h1>Calculator</h1>
        <input type="text" value={display} id="display" readOnly className="display" />
        <div className="buttons">
          <button className="button" value="7" id="seven" onClick={handleCalcButton}>
            7
          </button>
          <button className="button" value="8" id="eight" onClick={handleCalcButton}>
            8
          </button>
          <button className="button" value="9" id="nine" onClick={handleCalcButton}>
            9
          </button>
          <button className="operator" id="divide" value="/" onClick={() => handleOperator("/")}>
            ÷
          </button>
          <button className="button" value="4" id="four" onClick={handleCalcButton}>
            4
          </button>
          <button className="button" value="5" id="five" onClick={handleCalcButton}>
            5
          </button>
          <button className="button" value="6" id="six" onClick={handleCalcButton}>
            6
          </button>
          <button className="operator" id="multiply" value="*" onClick={() => handleOperator("*")}>
            ×
          </button>
          <button className="button" value="1" id="one" onClick={handleCalcButton}>
            1
          </button>
          <button className="button" value="2" id="two" onClick={handleCalcButton}>
            2
          </button>
          <button className="button" value="3" id="three" onClick={handleCalcButton}>
            3
          </button>
          <button className="operator" id="subtract" value="-" onClick={() => handleOperator("-")}>
            −
          </button>
          <button className="button" value="0" id="zero" onClick={handleCalcButton}>
            0
          </button>
          <button className="button" value="." id="decimal" onClick={handleCalcButton}>
            .
          </button>
          <button className="button clear" id="clear" onClick={clear}>
            AC
          </button>
          <button className="operator" id="add" value="+" onClick={() => handleOperator("+")}>
            +
          </button>

          <button className="button" value="=" id="equals" onClick={handleEqual}>
            =
          </button>
        </div>
      </div>
      <h6>By safouane</h6>
    </div>
  );
}

export default App;
