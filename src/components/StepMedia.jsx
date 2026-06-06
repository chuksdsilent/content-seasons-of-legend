import Checkbox from './Checkbox';

export default function StepMedia({ form, errors, set }) {
  return (
    <div className="form-card" data-section="04">
      <div className="section-title">Sections 4 & 5</div>
      <div className="section-heading">Media Release & Liability Waiver</div>

      <div className="agreement-box">
        <p>
          <strong>Media & Publicity Release:</strong> I grant <strong>D Axis</strong> and its
          Technical Execution Partner the irrevocable right to capture my likeness, voice, and
          gameplay during the residency. This footage may be used for social media, live streaming,
          and marketing purposes by <strong>D Axis</strong> and its sponsors.
        </p>
        <Checkbox
          checked={form.mediaReleaseGranted}
          onChange={v => set('mediaReleaseGranted', v)}
          label="I <strong>grant</strong> the Media & Publicity Release to D Axis."
          hasError={!!errors.mediaReleaseGranted}
        />
        {errors.mediaReleaseGranted && (
          <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 8 }}>Required</div>
        )}
      </div>

      <div className="agreement-box">
        <p>
          <strong>Liability Waiver:</strong> I participate in this tournament at my own risk. I
          release <strong>D Axis</strong>, the Hub owners, and all partners from any liability
          regarding personal injury or loss of property during the event.
        </p>
        <Checkbox
          checked={form.liabilityWaiverAccepted}
          onChange={v => set('liabilityWaiverAccepted', v)}
          label="I accept the <strong>Liability Waiver</strong> and participate at my own risk."
          hasError={!!errors.liabilityWaiverAccepted}
        />
        {errors.liabilityWaiverAccepted && (
          <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 8 }}>Required</div>
        )}
      </div>
    </div>
  );
}
