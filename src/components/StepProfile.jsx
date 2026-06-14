import Field from './Field';
import termsPdf from '../assets/rules, regulations and terms.pdf';

function ProfileResult({ submitResult }) {
  return (
    <div className="profile-result">
      <div className="profile-result__check">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p className="profile-result__status">Registration Complete</p>
      <h2 className="profile-result__name">
        {submitResult.firstName} {submitResult.lastName}
      </h2>

      <div className="profile-result__divider" />

      <div className="profile-result__tid-block">
        <span className="profile-result__tid-label">Tournament ID</span>
        <span className="profile-result__tid-value">{submitResult.tournamentId}</span>
      </div>

      <div className="profile-result__fields">
        <div className="profile-result__field">
          <span className="profile-result__field-label">First Name</span>
          <span className="profile-result__field-value">{submitResult.firstName}</span>
        </div>
        <div className="profile-result__field">
          <span className="profile-result__field-label">Last Name</span>
          <span className="profile-result__field-value">{submitResult.lastName}</span>
        </div>
      </div>
    </div>
  );
}

export default function StepProfile({ form, errors, set, cities, lgas, areas, submitResult }) {
  return (
    <div className="form-card" data-section="01">
      <div className="section-title">Section 1</div>
      <div className="section-heading">Athlete Profile</div>

      {submitResult ? (
        <ProfileResult submitResult={submitResult} />
      ) : (
        <>
        <div className="field-grid">
          <Field label="Hub Location" error={errors.hubLocation} full>
            <input
              className={errors.hubLocation ? 'error' : ''}
              placeholder="e.g. Lagos Hub — The Grid Lounge"
              value={form.hubLocation}
              onChange={e => set('hubLocation', e.target.value)}
            />
          </Field>
          <Field label="First Name" error={errors.firstName} full>
            <input
              className={errors.firstName ? 'error' : ''}
              placeholder="First name"
              value={form.firstName}
              onChange={e => set('firstName', e.target.value)}
            />
          </Field>
          <Field label="Last Name" error={errors.lastName}>
            <input
              className={errors.lastName ? 'error' : ''}
              placeholder="Last name"
              value={form.lastName}
              onChange={e => set('lastName', e.target.value)}
            />
          </Field>
          <Field label="Username" error={errors.username} full>
            <input
              className={errors.username ? 'error' : ''}
              placeholder="Enter Username"
              value={form.username}
              onChange={e => set('username', e.target.value)}
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
          <Field label="City" error={errors.city}>
            <select
              className={errors.city ? 'error' : ''}
              value={form.city}
              onChange={e => set('city', e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </Field>
          <Field label="LGA" error={errors.lga}>
            <select
              className={errors.lga ? 'error' : ''}
              value={form.lga}
              onChange={e => set('lga', e.target.value)}
              disabled={!form.city}
            >
              <option value="">Select an LGA</option>
              {lgas.map(lga => (
                <option key={lga} value={lga}>{lga}</option>
              ))}
            </select>
          </Field>
          <Field label="Area" error={errors.area}>
            <select
              className={errors.area ? 'error' : ''}
              value={form.area}
              onChange={e => set('area', e.target.value)}
              disabled={!form.lga || areas.length === 0}
            >
              <option value="">{areas.length ? 'Select an area' : 'No areas available'}</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </Field>
          <Field label="Phone Number" error={errors.phoneNumber}>
            <input
              className={errors.phoneNumber ? 'error' : ''}
              placeholder="+234 xxx xxx xxxx"
              value={form.phoneNumber}
              onChange={e => set('phoneNumber', e.target.value)}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              className={errors.email ? 'error' : ''}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
            />
          </Field>
          <Field label="WhatsApp Number" error={errors.whatsapp}>
            <input
              className={errors.whatsapp ? 'error' : ''}
              placeholder="+234 xxx xxx xxxx"
              value={form.whatsapp}
              onChange={e => set('whatsapp', e.target.value)}
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

        <div className="agreement-box" style={{ marginTop: '20px' }}>
          <p>
            Please read our <strong>Rules, Regulations &amp; Terms</strong> before registering.{' '}
            <a href={termsPdf} target="_blank" rel="noopener noreferrer" className="gold">
              View full document
            </a>
          </p>
          <div
            className={`checkbox-row${errors.termsAccepted ? ' error-check' : ''}`}
            onClick={() => set('termsAccepted', !form.termsAccepted)}
          >
            <div className={`custom-check${form.termsAccepted ? ' checked' : ''}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="checkbox-label">
              I have read and agree to the <strong>Rules, Regulations &amp; Terms</strong>
            </span>
          </div>
          {errors.termsAccepted && (
            <span className="err-msg" style={{ display: 'block', marginTop: '8px' }}>
              {errors.termsAccepted}
            </span>
          )}
        </div>
        </>
      )}
    </div>
  );
}
