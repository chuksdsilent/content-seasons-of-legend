export default function Checkbox({ checked, onChange, label, hasError }) {
  return (
    <label
      className={`checkbox-row${hasError ? ' error-check' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <div className={`custom-check${checked ? ' checked' : ''}`}>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="checkbox-label" dangerouslySetInnerHTML={{ __html: label }} />
    </label>
  );
}
