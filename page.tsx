import Link from "next/link";

export default function Home() {
  return (
    <main className="shell">
      <nav className="nav">
        <div className="logo">ClipForge</div>
        <div className="badge">MVP</div>
      </nav>

      <section className="hero">
        <div>
          <h1>Turn long videos into Shorts.</h1>
          <p className="sub">
            Upload a podcast, interview, stream or YouTube export. ClipForge
            transcribes it, finds strong moments, and prepares vertical clips.
          </p>
          <div style={{marginTop:28}}>
            <Link href="/app" className="btn">Try the demo</Link>
          </div>
        </div>

        <div className="card">
          <h2>Starter — £5</h2>
          <p className="sub" style={{fontSize:15}}>
            One project · up to 5 suggested clips · AI titles/hooks.
          </p>
          <a className="btn" href="/api/checkout" style={{display:"inline-block", marginTop:10}}>
            Buy £5 credits
          </a>
          <div className="notice">Payments are handled by Stripe.</div>
        </div>
      </section>

      <section className="grid">
        <div className="card feature"><h3>Find moments</h3><p>AI scores transcript segments for hooks, tension, useful insights and quotable moments.</p></div>
        <div className="card feature"><h3>Vertical-first</h3><p>Every selected segment is prepared for 9:16 social video.</p></div>
        <div className="card feature"><h3>Ready to post</h3><p>Generate a short title, hook and caption alongside every clip.</p></div>
      </section>
    </main>
  );
}