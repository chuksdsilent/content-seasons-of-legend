import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('error ', data)
        setError(data.data.msg || " ");
        return;
      }

      localStorage.setItem('token', data.data.token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background glow */}
      <div className="login-bg-glow" />

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-badge">Season of Legends 2026</div>
          <h1 className="login-title">Admin<span>Portal</span></h1>
          <p className="login-subtitle">Da Axis eSports Residency</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">⚠ {error}</div>}

          <div className="login-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@daaxis.gg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : '⚡ Sign In'}
          </button>
        </form>

        <div className="login-footer">
          Enrollment form → <a href="/">Athlete Registration</a>
        </div>
      </div>
    </div>
  );
}
