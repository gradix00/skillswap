import "./ButtonOnlyText.css";

export default function ButtonOnlyText({ text, onClick }) {
  return (
    <button className="btn-only-text" onClick={onClick}>
      {text}
    </button>
  );
}