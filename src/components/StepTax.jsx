import Checkbox from './Checkbox';

export default function StepTax({ form, errors, set }) {
  return (
    <div className="form-card" data-section="02">
      <div className="section-title">Section 2</div>
      <div className="section-heading">Statutory Tax & Prize Acknowledgment</div>
      <div className="agreement-box">
        <p>
          I acknowledge that the <strong>Season of Legends</strong> is a professional eSports
          residency. I agree to the following financial terms:
        </p>
        <p>
          <strong>Withholding Tax:</strong> All prize winnings are subject to a{' '}
          <span className="gold">
            <strong>10% Statutory Withholding Tax (WHT)</strong>
          </span>{' '}
          as mandated by the <strong>Nigeria Tax Act 2025</strong>.
        </p>
        <p>
          <strong>Net Disbursement:</strong> I understand that if I win a prize, the 10% tax will
          be deducted at source by <strong>D Axis</strong> for remittance to the State, and I will
          receive the <strong>Net Amount</strong>.
        </p>
        <Checkbox
          checked={form.taxAcknowledged}
          onChange={v => set('taxAcknowledged', v)}
          label="I <strong>acknowledge and agree</strong> to the Statutory Tax and Prize terms outlined above."
          hasError={!!errors.taxAcknowledged}
        />
        {errors.taxAcknowledged && (
          <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 8 }}>
            {errors.taxAcknowledged}
          </div>
        )}
      </div>
    </div>
  );
}
