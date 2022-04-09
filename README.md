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

The button values are static whereas the screen output truly depends on the previous calculations as well as mathemical expression which is a combination of the buttons pressed. Thus, it is required to store the previous calculation. So finally, our state here is `Previous calculation & Mathematical expression`

## Where the state should live?

## Add the inverse flow
