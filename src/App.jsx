import { useState } from 'react';
import './App.css'

function CalcDisplay({dispValue}) {
  return (
    <div className='Display'>
      {dispValue}
    </div>
  );
}

function CalcButton({buttonLabel, buttonClassName = 'Button', onCLick}) {
  return (
    <button className={buttonClassName} onClick={onCLick}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [disp, setDisp] = useState(0);
  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(null);
  const [operation, setOperation] = useState(null);
  const [calculationDone, setCalculationDone] = useState(false);

  const clearButtonClickHandler = (e) => {
    e.preventDefault();

    setDisp(0);
    setOperand1(null);
    setOperand2(null);
    setOperation(null);
    setCalculationDone(false);
  }

  const equalButtonClickHandler = (e) => {
    e.preventDefault();

    if (operand1 === null || operand2 === null || operation === null) {
      return;
    }

    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    let result;

    if (operation === "+") {
      result = num1 + num2;
    }
    else if (operation === "-") {
      result = num1 - num2;
    }
    else if (operation === "*") {
      result = num1 * num2;
    }
    else if (operation === "÷") {
      if (num2 === 0) {
        setDisp("Error");
        return;
      }

      result = num1 / num2;
    }

    setDisp(result);
    setOperand1(String(result));
    setOperand2(null);
    setOperation(null);
    setCalculationDone(true);
  }

  const operationButtonClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    /*
      If a calculation was just completed,
      use the result as the first operand.
    */
    if (calculationDone) {
      setOperand1(String(disp));
      setOperand2(null);
      setOperation(value);
      setDisp(value);
      setCalculationDone(false);
      return;
    }

    if (operand1 !== null) {
      setOperation(value);
      setDisp(value);
    }
  }

  const numbuttonClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    /*
      If a new number is pressed after a completed
      calculation, start a new calculation.
    */
    if (calculationDone) {
      setDisp(value);
      setOperand1(value);
      setOperand2(null);
      setOperation(null);
      setCalculationDone(false);
      return;
    }

    /*
      First operand
    */
    if (operation === null) {

      if (operand1 === null) {
        setDisp(value);
        setOperand1(value);
      }
      else {
        setDisp(operand1 + value);
        setOperand1(operand1 + value);
      }

    }

    /*
      Second operand
    */
    else {

      if (operand2 === null) {
        setDisp(value);
        setOperand2(value);
      }
      else {
        setDisp(operand2 + value);
        setOperand2(operand2 + value);
      }

    }
  }

  const nameButtonClickHandler = (e) => {
    e.preventDefault();

    setDisp("Bernardo V. Saguido");
    setOperand1(null);
    setOperand2(null);
    setOperation(null);
    setCalculationDone(false);
  }

  return (
    <div className='App'>

      <div className='Header'>
        Calculator of Bernardo V. Saguido - WMD3A
      </div>

      <div className='Calculator'>

        <CalcDisplay dispValue={disp}/>

        <div className='Keypad'>

          <CalcButton buttonLabel={7} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={8} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={9} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={"÷"} onCLick={operationButtonClickHandler}/>

          <CalcButton buttonLabel={4} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={5} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={6} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={"*"} onCLick={operationButtonClickHandler}/>

          <CalcButton buttonLabel={1} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={2} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={3} onCLick={numbuttonClickHandler}/>
          <CalcButton buttonLabel={'-'} onCLick={operationButtonClickHandler}/>

          <CalcButton
            buttonLabel={"CLR"}
            buttonClassName="ClrButton"
            onCLick={clearButtonClickHandler}
          />

          <CalcButton
            buttonLabel={0}
            onCLick={numbuttonClickHandler}
          />

          <CalcButton
            buttonLabel={"="}
            buttonClassName="EqualButton"
            onCLick={equalButtonClickHandler}
          />

          <CalcButton
            buttonLabel={"+"}
            onCLick={operationButtonClickHandler}
          />

        </div>

        <button
          className="NameButton"
          onClick={nameButtonClickHandler}
        >
          SAGUIDO
        </button>

      </div>
    </div>
  )
}

export default App