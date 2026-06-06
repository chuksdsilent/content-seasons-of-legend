import Field from './Field';

export default function StepProfile({ form, errors, set }) {
  return (
    <div className="form-card" data-section="01">
      <div className="section-title">Section 1</div>
      <div className="section-heading">Athlete Profile</div>
      <div className="field-grid">
        <Field label="Hub Location" error={errors.hubLocation} full>
          <input
            className={errors.hubLocation ? 'error' : ''}
            placeholder="e.g. Lagos Hub — The Grid Lounge"
            value={form.hubLocation}
            onChange={e => set('hubLocation', e.target.value)}
          />
        </Field>
        <Field label="Full Name" error={errors.fullName} full>
          <input
            className={errors.fullName ? 'error' : ''}
            placeholder="As it appears on your ID"
            value={form.fullName}
            onChange={e => set('fullName', e.target.value)}
          />
        </Field>
        <Field label="Date of Birth" error={errors.dateOfBirth}>
          <input
            type="date"
            className={errors.dateOfBirth ? 'error' : ''}
            value={form.dateOfBirth}
            onChange={e => set('dateOfBirth', e.target.value)}
          />
        </Field>
        <Field label="Phone Number" error={errors.phoneNumber}>
          <input
            className={errors.phoneNumber ? 'error' : ''}
            placeholder="+234 xxx xxx xxxx"
            value={form.phoneNumber}
            onChange={e => set('phoneNumber', e.target.value)}
          />
        </Field>
        <Field label="Valid ID Type">
          <select value={form.idType} onChange={e => set('idType', e.target.value)}>
            <option value="NIN">NIN — National Identification Number</option>
            <option value="Passport">International Passport</option>
            <option value="Drivers License">Driver&apos;s License</option>
          </select>
        </Field>
        <Field label="ID Number" error={errors.idNumber}>
          <input
            className={errors.idNumber ? 'error' : ''}
            placeholder="Enter your ID number"
            value={form.idNumber}
            onChange={e => set('idNumber', e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
