export default function Field({ label, error, children, full }) {
  return (
    <div className={`field${full ? ' full' : ''}`}>
      {label && <label>{label}</label>}
      {children}
      {error && <span className="err-msg">{error}</span>}
    </div>
  );
}
