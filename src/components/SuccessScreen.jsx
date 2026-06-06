export default function SuccessScreen({ submitResult }) {
  return (
    <div>
      <header className="site-header">
        <div className="badge">Season of Legends 2026 · Da Axis</div>
        <h1>
          Athlete<span>Enrolled</span>
        </h1>
      </header>
      <div className="container">
        <div className="success-screen">
          <div className="success-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2>
            Welcome,
            <br />
            {submitResult.fullName.split(' ')[0]}
          </h2>
          <p>
            Your enrollment has been received. Keep your Tournament ID safe — you&apos;ll need it
            at the Hub.
          </p>
          <div className="tournament-id-box">
            <div className="label">Your Tournament ID</div>
            <div className="id">{submitResult.tournamentId}</div>
          </div>
          <br />
          <div style={{ color: '#555', fontSize: 13, marginBottom: 8 }}>
            Status:{' '}
            <span style={{ color: '#D69E2E', fontWeight: 600 }}>
              {submitResult.status?.toUpperCase() || 'PENDING'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
