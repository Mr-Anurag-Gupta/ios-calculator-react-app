import KeypadRow from "./keypad-row/KeypadRow";
import Button from "../../layout/button/Button";

export default function Keypad(props) {
  return (
    <div className="keypad">
      <KeypadRow>
        <Button extraClasses="bg-darkgrey" value="AC" onClick={props.onReset} />
        <Button
          extraClasses="bg-darkgrey"
          value="+/-"
          onClick={props.onSignChangeButtonClick}
        />
        <Button
          extraClasses="bg-darkgrey"
          value="%"
          onClick={props.onOperatorButtonClick}
        />
        <Button
          value="/"
          bgClass="bg-orange"
          onClick={props.onOperatorButtonClick}
        />
      </KeypadRow>
      <KeypadRow>
        <Button value="7" onClick={props.onNumericButtonClick} />
        <Button value="8" onClick={props.onNumericButtonClick} />
        <Button value="9" onClick={props.onNumericButtonClick} />
        <Button
          value="x"
          bgClass="bg-orange"
          onClick={props.onOperatorButtonClick}
        />
      </KeypadRow>
      <KeypadRow>
        <Button value="4" onClick={props.onNumericButtonClick} />
        <Button value="5" onClick={props.onNumericButtonClick} />
        <Button value="6" onClick={props.onNumericButtonClick} />
        <Button
          value="-"
          bgClass="bg-orange"
          onClick={props.onOperatorButtonClick}
        />
      </KeypadRow>
      <KeypadRow>
        <Button value="1" onClick={props.onNumericButtonClick} />
        <Button value="2" onClick={props.onNumericButtonClick} />
        <Button value="3" onClick={props.onNumericButtonClick} />
        <Button
          value="+"
          bgClass="bg-orange"
          onClick={props.onOperatorButtonClick}
        />
      </KeypadRow>
      <KeypadRow>
        <Button type="large" value="0" onClick={props.onNumericButtonClick} />
        <Button value="." onClick={props.onNumericButtonClick} />
        <Button
          value="="
          bgClass="bg-orange"
          onClick={props.onEvaluateButtonClick}
        />
      </KeypadRow>
    </div>
  );
}
