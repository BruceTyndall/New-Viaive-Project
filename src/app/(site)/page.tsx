export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--stone-mid)',
          marginBottom: '24px',
        }}
      >
        Viaive · Under Construction
      </p>

      <h1
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(40px, 5.4vw, 72px)',
          lineHeight: 1,
          letterSpacing: '-0.025em',
          color: 'var(--stone)',
          textAlign: 'center',
          maxWidth: '16ch',
          marginBottom: '24px',
        }}
      >
        Luxury travel,{' '}
        <em style={{ fontWeight: 300 }}>decided.</em>
      </h1>

      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '18px',
          lineHeight: 1.7,
          color: 'var(--stone-mid)',
          textAlign: 'center',
          maxWidth: '52ch',
          marginBottom: '48px',
        }}
      >
        The site is being built. Check back soon.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/admin"
          style={{
            border: '2px solid var(--stone)',
            backgroundColor: 'var(--stone)',
            color: 'var(--white)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            padding: '12px 32px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Payload Admin
        </a>
        <a
          href="/style-guide"
          style={{
            border: '2px solid var(--stone)',
            backgroundColor: 'var(--paper)',
            color: 'var(--stone)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            padding: '12px 32px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Style Guide
        </a>
      </div>
    </main>
  )
}
