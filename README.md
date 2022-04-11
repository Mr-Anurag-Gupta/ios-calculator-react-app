# ios-calculator-react-app

A calculator that resembles iOS calculator

## Breakup of UI into Component Hierarchy

- Calculator
  - Screen
  - Keypad
    - KeypadRow
      - Button

## Build a static version in React

## Minimal (but complete) representation of UI State

### Pieces of data in our application

- Button values
- Mathematical expression.
- Previous calculation.
- Screen output

The button values are static whereas the screen output truly depends on the previous calculations as well as mathemical expression which is a combination of the buttons and operators pressed. Thus, it is required to store the previous calculation. So finally, our state here is `Previous calculation & Mathematical expression`

## Where the state should live?

Since the output on the screen is directly depends on the expression that result from buttons pressed,
we must keep the state in the closest parent of `Screen` and `Keypad` components. That is, our state should live in the `Calculator` component.

## Add the inverse flow

We require the inverse flow from button till the root which is `Calculator` component.

## Design

![](iOS%20Calculator.png)

## Demo

[View](https://mr-anurag-gupta.github.io/react-ios-calculator)
