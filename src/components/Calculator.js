import { Component } from "react";
import Keypad from "./keypad/Keypad";
import Screen from "./screen/Screen";

const initialState = {
  expression: "",
  isOperatorDetected: false,
  isEvaluationHappened: false,
  previousCalculationResult: "",
};

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleNumericButtonClick = this.handleNumericButtonClick.bind(this);
    this.handleOperatorButtonClick = this.handleOperatorButtonClick.bind(this);
    this.handleEvaluateButtonClick = this.handleEvaluateButtonClick.bind(this);
    this.handleSignChangeButtonClick =
      this.handleSignChangeButtonClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleNumericButtonClick(e) {
    let currentValue = this.state.previousCalculationResult;
    let expression = this.state.expression;
    let isOperatorDetected = this.state.isOperatorDetected;
    let isEvaluationHappened = this.state.isEvaluationHappened;
    const value = e.target.value;

    // Ignore further entries if the length becomes
    // equal to 9
    if (
      currentValue !== undefined &&
      currentValue.length === 9 &&
      !isOperatorDetected
    )
      return;

    // If previous `click` event occured because of an operator
    // then clear the output screen & set it to incoming
    // value.
    if (isOperatorDetected) {
      currentValue = "";
      isOperatorDetected = false;
    }

    // The expression must be set to empty, if
    // a numeric button is pressed just after the evaluation.
    if (isEvaluationHappened) {
      expression = "";
      currentValue = "";
      isEvaluationHappened = false;
    }

    const regex = /\./;
    if (value === ".") {
      if (!regex.test(currentValue)) {
        currentValue = currentValue === "" ? "0" + value : currentValue + value;
        if (expression === "") expression = "0" + value;
        else expression += value;
      }
    } else {
      expression = expression === "" && value === "0" ? "" : expression + value;
      currentValue =
        currentValue === "" && value === "0" ? "" : currentValue + value;
    }

    this.setState({
      expression,
      isOperatorDetected,
      isEvaluationHappened,
      previousCalculationResult: currentValue,
    });
  }

  handleOperatorButtonClick = (e) => {
    let operatorsAtEndRegex = /(\+|-|\/|\*)$/;
    let expression = this.state.expression;

    const value = e.target.value;
    const currInputValue = value === "x" ? "*" : value;

    // Add the operator if the expression ends with a digit.
    if (/\d$/.test(expression)) {
      expression += currInputValue;
    }
    // Replace the operator if the expression ends with an
    // operator with the new operator.
    else if (operatorsAtEndRegex.test(expression) && expression.length > 1) {
      let newExpression = expression.replace(
        operatorsAtEndRegex,
        currInputValue
      );
      expression = newExpression;
    }

    this.setState({
      expression,
      isEvaluationHappened: false,
      isOperatorDetected: true,
    });
  };

  handleEvaluateButtonClick(e) {
    const expression = this.state.expression;
    const opsArray = expression.split(/[0-9.]+/g).filter((n) => n !== "");
    const numsArray = expression.split(/[/|+|*|-]/g);

    let result = numsArray[0];
    for (
      let numIndex = 1, opsIndex = 0;
      numIndex <= numsArray.length;
      numIndex++, opsIndex++
    ) {
      if (opsArray[opsIndex] === "+") {
        result =
          Number.parseFloat(result) + Number.parseFloat(numsArray[numIndex]);
      } else if (opsArray[opsIndex] === "-") {
        result -= numsArray[numIndex];
      } else if (opsArray[opsIndex] === "*") {
        result *= numsArray[numIndex];
      } else if (opsArray[opsIndex] === "/") {
        result /= numsArray[numIndex];
      }
    }

    result = this.getReducedSize(result);

    this.setState({
      expression: result.toString(),
      isEvaluationHappened: true,
      isOperatorDetected: false,
      previousCalculationResult: result.toString(),
    });
  }

  handleSignChangeButtonClick(e) {
    let currentOutput = this.state.previousCalculationResult;
    let expression = this.state.expression;

    if (currentOutput === undefined || currentOutput === "") return;

    if (currentOutput.indexOf("-") === 0) {
      currentOutput = currentOutput.slice(1, currentOutput.length);
      expression = expression.slice(1, expression.length);
    } else {
      currentOutput = "-" + currentOutput;
      expression = "-" + expression;
    }

    this.setState({
      previousCalculationResult: currentOutput,
      expression,
    });
  }

  getReducedSize(result) {
    const len = result.toString().length;
    if (len >= 9) return result.toString().slice(0, 9);
    return result;
  }

  handleReset(e) {
    this.setState(initialState);
  }

  render() {
    return (
      <div className="calculator">
        <Screen output={this.state.previousCalculationResult} />
        <Keypad
          onNumericButtonClick={this.handleNumericButtonClick}
          onOperatorButtonClick={this.handleOperatorButtonClick}
          onEvaluateButtonClick={this.handleEvaluateButtonClick}
          onSignChangeButtonClick={this.handleSignChangeButtonClick}
          onReset={this.handleReset}
        />
      </div>
    );
  }
}
