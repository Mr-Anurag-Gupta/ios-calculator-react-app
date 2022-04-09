export default function Screen({ output }) {
  return (
    <div className="screen">
      <input
        className="screen__input"
        type="text"
        value={output}
        placeholder="0"
        readOnly
      />
    </div>
  );
}
