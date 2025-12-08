import './RoundedTextBox.css';

export function RoundedTextBox({ type = "text", placeholder, value, onChange }) {
    return (
        <div className="textbox-wrapper">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="textbox-input"
            />
        </div>
    );
}

export default RoundedTextBox;