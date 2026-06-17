import { useState } from 'react';
import Swal from 'sweetalert2';

import StepProfile from './components/StepProfile';
import SuccessScreen from './components/SuccessScreen';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

const API_BASE = 'https://localhost:5000/api/auth';

const ZONE_MAP = {
  Enugu: [
    'GRA/Trans-Ekulu',
    'Independence Layout/Ugwuaji',
    'New Haven',
    'Ogui/Asata',
    'Iva Valley',
    'Uwani/Achara Layout',
    'Garriki/Akwuke/Amechi',
    'Abakpa',
    'Emene',
    'Thinkers Corner',
    'Agbani',
  ],
  Nsukka: [
    'Nsukka town',
    'Unn',
    'Obollo-Afor',
    'Ogrute',
    'Ibagwa',
    'Orba',
    'Adani',
  ],
};

const INITIAL_FORM = {
  hubLocation: '',
  firstName: '',
  lastName: '',
  username: '',
  dateOfBirth: '',
  city: '',
  zone: '',
  referralCode: '',
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
  termsAccepted: false,
};

export default function App() {
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (key, val) => {
    setForm(f => ({
      ...f,
      [key]: val,
      ...(key === 'city' ? { zone: '' } : {}),
    }));
    setErrors(e => ({
      ...e,
      [key]: '',
      ...(key === 'city' ? { zone: '' } : {}),
    }));
  };

  const validateProfile = () => {
    const errs = {};

    if (!form.hubLocation.trim()) errs.hubLocation = 'Hub location is required';
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.username.trim()) errs.username = 'Username is required';
    if (!form.dateOfBirth) {
      errs.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(form.dateOfBirth);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < 18) errs.dateOfBirth = 'Athlete must be 18 or older';
    }
    if (!form.city) errs.city = 'City is required';
    if (!form.zone) errs.zone = 'Zone is required';
    if (!form.idNumber.trim()) errs.idNumber = 'ID number is required';
    if (!form.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';
    if (!form.termsAccepted) errs.termsAccepted = 'You must accept the terms and conditions';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateProfile()) return;
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

  return (
    <div>
      <header className="site-header ">
        <img src={logo} alt="logo" height={200} className="mb-4" />
        <Link to="/about" className="about-link">
          About Us
        </Link>
      </header>

      <div className="container">
        {apiError && <div className="error-banner">⚠ {apiError}</div>}

        <StepProfile
          form={form}
          errors={errors}
          set={set}
          cities={Object.keys(ZONE_MAP)}
          zones={form.city ? ZONE_MAP[form.city] || [] : []}
          submitResult={submitResult}
        />

        {!submitResult && (
          <div className="nav-buttons">
            <button className="btn btn-submit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
