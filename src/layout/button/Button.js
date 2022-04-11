export default function Button(props) {
  let classes = `${
    props.type === "large" ? "keypad__largebutton" : "keypad__button"
  }`;
  classes += `${props.bgClass === undefined ? "" : " " + props.bgClass}`;
  classes += props.extraClasses === undefined ? "" : ` ${props.extraClasses}`;
  return (
    <button
      className={classes}
      type="button"
      value={props.value}
      onClick={(e) => props.onClick(e)}
    >
      {props.value}
    </button>
  );
}
