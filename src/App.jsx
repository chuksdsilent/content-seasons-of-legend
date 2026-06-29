import { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import StepProfile from './components/StepProfile';
import SuccessScreen from './components/SuccessScreen';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

const FLW_PUBLIC_KEY = import.meta.env.VITE_FLW_PUBLIC_KEY;
const API_BASE = import.meta.env.VITE_API_BASE;
const AMOUNT = import.meta.env.VITE_AMOUNT;

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
  role: 'Content Creator',
  firstName: '',
  lastName: '',
  username: '',
  dateOfBirth: '',
  city: '',
  zone: '',
  referralCode: '',
  phoneNumber: '',
  email: '',
  whatsapp: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  twitch: '',
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
  const formRef = useRef(form);
  formRef.current = form;

  const flwConfig = {
    public_key: FLW_PUBLIC_KEY,
    tx_ref: `SOL-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    amount: AMOUNT,
    currency: 'NGN',
    payment_options: 'card,bank_transfer',
    customer: {
      email: form.email,
      phone_number: form.phoneNumber,
      name: `${form.firstName} ${form.lastName}`.trim(),
    },
    customizations: {
      title: 'Seasons of Legends',
      description: 'Tournament Registration Fee - ₦1,000',
    },
  };

  const handleFlutterPayment = useFlutterwave(flwConfig);

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
    if (!form.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.termsAccepted) errs.termsAccepted = 'You must accept the terms and conditions';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const initiatePayment = async (txRef) => {
    const payload = {
      ...Object.fromEntries(
        Object.entries(formRef.current).map(([k, v]) => [k, typeof v === 'boolean' ? String(v) : v])
      ),
      tx_ref: txRef,
      status: 'pending',
    };
    try {
      const res = await fetch(`${API_BASE}/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.message === 'error') {
        setApiError(data.message || 'Could not initiate payment. Please try again.');
        return false;
      }
      return true;
    } catch {
      setApiError('Could not reach the server. Please try again.');
      return false;
    }
  };

  const cancelPayment = async (txRef) => {
    try {
      await fetch(`${API_BASE}/payment/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tx_ref: txRef, status: 'cancelled' }),
      });
    } catch {
      // non-critical
    }
  };

  const registerUser = async (transaction) => {
    setSubmitting(true);
    setApiError('');

    const payload = {
      ...Object.fromEntries(
        Object.entries(formRef.current).map(([k, v]) => [k, typeof v === 'boolean' ? String(v) : v])
      ),
      transaction,
    };

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

  const handleSubmit = async () => {
    if (!validateProfile()) return;

    const txRef = flwConfig.tx_ref;
    setSubmitting(true);
    setApiError('');

    const initiated = await initiatePayment(txRef);
    if (!initiated) {
      setSubmitting(false);
      return;
    }

    let paymentCompleted = false;

    handleFlutterPayment({
      callback: async (response) => {
        paymentCompleted = true;
        closePaymentModal();
        if (response.status === 'successful' || response.status === 'completed') {
          await registerUser(response);
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Payment was not completed. Please try again.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          setSubmitting(false);
        }
      },
      onClose: async () => {
        if (!paymentCompleted) {
          setSubmitting(false);
          await cancelPayment(txRef);
          setForm(INITIAL_FORM);
          setErrors({});
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Payment cancelled.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
    });
  };

  return (
    <div>
      <header className="site-header ">
        <img src={logo} alt="logo" height={200} className="mb-4" />
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

      <footer className="site-footer">
        <p className="site-footer__label">Contact &amp; Enquiries</p>
        <a href="mailto:Info@seasonoflegends.com" className="site-footer__email">
          Info@seasonoflegends.com
        </a>
        <Link to="/about" className="site-footer__about">About Us</Link>
      </footer>
    </div>
  );
}
