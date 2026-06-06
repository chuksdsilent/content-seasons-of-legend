import { useState } from 'react';
import Swal from 'sweetalert2';

import StepProfile from './components/StepProfile';
import StepTax from './components/StepTax';
import StepRules from './components/StepRules';
import StepMedia from './components/StepMedia';
import StepSignature from './components/StepSignature';
import SuccessScreen from './components/SuccessScreen';

const API_BASE = 'http://localhost:5000/api/auth';

const STEPS = ['Profile', 'Tax & Prize', 'Rules', 'Media & Liability', 'Signature'];

const INITIAL_FORM = {
  hubLocation: '',
  fullName: '',
  dateOfBirth: '',
  idType: 'NIN',
  idNumber: '',
  phoneNumber: '',
  taxAcknowledged: false,
  antiWageringAgreed: false,
  hardwareIntegrityAgreed: false,
  conductAgreed: false,
  mediaReleaseGranted: false,
  liabilityWaiverAccepted: false,
  athleteSignature: '',
};

export default function App() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validateStep = () => {
    const errs = {};

    if (step === 0) {
      if (!form.hubLocation.trim()) errs.hubLocation = 'Hub location is required';
      if (!form.fullName.trim()) errs.fullName = 'Full name is required';
      if (!form.dateOfBirth) {
        errs.dateOfBirth = 'Date of birth is required';
      } else {
        const dob = new Date(form.dateOfBirth);
        const age = new Date().getFullYear() - dob.getFullYear();
        if (age < 18) errs.dateOfBirth = 'Athlete must be 18 or older';
      }
      if (!form.idNumber.trim()) errs.idNumber = 'ID number is required';
      if (!form.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';
    }

    if (step === 1) {
      if (!form.taxAcknowledged) errs.taxAcknowledged = 'You must acknowledge the tax terms';
    }

    if (step === 2) {
      if (!form.antiWageringAgreed) errs.antiWageringAgreed = 'Required';
      if (!form.hardwareIntegrityAgreed) errs.hardwareIntegrityAgreed = 'Required';
      if (!form.conductAgreed) errs.conductAgreed = 'Required';
    }

    if (step === 3) {
      if (!form.mediaReleaseGranted) errs.mediaReleaseGranted = 'Required';
      if (!form.liabilityWaiverAccepted) errs.liabilityWaiverAccepted = 'Required';
    }

    if (step === 4) {
      if (!form.athleteSignature.trim()) errs.athleteSignature = 'Signature is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setApiError('');

    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, typeof v === 'boolean' ? String(v) : v])
    );

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.message === 'success') {
        setSubmitResult({ ...data.data, live: true });
      } else {
        setApiError(data.message || 'Submission failed. Please try again.');
        setSubmitting(false);
      }
    } catch (err) {
      if (err.message.includes('fetch') || err.message.includes('Failed')) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Could not reach the server. Please try again.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        setApiError(err.message);
      }
      setSubmitting(false);
    }
  };

  const progress = (step / STEPS.length) * 100;

  if (submitResult) {
    return <SuccessScreen submitResult={submitResult} />;
  }

  return (
    <div>
      <header className="site-header">
        <div className="badge">Season of Legends 2026 · Da Axis · eSports Residency</div>
        <h1>
          Athlete<span>Enrollment</span>
        </h1>
        <p>Tournament Waiver &amp; Registration · 4,096 Participant Program</p>
      </header>

      <div className="container">
        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-labels">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={`progress-label${i === step ? ' active' : i < step ? ' done' : ''}`}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {apiError && <div className="error-banner">⚠ {apiError}</div>}

        {step === 0 && <StepProfile form={form} errors={errors} set={set} />}
        {step === 1 && <StepTax form={form} errors={errors} set={set} />}
        {step === 2 && <StepRules form={form} errors={errors} set={set} />}
        {step === 3 && <StepMedia form={form} errors={errors} set={set} />}
        {step === 4 && <StepSignature form={form} errors={errors} set={set} />}

        {/* Navigation */}
        <div className="nav-buttons">
          {step > 0 ? (
            <button className="btn btn-ghost" onClick={back}>
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary" onClick={next}>
              Continue →
            </button>
          ) : (
            <button className="btn btn-submit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Enrolling...' : '⚡ Complete Enrollment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
