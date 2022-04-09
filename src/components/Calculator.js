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
      isEvaluationHappened = false;
    }

    const regex = /\./;
    if (value === ".") {
      if (!regex.test(currentValue)) {
        currentValue += value;
        expression += value;
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

    // If the expression is empty, either '+' or '-' can be added.
    if (expression === "") {
      console.log(currInputValue + " is pressed");
      if (currInputValue === "+" || currInputValue === "-") {
        expression += currInputValue;
      }
    }
    // Replace the operator if the expression only contains
    // either '+' or '-'.
    else if (
      expression.length === 1 &&
      /(\+|-)/.test(expression) &&
      /(\+|-)/.test(currInputValue)
    ) {
      let newExpression = expression.replace(/(\+|-)/, currInputValue);
      expression = newExpression;
    }
    // Add the operator if the expression ends with a digit.
    else if (/\d$/.test(expression)) {
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

    this.setState({ expression, isOperatorDetected: true });
  };

  handleEvaluateButtonClick(e) {
    const expression = this.state.expression;
    const opsArray = expression.split(/\d/g).filter((n) => n !== "");
    const numsArray = expression.split(/\D/g);

    let result = numsArray[0];
    for (
      let numIndex = 1, opsIndex = 0;
      numIndex <= numsArray.length;
      numIndex++, opsIndex++
    ) {
      if (opsArray[opsIndex] === "+") {
        result = Number.parseInt(result) + Number.parseInt(numsArray[numIndex]);
      } else if (opsArray[opsIndex] === "-") {
        result -= numsArray[numIndex];
      } else if (opsArray[opsIndex] === "*") {
        result *= numsArray[numIndex];
      } else if (opsArray[opsIndex] === "/") {
        result /= numsArray[numIndex];
      }
    }

    this.setState({
      expression: result,
      isEvaluationHappened: true,
      isOperatorDetected: false,
      previousCalculationResult: result,
    });
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
          onReset={this.handleReset}
        />
      </div>
    );
  }
}
