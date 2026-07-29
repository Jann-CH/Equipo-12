

import "./SelectionCard.css";

function SelectionCard({
  icon,
  text,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`selection-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="selection-left">

        <span className="selection-icon">
          {icon}
        </span>

        <span className="selection-text">
          {text}
        </span>

      </div>

      {selected && (
        <span className="selection-check">
          ✓
        </span>
      )}

    </button>
  );
}

export default SelectionCard;