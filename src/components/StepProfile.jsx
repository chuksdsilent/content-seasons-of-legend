import Field from './Field';
import termsPdf from '../assets/agreement.pdf';

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
      <p className="profile-result__hint">
        Keep this somewhere safe. You will need it to access your tournament profile and results.
      </p>
      <div className="profile-result__tid-block">
        <span className="profile-result__tid-label">Tournament ID</span>
        <span className="profile-result__tid-value">{submitResult.tournamentId}</span>
      </div>

      <div className="profile-result__divider" />
      <p className="profile-result__hint">
        Keep this somewhere safe. You will need it to access your tournament profile and results.
      </p>
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

export default function StepProfile({ form, errors, set, submitResult }) {
  return (
    <div className="form-card">
      {submitResult ? (
        <ProfileResult submitResult={submitResult} />
      ) : (
        <>
        <div className="field-grid">
          <Field label="First Name" error={errors.firstName}>
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
              placeholder="Surname"
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
          <Field label="Referral Code" error={errors.referralCode}>
            <input
              className={errors.referralCode ? 'error' : ''}
              placeholder="Enter referral code (optional)"
              value={form.referralCode}
              onChange={e => set('referralCode', e.target.value)}
            />
          </Field>
        </div>

        <hr className="social-section-divider" />

        <div className="social-section-title">
          Creator Profiles
          <span className="optional-tag">All Optional</span>
        </div>
        <p className="social-section-note">
          Share your social handles so we can tag you in tournament content and announcements.
        </p>

        <div className="field-grid">
          <Field label="Instagram" error={errors.instagram}>
            <div className={`social-input-wrap${errors.instagram ? ' error' : ''}`}>
              <span className="social-prefix">instagram.com/</span>
              <input
                placeholder="username"
                value={form.instagram}
                onChange={e => set('instagram', e.target.value)}
              />
            </div>
          </Field>
          <Field label="TikTok" error={errors.tiktok}>
            <div className={`social-input-wrap${errors.tiktok ? ' error' : ''}`}>
              <span className="social-prefix">tiktok.com/@</span>
              <input
                placeholder="username"
                value={form.tiktok}
                onChange={e => set('tiktok', e.target.value)}
              />
            </div>
          </Field>
          <Field label="YouTube" error={errors.youtube}>
            <div className={`social-input-wrap${errors.youtube ? ' error' : ''}`}>
              <span className="social-prefix">youtube.com/</span>
              <input
                placeholder="@channel or /c/channel"
                value={form.youtube}
                onChange={e => set('youtube', e.target.value)}
              />
            </div>
          </Field>
          <Field label="Twitter / X" error={errors.twitter}>
            <div className={`social-input-wrap${errors.twitter ? ' error' : ''}`}>
              <span className="social-prefix">x.com/</span>
              <input
                placeholder="username"
                value={form.twitter}
                onChange={e => set('twitter', e.target.value)}
              />
            </div>
          </Field>
          <Field label="Facebook" error={errors.facebook}>
            <div className={`social-input-wrap${errors.facebook ? ' error' : ''}`}>
              <span className="social-prefix">facebook.com/</span>
              <input
                placeholder="page or profile"
                value={form.facebook}
                onChange={e => set('facebook', e.target.value)}
              />
            </div>
          </Field>
          <Field label="LinkedIn" error={errors.linkedin}>
            <div className={`social-input-wrap${errors.linkedin ? ' error' : ''}`}>
              <span className="social-prefix">linkedin.com/in/</span>
              <input
                placeholder="profile"
                value={form.linkedin}
                onChange={e => set('linkedin', e.target.value)}
              />
            </div>
          </Field>
          <Field label="Twitch" error={errors.twitch}>
            <div className={`social-input-wrap${errors.twitch ? ' error' : ''}`}>
              <span className="social-prefix">twitch.tv/</span>
              <input
                placeholder="username"
                value={form.twitch}
                onChange={e => set('twitch', e.target.value)}
              />
            </div>
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
