// Shared Nav, Footer, PageHero, useTextScale for interior pages.

const { useState, useEffect } = React;

// Tiny icon set (subset of homepage icons)
const IShell = {
  Arrow: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>,

  Phone: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>,

  Menu: (p) =>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>,

  Close: (p) =>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>,

  Facebook: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>,

  LinkedIn: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8.27 18.5v-8.13H5.56v8.13h2.71M6.92 9.18a1.57 1.57 0 1 0 0-3.14 1.57 1.57 0 0 0 0 3.14M18.5 18.5v-4.46c0-2.5-1.6-3.71-3.34-3.71-1.18 0-2 .67-2.36 1.31v-1.13H10.1v8.13h2.71v-4.42c0-1.05.7-1.66 1.5-1.66.78 0 1.48.39 1.48 1.62v4.46h2.71" />
    </svg>

};

function ShellLogo({ height = 56, variant = "default" }) {
  const textFill = variant === "footer" ? "#ffffff" : "#052942";
  const viewBox = variant === "footer" ? "20 18 389 60" : "0 0 409.3 100.8";
  return (
    <svg height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-label="Weland Labs" style={{ display: "block" }}>
      <polygon fill="#45BBEC" points="91.3,25.4 102.1,25.4 87.4,70.5 76.1,70.5 68.9,50.1 64.6,50.1 73.3,74.5 90.3,74.5 107.6,21.4 92.1,21.4 " />
      <path fill="#80C241" d="M74.7,21.2h-17l-6.3,18.9l-5.5-18.8H24.5l17.3,53.2h13.1c0.4-1.3,0.7-2.7,1.1-4H44.7L30.1,25.4h12.8l8.3,28.1l9.4-28.2h11.2l6.8,20.4h4.2L74.7,21.2z" />
      <g fill={textFill}>
        <polygon points="161.2,30.5 153,59.7 144.7,30.5 139.9,30.5 131.7,59.7 123.5,30.5 118.7,30.5 129.4,67.5 134,67.5 142.3,38.5 150.7,67.5 155.2,67.5 166,30.5 " />
        <path d="M188.5,54.9h2.4c0.1-3.3-0.3-6.1-1.3-8.5c-1-2.4-2.5-4.2-4.4-5.5c-2-1.3-4.3-1.9-7.1-1.9c-2.7,0-5,0.6-7,1.8c-2,1.2-3.6,2.9-4.7,5.1c-1.1,2.2-1.7,4.8-1.7,7.9c0,2.9,0.6,5.4,1.7,7.6c1.1,2.2,2.7,3.9,4.7,5.1c2,1.2,4.4,1.8,7.1,1.8c2.7,0,5.1-0.7,7.3-2s3.8-3.2,4.9-5.7L186,59c-0.8,1.6-1.8,2.8-3.2,3.6c-1.4,0.8-2.9,1.3-4.8,1.3c-2.7,0-4.8-0.9-6.3-2.7c-1.3-1.6-2-3.7-2.2-6.3h16.7H188.5z M169.6,51.2c0.3-2.3,1-4.1,2.1-5.4c1.5-1.8,3.6-2.7,6.5-2.7c2.6,0,4.6,0.8,6,2.5c1.1,1.3,1.7,3.2,2,5.6H169.6z" />
        <rect x="194.7" y="29.7" width="4.6" height="37.8" />
        <path d="M226,44.4c-0.8-1.8-2.1-3.2-3.9-4.1s-4-1.4-6.5-1.4c-3.1,0-5.7,0.7-7.6,2.1c-1.9,1.4-3.2,3.3-3.9,5.7l4.3,1.3c0.5-1.7,1.4-2.9,2.7-3.7c1.3-0.8,2.7-1.2,4.4-1.2c2.5,0,4.3,0.6,5.3,1.8c0.9,1.1,1.4,2.7,1.5,4.7c-1,0.1-2,0.3-3.1,0.4c-1.7,0.2-3.3,0.5-5,0.7s-3.1,0.6-4.4,0.9c-1.4,0.4-2.6,1-3.6,1.7c-1,0.7-1.8,1.6-2.4,2.7c-0.5,1.1-0.8,2.3-0.8,3.8c0,1.5,0.4,2.9,1.1,4.1c0.7,1.3,1.8,2.3,3.2,3c1.4,0.8,3.1,1.1,5.2,1.1c2.7,0,5-0.6,6.8-1.7c1.4-0.8,2.5-2,3.4-3.4v4.3h4.1V50.3c0-1.1-0.1-2.1-0.2-3.1C226.6,46.2,226.4,45.2,226,44.4z M222.3,55.2c0,1-0.2,2-0.4,2.9c-0.2,1.1-0.7,2.2-1.4,3.2c-0.7,1-1.7,1.7-2.9,2.3c-1.2,0.6-2.6,0.9-4.3,0.9c-1.3,0-2.4-0.2-3.2-0.6c-0.8-0.4-1.4-1-1.8-1.7s-0.6-1.4-0.6-2.2c0-0.9,0.2-1.6,0.6-2.2c0.4-0.6,0.9-1.1,1.6-1.5c0.7-0.4,1.4-0.7,2.1-0.9c1-0.3,2.2-0.5,3.5-0.7c1.3-0.2,2.6-0.4,4.1-0.6c0.9-0.1,1.9-0.3,2.8-0.4C222.3,54.1,222.3,54.6,222.3,55.2z" />
        <path d="M254.8,45.2c-0.5-1.1-1.1-2.2-2-3.1c-0.8-0.9-1.9-1.7-3.2-2.3c-1.3-0.6-2.8-0.8-4.6-0.8c-2.4,0-4.5,0.5-6.2,1.6c-1.2,0.7-2.2,1.7-3,2.8v-3.6h-4.1v27.8h4.6V52.9c0-1.6,0.2-3,0.6-4.2c0.4-1.2,0.9-2.2,1.6-3c0.7-0.8,1.5-1.4,2.4-1.8c0.9-0.4,2-0.6,3.1-0.6c1.5,0,2.7,0.3,3.7,0.8s1.7,1.3,2.3,2.3c0.6,1,1,2.1,1.2,3.3c0.2,1.2,0.4,2.5,0.4,3.8v13.9h4.6V52.1c0-1-0.1-2.2-0.3-3.4C255.6,47.6,255.3,46.4,254.8,45.2z" />
        <path d="M280,42.3c-0.5-0.5-1-1-1.6-1.4c-1.8-1.3-4-1.9-6.6-1.9c-2.6,0-4.8,0.6-6.6,1.9c-1.9,1.3-3.3,3-4.3,5.2s-1.5,4.7-1.5,7.5s0.5,5.3,1.5,7.5c1,2.2,2.4,4,4.3,5.3c1.9,1.3,4.1,1.9,6.7,1.9c2.6,0,4.8-0.6,6.6-1.9c0.8-0.6,1.5-1.3,2.1-2v3.2h4.1v-37H280V42.3z M279.7,59c-0.6,1.6-1.5,2.8-2.7,3.7c-1.2,0.9-2.7,1.3-4.6,1.3c-1.8,0-3.3-0.5-4.5-1.4c-1.2-0.9-2.1-2.2-2.7-3.8c-0.6-1.6-0.9-3.4-0.9-5.3c0-2,0.3-3.7,0.9-5.3c0.6-1.6,1.5-2.8,2.7-3.8c1.2-0.9,2.8-1.4,4.7-1.4c1.8,0,3.3,0.4,4.5,1.3c1.2,0.9,2.1,2.1,2.6,3.7c0.6,1.6,0.9,3.4,0.9,5.4C280.5,55.6,280.2,57.4,279.7,59z" />
        <polygon points="304.8,30.5 300.2,30.5 300.2,67.5 322,67.5 322,63.1 304.8,63.1 " />
        <path d="M345.7,44.4c-0.8-1.8-2.1-3.2-3.9-4.1s-4-1.4-6.5-1.4c-3.1,0-5.7,0.7-7.6,2.1c-1.9,1.4-3.2,3.3-3.9,5.7l4.3,1.3c0.5-1.7,1.4-2.9,2.7-3.7s2.7-1.2,4.4-1.2c2.5,0,4.3,0.6,5.3,1.8c0.9,1.1,1.4,2.7,1.5,4.7c-1,0.1-2,0.3-3.1,0.4c-1.7,0.2-3.3,0.5-5,0.7s-3.1,0.6-4.4,0.9c-1.4,0.4-2.6,1-3.6,1.7c-1,0.7-1.8,1.6-2.4,2.7c-0.5,1.1-0.8,2.3-0.8,3.8c0,1.5,0.4,2.9,1.1,4.1c0.7,1.3,1.8,2.3,3.2,3c1.4,0.8,3.1,1.1,5.2,1.1c2.7,0,5-0.6,6.8-1.7c1.4-0.8,2.5-2,3.4-3.4v4.3h4.1V50.3c0-1.1-0.1-2.1-0.2-3.1C346.4,46.2,346.1,45.2,345.7,44.4z M342,55.2c0,1-0.2,2-0.4,2.9c-0.2,1.1-0.7,2.2-1.4,3.2c-0.7,1-1.7,1.7-2.9,2.3c-1.2,0.6-2.6,0.9-4.3,0.9c-1.3,0-2.4-0.2-3.2-0.6c-0.8-0.4-1.4-1-1.8-1.7s-0.6-1.4-0.6-2.2c0-0.9,0.2-1.6,0.6-2.2c0.4-0.6,0.9-1.1,1.6-1.5s1.4-0.7,2.1-0.9c1-0.3,2.2-0.5,3.5-0.7c1.3-0.2,2.6-0.4,4.1-0.6c0.9-0.1,1.9-0.3,2.8-0.4C342,54.1,342,54.6,342,55.2z" />
        <path d="M370.8,40.9c-1.9-1.3-4.1-1.9-6.6-1.9c-2.6,0-4.8,0.6-6.6,1.9c-0.6,0.4-1.1,0.9-1.6,1.4V30.5h-4.6v37h4.1v-3.2c0.6,0.8,1.3,1.4,2.1,2c1.8,1.3,4,1.9,6.6,1.9c2.6,0,4.8-0.6,6.7-1.9c1.9-1.3,3.3-3,4.3-5.3c1-2.2,1.5-4.7,1.5-7.5s-0.5-5.3-1.5-7.5C374.1,43.9,372.7,42.1,370.8,40.9z M370.8,58.9c-0.6,1.6-1.5,2.8-2.7,3.8c-1.2,0.9-2.7,1.4-4.5,1.4c-1.9,0-3.4-0.5-4.6-1.3c-1.2-0.9-2.1-2.1-2.7-3.7c-0.6-1.6-0.9-3.4-0.9-5.4c0-2,0.3-3.8,0.9-5.4c0.6-1.6,1.5-2.8,2.6-3.7c1.2-0.9,2.7-1.3,4.5-1.3c1.9,0,3.4,0.5,4.7,1.4c1.2,0.9,2.1,2.2,2.7,3.8c0.6,1.6,0.9,3.3,0.9,5.3C371.7,55.5,371.4,57.3,370.8,58.9z" />
        <path d="M400.7,56c-0.6-1-1.6-1.8-3-2.6s-3.3-1.4-5.8-2c-2.2-0.5-3.8-1-5-1.5c-1.1-0.4-1.9-0.9-2.3-1.4c-0.4-0.5-0.6-1-0.6-1.7c0-1.2,0.6-2.1,1.7-2.8c1.1-0.7,2.6-1,4.4-1c1.9,0.1,3.4,0.5,4.7,1.4c1.2,0.9,1.9,2,2.2,3.5l4.7-0.8c-0.2-1.6-0.8-3.1-1.8-4.3c-1-1.2-2.4-2.2-4-2.8c-1.7-0.7-3.5-1-5.7-1c-2.1,0-4,0.3-5.6,1c-1.6,0.7-2.8,1.6-3.7,2.8c-0.9,1.2-1.3,2.6-1.3,4.3c0,1.3,0.3,2.5,0.9,3.4c0.6,0.9,1.6,1.7,3,2.4s3.3,1.4,5.8,2c2.3,0.6,4,1.1,5.1,1.6c1.1,0.4,1.9,0.9,2.2,1.4c0.4,0.5,0.5,1.1,0.5,1.9c0,1.4-0.5,2.4-1.6,3.2c-1.1,0.8-2.6,1.2-4.5,1.2c-2,0-3.7-0.4-5-1.3s-2.2-2.1-2.6-3.6l-4.7,0.7c0.5,2.6,1.8,4.6,3.9,6.1c2.1,1.4,4.8,2.2,8.1,2.2c3.5,0,6.2-0.8,8.2-2.3c2-1.5,3-3.6,3-6.3C401.6,58.2,401.3,57,400.7,56z" />
      </g>
    </svg>);

}

function ShellNav({ current = "" }) {
  const [open, setOpen] = useState(false);
  const items = [
  { href: "Services.html", label: "Services", key: "services" },
  { href: "Locations.html", label: "Locations", key: "locations" },
  { href: "About.html", label: "About Us", key: "about" },
  { href: "FAQ.html", label: "FAQ", key: "faq" },
  { href: "Blog.html", label: "Blog", key: "blog" }];

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="index.html" className="nav-logo" aria-label="Weland Labs home">
          <ShellLogo />
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {items.map((it) =>
          <a key={it.key} href={it.href} aria-current={current === it.key ? "page" : undefined}
          style={current === it.key ? { color: "var(--cyan)" } : null}>{it.label}</a>
          )}
          <a href="Contact.html" className="nav-cta">Contact</a>
        </nav>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <IShell.Close /> : <IShell.Menu />}
        </button>
      </div>
    </header>);

}

function PageHero({ crumbs, title, lede, image, imageAlt = "" }) {
  return (
    <section className={`page-hero${image ? " page-hero--split" : ""}`}>
      <div className="page-hero-inner">
        <div className="page-hero-text">
          <p className="crumbs"><span className="crumb-current" style={{ opacity: "1" }}>Weland Labs</span></p>
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
        </div>
        {image &&
        <div className="page-hero-image" style={{ backgroundImage: `url('${image}')` }} role="img" aria-label={imageAlt}></div>
        }
      </div>
    </section>);

}

function ShellFooter() {
  return (
    <>
      <section className="cta-band">
        <div className="container">
          <div>
            <h2>Need a test today?</h2>
            <p>Walk in to any of our four locations during open hours, or call ahead if you'd like us to confirm prep instructions for your specific test.</p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="Locations.html" className="btn btn-primary">Find a location <IShell.Arrow /></a>
            <a href="Contact.html" className="btn btn-ghost">Contact us <IShell.Arrow /></a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            <ShellLogo height={40} variant="footer" />
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook"><IShell.Facebook /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><IShell.LinkedIn /></a>
          </div>
        </div>
      </footer>
    </>);

}

// Expose to other Babel scripts
Object.assign(window, { IShell, ShellLogo, ShellNav, PageHero, ShellFooter });