
import "./PrimaryButton.css";

function PrimaryButton({
  text,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
}) {
  return (
    <button
      className={`primary-button ${variant} ${disabled ? "disabled" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;