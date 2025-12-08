import "./RoundedButton.css";

export default function RoundedButton({ text, onClick }) {
  return (
    <button className="rounded-btn-component" onClick={onClick}>
      {text}
    </button>
  );
}