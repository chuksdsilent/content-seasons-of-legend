import Field from './Field';

export default function StepSignature({ form, errors, set }) {
  return (
    <div className="form-card" data-section="05">
      <div className="section-title">Final Step</div>
      <div className="section-heading">Athlete Signature</div>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
        By signing below, you confirm that all information provided is accurate and that you agree
        to all terms, rules, and waivers set forth in this enrollment form.
      </p>
      <Field
        label="Type your full name as your digital signature"
        error={errors.athleteSignature}
      >
        <div className="sig-field">
          <input
            className={errors.athleteSignature ? 'error' : ''}
            placeholder="Your full name..."
            value={form.athleteSignature}
            onChange={e => set('athleteSignature', e.target.value)}
          />
        </div>
      </Field>
      <div
        style={{
          marginTop: 24,
          padding: '16px',
          background: '#0F0F0F',
          borderRadius: 3,
          border: '1px solid #1E1E1E',
        }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, color: '#555' }}
        >
          <div>
            <span style={{ color: '#333', display: 'block', fontSize: 11, letterSpacing: '1px', marginBottom: 4 }}>
              ATHLETE
            </span>
            {form.fullName || '—'}
          </div>
          <div>
            <span style={{ color: '#333', display: 'block', fontSize: 11, letterSpacing: '1px', marginBottom: 4 }}>
              DATE
            </span>
            {new Date().toLocaleDateString('en-NG')}
          </div>
          <div>
            <span style={{ color: '#333', display: 'block', fontSize: 11, letterSpacing: '1px', marginBottom: 4 }}>
              HUB
            </span>
            {form.hubLocation || '—'}
          </div>
          <div>
            <span style={{ color: '#333', display: 'block', fontSize: 11, letterSpacing: '1px', marginBottom: 4 }}>
              EVENT
            </span>
            Season of Legends 2026
          </div>
        </div>
      </div>
    </div>
  );
}
