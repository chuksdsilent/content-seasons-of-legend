import Field from './Field';

export default function StepProfile({ form, errors, set, cities, lgas, areas }) {
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
              <option key={city} value={city}>
                {city}
              </option>
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
              <option key={lga} value={lga}>
                {lga}
              </option>
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
            <option value="">
              {areas.length ? 'Select an area' : 'No areas available'}
            </option>
            {areas.map(area => (
              <option key={area} value={area}>
                {area}
              </option>
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
    </div>
  );
}
