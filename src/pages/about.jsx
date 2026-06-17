import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--text)' }}>

      <header className="site-header">
        <img src={logo} alt="Season of Legends" height={200} className="mb-4" />
      </header>

      <div style={{ textAlign: 'center', padding: '56px 24px 0' }}>
        <span style={{
          display: 'inline-block',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3px',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          border: '1px solid var(--gold-dark)',
          padding: '4px 14px',
          borderRadius: '2px',
          marginBottom: '20px',
        }}>
          Season of Legends · Da Axis
        </span>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(44px, 9vw, 80px)',
          letterSpacing: '4px',
          lineHeight: 1,
          color: '#fff',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          About <span style={{ color: 'var(--gold)' }}>Us</span>
        </h1>

        <div style={{
          width: '60px',
          height: '3px',
          background: 'var(--gold)',
          margin: '0 auto 56px',
          borderRadius: '2px',
        }} />
      </div>

      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>
        <Card
          title="Who We Are"
          body="Season of Legends is Nigeria's grassroots esports movement, built from the ground up in Enugu State. Run by Da Axis Limited and licensed by the Enugu State Gaming Commission (ESGC), we create a space where real gaming talent gets recognized  no gimmicks, no gambling, just pure competition."
        />
        <Card
          title="What We Do"
          body="We run 100% skill-based tournaments across our certified hubs in Enugu and Nsukka, open to players 18 and above. Every event is professionally organized, fairly judged, and designed with one goal in mind  to give local players the platform they deserve."
        />
        <Card
          title="The Movement"
          body="This isn't just gaming. It's a movement. We believe talent exists everywhere. It just needs the right stage. Season of Legends is that stage, and we're just getting started."
        />
      </div>

      <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            border: '1px solid var(--gold-dark)',
            padding: '10px 28px',
            borderRadius: '2px',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
        >
          ← Back to Registration
        </Link>
      </div>
    </div>
  );
}

function Card({ title, body }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <h2 style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: '20px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#fff',
        marginBottom: '12px',
      }}>
        {title}
      </h2>

      <p style={{
        fontSize: '15px',
        color: 'var(--muted)',
        lineHeight: '1.75',
        fontWeight: 400,
      }}>
        {body}
      </p>
    </div>
  );
}
