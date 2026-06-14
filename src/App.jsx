import { useState } from 'react';
import Swal from 'sweetalert2';

import StepProfile from './components/StepProfile';
import SuccessScreen from './components/SuccessScreen';
import logo from './assets/logo.jpeg';

const API_BASE = 'http://localhost:5000/api/auth';

const CITY_LGA_AREA_MAP = {
  Enugu: {
    'Enugu North Areas': [
      'GRA',
      'Independence Layout',
      'New Haven',
      'Ogui',
      'Asata',
      'Iva Valley',
    ],
    'Enugu South Areas': [
      'Uwani',
      'Achara Layout',
      'Garriki',
      'Akwuke',
      'Amechi',
      'Ugwuaji',
    ],
    'Enugu East Areas': [
      'Trans-Ekulu',
      'Abakpa Nike',
      'Emene',
      'Thinkers Corner',
    ],
    Agbani: [],
  },
  Nsukka: {
    'Zone 1': [
      'GRA',
      'Aku Road/New Anglican Road',
      'Odenigbo/barracks',
      'Ugwuechara/ Obaechara',
    ],
    'Zone 2': [
      'UNN/University road',
      'Onuiyi/beach',
      'Ibeagwa road',
      'Hill top/Odenigwe',
    ],
    'Zone 3': ['Nru', 'Orba', 'Ugwuoye'],
  },
};

const INITIAL_FORM = {
  hubLocation: '',
  firstName: '',
  lastName: '',
  username: '',
  dateOfBirth: '',
  city: '',
  lga: '',
  area: '',
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
      ...(key === 'city' ? { lga: '', area: '' } : {}),
      ...(key === 'lga' ? { area: '' } : {}),
    }));
    setErrors(e => ({
      ...e,
      [key]: '',
      ...(key === 'city' ? { lga: '', area: '' } : {}),
      ...(key === 'lga' ? { area: '' } : {}),
    }));
  };

  const validateProfile = () => {
    const errs = {};
    const selectedAreaOptions =
      form.city && form.lga ? CITY_LGA_AREA_MAP[form.city][form.lga] || [] : [];

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
    if (!form.lga) errs.lga = 'LGA is required';
    if (selectedAreaOptions.length && !form.area) errs.area = 'Area is required';
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
      <header className="site-header">
        <img src={logo} alt="logo" height={200} className="mb-4" />
      </header>

      <div className="container">
        {apiError && <div className="error-banner">⚠ {apiError}</div>}

        <StepProfile
          form={form}
          errors={errors}
          set={set}
          cities={Object.keys(CITY_LGA_AREA_MAP)}
          lgas={form.city ? Object.keys(CITY_LGA_AREA_MAP[form.city]) : []}
          areas={form.city && form.lga ? CITY_LGA_AREA_MAP[form.city][form.lga] || [] : []}
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
