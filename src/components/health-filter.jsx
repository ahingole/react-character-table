import { useEffect, useRef, useState } from "react";

const OPTIONS = ["Healthy", "Injured", "Critical"];

export default function HealthFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = option => {
    onChange(
      value.includes(option)
        ? value.filter(v => v !== option)
        : [...value, option]
    );
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Filter by health"
        onClick={() => setOpen(o => !o)}
      >
        "[filter]"
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Health filter"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            zIndex: 10
          }}
        >
          {OPTIONS.map(option => (
            <label key={option} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
