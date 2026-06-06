import Checkbox from './Checkbox';

export default function StepRules({ form, errors, set }) {
  return (
    <div className="form-card" data-section="03">
      <div className="section-title">Section 3</div>
      <div className="section-heading">Tournament Rules & Integrity</div>

      <div className="agreement-box">
        <p>
          <strong>Zero-Tolerance Anti-Wagering:</strong> I agree that I will not engage in any form
          of gambling or side-betting on any match. Violation results in{' '}
          <span style={{ color: '#FC8181' }}>immediate disqualification and a permanent ban</span>.
        </p>
        <Checkbox
          checked={form.antiWageringAgreed}
          onChange={v => set('antiWageringAgreed', v)}
          label="I agree to the <strong>Anti-Wagering Policy</strong>."
          hasError={!!errors.antiWageringAgreed}
        />
        {errors.antiWageringAgreed && (
          <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 8 }}>Required</div>
        )}
      </div>

      <div className="agreement-box">
        <p>
          <strong>Hardware Integrity:</strong> I will use only the consoles and controllers
          provided by <strong>Da Axis</strong>. No external hardware or software modification is
          permitted.
        </p>
        <Checkbox
          checked={form.hardwareIntegrityAgreed}
          onChange={v => set('hardwareIntegrityAgreed', v)}
          label="I agree to the <strong>Hardware Integrity Policy</strong>."
          hasError={!!errors.hardwareIntegrityAgreed}
        />
        {errors.hardwareIntegrityAgreed && (
          <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 8 }}>Required</div>
        )}
      </div>

      <div className="agreement-box">
        <p>
          <strong>Conduct:</strong> I agree to maintain professional sportsmanship. Any physical or
          verbal abuse toward Hub Captains or other athletes will result in removal.
        </p>
        <Checkbox
          checked={form.conductAgreed}
          onChange={v => set('conductAgreed', v)}
          label="I agree to the <strong>Code of Conduct</strong>."
          hasError={!!errors.conductAgreed}
        />
        {errors.conductAgreed && (
          <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 8 }}>Required</div>
        )}
      </div>
    </div>
  );
}
