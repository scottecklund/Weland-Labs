// ── INJECTION LOADER ──
(function() {
  function execNodes(html, target, prepend) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    Array.from(tmp.childNodes).forEach(function(node) {
      var clone;
      if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
        clone = document.createElement('script');
        Array.from(node.attributes).forEach(function(a) { clone.setAttribute(a.name, a.value); });
        clone.textContent = node.textContent;
      } else { clone = node.cloneNode(true); }
      if (prepend && target.firstChild) { target.insertBefore(clone, target.firstChild); }
      else { target.appendChild(clone); }
    });
  }
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/injections.json', false);
    xhr.send();
    if (xhr.status !== 200) return;
    JSON.parse(xhr.responseText)
      .filter(function(i) { return i.active !== false; })
      .forEach(function(inj) {
        if (inj.location === 'head') execNodes(inj.code, document.head, false);
        else if (inj.location === 'body-start') document.addEventListener('DOMContentLoaded', function() { execNodes(inj.code, document.body, true); });
        else document.addEventListener('DOMContentLoaded', function() { execNodes(inj.code, document.body, false); });
      });
  } catch(e) {}
})();

// ── DATA LOADER ──
var _pages = {};
var _posts = window.blogPosts || [];
var _seo   = {};

(function() {
  function syncGet(url) {
    try {
      var x = new XMLHttpRequest();
      x.open('GET', url, false);
      x.send();
      return x.status === 200 ? JSON.parse(x.responseText) : null;
    } catch(e) { return null; }
  }
  _pages = syncGet('data/pages.json') || {};
  _seo   = syncGet('data/seo.json')   || {};
})();

const { useState, useEffect, useRef } = React;

// ── SEO INJECTOR ──
function applySEO(pageId) {
  const s = _seo[pageId];
  if (!s) return;
  if (s.titleTag) document.title = s.titleTag;
  function setMeta(name, content, prop) {
    if (!content) return;
    var sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    var el = document.querySelector(sel) || document.createElement('meta');
    prop ? el.setAttribute('property', name) : el.setAttribute('name', name);
    el.setAttribute('content', content);
    if (!el.parentNode) document.head.appendChild(el);
  }
  setMeta('description', s.metaDescription);
  setMeta('og:title', s.ogTitle, true);
  setMeta('og:description', s.ogDescription, true);
  setMeta('og:image', s.ogImage, true);
  if (s.canonical) {
    var link = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    link.rel = 'canonical'; link.href = s.canonical;
    if (!link.parentNode) document.head.appendChild(link);
  }
}

// ── ICONS ──
const Icon = {
  Arrow:    (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Phone:    (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Check:    (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  Menu:     (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:    (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevDown: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
  Facebook: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>,
  LinkedIn: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8.27 18.5v-8.13H5.56v8.13h2.71M6.92 9.18a1.57 1.57 0 1 0 0-3.14 1.57 1.57 0 0 0 0 3.14M18.5 18.5v-4.46c0-2.5-1.6-3.71-3.34-3.71-1.18 0-2 .67-2.36 1.31v-1.13H10.1v8.13h2.71v-4.42c0-1.05.7-1.66 1.5-1.66.78 0 1.48.39 1.48 1.62v4.46h2.71"/></svg>,
};

// ── LOGO ──
function Logo({ height = 56, variant = "default" }) {
  const textFill = variant === "footer" ? "#ffffff" : "#052942";
  const viewBox  = variant === "footer" ? "20 18 389 60" : "0 0 409.3 100.8";
  return (
    <svg height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-label="Weland Labs" style={{display:"block"}}>
      <polygon fill="#45BBEC" points="91.3,25.4 102.1,25.4 87.4,70.5 76.1,70.5 68.9,50.1 64.6,50.1 73.3,74.5 90.3,74.5 107.6,21.4 92.1,21.4 "/>
      <path fill="#80C241" d="M74.7,21.2h-17l-6.3,18.9l-5.5-18.8H24.5l17.3,53.2h13.1c0.4-1.3,0.7-2.7,1.1-4H44.7L30.1,25.4h12.8l8.3,28.1l9.4-28.2h11.2l6.8,20.4h4.2L74.7,21.2z"/>
      <g fill={textFill}>
        <polygon points="161.2,30.5 153,59.7 144.7,30.5 139.9,30.5 131.7,59.7 123.5,30.5 118.7,30.5 129.4,67.5 134,67.5 142.3,38.5 150.7,67.5 155.2,67.5 166,30.5 "/>
        <rect x="194.7" y="29.7" width="4.6" height="37.8"/>
        <polygon points="304.8,30.5 300.2,30.5 300.2,67.5 322,67.5 322,63.1 304.8,63.1 "/>
      </g>
    </svg>
  );
}

// ── NAV ──
function Nav({ current = "" }) {
  const [open, setOpen] = useState(false);
  const items = [
    { href: "Services.html",  label: "Services",  key: "services" },
    { href: "Locations.html", label: "Locations", key: "locations" },
    { href: "About.html",     label: "About Us",  key: "about" },
    { href: "FAQ.html",       label: "FAQ",        key: "faq" },
    { href: "Blog.html",      label: "Blog",       key: "blog" },
  ];
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="index.html" className="nav-logo" aria-label="Weland Labs home"><Logo /></a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {items.map(it => (
            <a key={it.key} href={it.href}
               aria-current={current === it.key ? "page" : undefined}
               style={current === it.key ? { color: "var(--cyan)" } : null}>{it.label}</a>
          ))}
          <a href="Contact.html" className="nav-cta">Contact</a>
        </nav>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>
    </header>
  );
}

// ── FOOTER ──
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <div className="footer-logo"><Logo height={40} variant="footer" /></div>
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Facebook"><Icon.Facebook /></a>
          <a href="#" className="social-icon" aria-label="LinkedIn"><Icon.LinkedIn /></a>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════
// BLOCK RENDERERS
// ══════════════════════════════════════════

// HERO
function BlockHero({ data }) {
  const imgStyle = data.image ? { backgroundImage: `url('${data.image}')` } : {};
  return (
    <section className="hero">
      <div className={`hero-grid${data.imagePosition === 'left' ? '' : ' hero-grid--reverse'}`}>
        <div className="hero-text">
          {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
          <h1>{data.heading1}{data.heading2 && <><br/>{data.heading2}</>}</h1>
          {data.body && <p>{data.body}</p>}
          <div className="hero-actions">
            {data.cta1Text && <a href={data.cta1Href || '#'} className="btn btn-primary">{data.cta1Text}</a>}
            {data.cta2Text && <a href={data.cta2Href || '#'} className="btn btn-ghost">{data.cta2Text} <Icon.Arrow /></a>}
          </div>
        </div>
        <div className="hero-image" style={imgStyle} aria-hidden="true">
          {!data.image && <div className="placeholder">[ hero image ]</div>}
        </div>
      </div>
    </section>
  );
}

// SECTION HEADER
function BlockSectionHeader({ data }) {
  const align = data.alignment === 'center' ? { textAlign: 'center', maxWidth: 640, margin: '0 auto' } : {};
  return (
    <section style={{ padding: '60px 0 0' }}>
      <div className="container">
        <div style={align}>
          {data.eyebrow && <p className="eyebrow" style={{ color: 'var(--cyan)', marginBottom: 8 }}>{data.eyebrow}</p>}
          {data.heading && <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 12 }}>{data.heading}</h2>}
          {data.subheading && <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.6 }}>{data.subheading}</p>}
        </div>
      </div>
    </section>
  );
}

// TEXT + IMAGE
function BlockTextImage({ data }) {
  const isLeft = data.imagePosition === 'left';
  return (
    <section className="testing">
      <div className="container">
        <div className="testing-grid" style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}>
          <div className="testing-image" style={data.image ? { backgroundImage: `url('${data.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            {!data.image && <div className="placeholder">[ image ]</div>}
          </div>
          <div>
            {data.heading && <h2>{data.heading}</h2>}
            {data.body && <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, margin: '0 0 8px' }}>{data.body}</p>}
            {data.bullets && data.bullets.length > 0 && (
              <ul className="testing-bullets">
                {data.bullets.map((b, i) => <li key={i}><span className="check"><Icon.Check /></span> {b}</li>)}
              </ul>
            )}
            {data.ctaText && <a href={data.ctaHref || '#'} className="btn btn-outline">{data.ctaText} <Icon.Arrow /></a>}
          </div>
        </div>
      </div>
    </section>
  );
}

// CARDS GRID
function BlockCardsGrid({ data }) {
  const colClass = { 2: 'col-2', 3: 'col-3', 4: '' }[data.columns] || '';
  return (
    <section id="services">
      <div className="container">
        {(data.heading || data.viewAllHref) && (
          <div className="section-head">
            {data.heading && <h2>{data.heading}</h2>}
            {data.viewAllHref && <a href={data.viewAllHref} className="view-all">{data.viewAllText || 'View All'} <Icon.Arrow /></a>}
          </div>
        )}
        <div className={`services-grid ${colClass}`}>
          {(data.cards || []).map((card, i) => (
            <a key={i} href={card.href || '#'} className="service-card-link">
              <article className="service-card">
                {card.image && <img src={card.image} alt={card.title} style={{ width: 48, height: 48, objectFit: 'cover', marginBottom: 12 }} />}
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// GALLERY
function BlockGallery({ data }) {
  const [lightbox, setLightbox] = useState(null);
  const cols = data.columns || 3;
  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container">
        {data.heading && <h2 style={{ marginBottom: 24 }}>{data.heading}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
          {(data.images || []).map((img, i) => (
            <div key={i} onClick={() => data.lightbox && setLightbox(img)}
                 style={{ cursor: data.lightbox ? 'zoom-in' : 'default', aspectRatio: '4/3', overflow: 'hidden', background: '#eee' }}>
              <img src={img.src} alt={img.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {data.captions && img.caption && <p style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 0' }}>{img.caption}</p>}
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <div onClick={() => setLightbox(null)}
             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <img src={lightbox.src} alt={lightbox.caption || ''} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}
    </section>
  );
}

// RICH TEXT
function BlockRichText({ data }) {
  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container" style={data.fullWidth ? {} : { maxWidth: 720 }}>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: data.content || '' }} />
      </div>
    </section>
  );
}

// STATS ROW
function BlockStatsRow({ data }) {
  return (
    <section style={{ padding: '48px 0', background: 'var(--light)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${(data.items||[]).length}, 1fr)`, gap: 24 }}>
          {(data.items || []).map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.05em', lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginTop: 8 }}>{item.label}</div>
              {item.sub && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{item.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// LOCATIONS
function BlockLocations({ data }) {
  const items = data.items || [];
  const [active, setActive] = useState(items[0]?.id || '');
  const loc = items.find(l => l.id === active) || items[0];
  if (!items.length) return null;
  return (
    <section id="locations" className="locations">
      <div className="container">
        {data.heading && <div className="section-head"><h2>{data.heading}</h2></div>}
        <div className="locations-card">
          <div className="location-tabs" role="tablist">
            {items.map(l => (
              <button key={l.id} role="tab" aria-selected={active===l.id}
                className={`location-tab${active===l.id?' active':''}`}
                onClick={() => setActive(l.id)}>{l.name}</button>
            ))}
          </div>
          {loc && (
            <div className="location-content">
              <div className="location-image" data-loc={loc.id} aria-hidden="true">
                {loc.image
                  ? <img src={loc.image} alt={loc.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : <div className="placeholder">[ {loc.name} photo ]</div>}
              </div>
              <div className="location-info">
                <h4>{loc.name.toUpperCase()}</h4>
                <div className="location-info-row">
                  <div>
                    <p className="addr">{loc.address}<br/>{loc.city}</p>
                    <div className="location-hours">
                      <strong>{loc.weekday}</strong><br/>{loc.sat}<br/>{loc.sun}
                    </div>
                  </div>
                  <div className="location-meta">
                    {loc.phone1 && <a href={`tel:${loc.phone1}`}><span className="icon"><Icon.Phone /></span> {loc.phone1}</a>}
                    {loc.phone2 && <a href={`tel:${loc.phone2}`}><span className="icon"><Icon.Phone /></span> {loc.phone2}</a>}
                    <a href="#" className="directions-link">Directions <Icon.Arrow /></a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// BLOG GRID
function BlockBlogGrid({ data }) {
  const posts = (_posts || []).slice(0, data.postCount || 4);
  if (!posts.length) return null;
  const postUrl = window.postUrl || ((p) => `Blog - ${p.title}.html`);
  return (
    <section id="blog" className="blog">
      <div className="container">
        {(data.heading || data.viewAllHref) && (
          <div className="section-head">
            {data.heading && <h2>{data.heading}</h2>}
            {data.viewAllHref && <a href={data.viewAllHref} className="view-all">{data.viewAllText || 'View All'} <Icon.Arrow /></a>}
          </div>
        )}
        <div className="blog-grid">
          {posts.map((p, i) => (
            <a key={i} href={postUrl(p)} className="blog-card-link">
              <article className="blog-card">
                <div className="blog-image"><img src={p.image} alt={p.imageAlt || p.title} /></div>
                <h3>{p.title}</h3>
                <p>{p.dek}</p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA BAND
function BlockCtaBand({ data }) {
  const bgMap = { navy: 'var(--navy)', cyan: 'var(--cyan)', green: 'var(--green)', white: 'white' };
  const bg = bgMap[data.background] || 'var(--navy)';
  const dark = data.background === 'white';
  return (
    <section className="cta-band" style={{ background: bg }}>
      <div className="container">
        <div>
          <h2 style={{ color: dark ? 'var(--navy)' : 'white' }}>{data.heading}</h2>
          {data.body && <p style={{ color: dark ? 'var(--muted)' : 'rgba(255,255,255,.8)' }}>{data.body}</p>}
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {data.cta1Text && <a href={data.cta1Href||'#'} className={`btn ${dark?'btn-primary':'btn-primary'}`}>{data.cta1Text} <Icon.Arrow /></a>}
          {data.cta2Text && <a href={data.cta2Href||'#'} className="btn btn-ghost">{data.cta2Text} <Icon.Arrow /></a>}
        </div>
      </div>
    </section>
  );
}

// FAQ ACCORDION
function BlockFAQAccordion({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        {(data.items || []).map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setOpen(open===i?null:i)}
                    style={{ width:'100%', background:'none', border:'none', padding:'18px 0', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', fontFamily:'inherit', fontSize:16, fontWeight:700, color:'var(--navy)', textAlign:'left' }}>
              {item.question}
              <Icon.ChevDown style={{ transform: open===i?'rotate(180deg)':'', transition:'transform .2s', flexShrink:0 }} />
            </button>
            {open===i && (
              <div style={{ padding:'0 0 18px', color:'var(--muted)', fontSize:15, lineHeight:1.7 }}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// TESTIMONIALS
function BlockTestimonials({ data }) {
  return (
    <section style={{ padding: '60px 0', background: 'var(--light)' }}>
      <div className="container">
        {data.heading && <h2 style={{ textAlign:'center', marginBottom:40 }}>{data.heading}</h2>}
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min((data.items||[]).length,3)},1fr)`, gap:24 }}>
          {(data.items||[]).map((t,i) => (
            <div key={i} style={{ background:'white', padding:28, border:'1px solid var(--border)' }}>
              <p style={{ color:'var(--muted)', lineHeight:1.7, fontStyle:'italic', marginBottom:16 }}>"{t.quote}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                {t.photo && <img src={t.photo} alt={t.name} style={{ width:40,height:40,borderRadius:'50%',objectFit:'cover' }} />}
                <div>
                  <div style={{ fontWeight:700, color:'var(--navy)', fontSize:14 }}>{t.name}</div>
                  {t.role && <div style={{ fontSize:12, color:'var(--muted)' }}>{t.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// VIDEO
function BlockVideo({ data }) {
  const aspect = data.aspectRatio || '16/9';
  let embed = null;
  if (data.url) {
    const yt = data.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    const vm = data.url.match(/vimeo\.com\/(\d+)/);
    if (yt) embed = `https://www.youtube.com/embed/${yt[1]}`;
    if (vm) embed = `https://player.vimeo.com/video/${vm[1]}`;
  }
  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container" style={data.fullWidth ? { maxWidth:'100%', padding:0 } : {}}>
        {data.heading && <h2 style={{ marginBottom:20 }}>{data.heading}</h2>}
        <div style={{ position:'relative', paddingBottom:`calc(100% / (${aspect.replace('/',',')}))`, background:'#000', overflow:'hidden' }}>
          {embed
            ? <iframe src={embed} style={{ position:'absolute',inset:0,width:'100%',height:'100%' }} frameBorder="0" allowFullScreen />
            : <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:14 }}>[ paste a YouTube or Vimeo URL ]</div>}
        </div>
      </div>
    </section>
  );
}

// SPACER
function BlockSpacer({ data }) {
  const heights = { sm:32, md:64, lg:96, xl:128 };
  const h = heights[data.size] || 64;
  return (
    <div style={{ height: h }}>
      {data.divider && <hr style={{ border:'none', borderTop:'1px solid var(--border)', margin:`${h/2}px 0` }} />}
    </div>
  );
}

// FORM
function BlockForm({ data }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  function handleChange(id, val) { setValues(v => ({ ...v, [id]: val })); }
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to form backend (Google Sheets, etc.)
    setSubmitted(true);
  }
  if (submitted) return (
    <section style={{ padding:'48px 0' }}>
      <div className="container" style={{ maxWidth:600 }}>
        <div style={{ background:'rgba(128,194,65,.1)', border:'1px solid var(--green)', padding:'24px 28px', color:'var(--navy)', fontWeight:600 }}>
          {data.successMessage || 'Thank you — we\'ll be in touch shortly.'}
        </div>
      </div>
    </section>
  );
  return (
    <section style={{ padding:'48px 0' }}>
      <div className="container" style={{ maxWidth:600 }}>
        {data.heading && <h2 style={{ marginBottom:24 }}>{data.heading}</h2>}
        <form onSubmit={handleSubmit}>
          {(data.fields||[]).map(field => (
            <div key={field.id} style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:800, color:'var(--muted)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:5 }}>{field.label}{field.required && ' *'}</label>
              {field.type === 'textarea' ? (
                <textarea required={field.required} placeholder={field.placeholder}
                  value={values[field.id]||''} onChange={e=>handleChange(field.id,e.target.value)}
                  style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', fontFamily:'inherit', fontSize:14, minHeight:120, resize:'vertical', borderRadius:0, outline:'none' }} />
              ) : field.type === 'select' ? (
                <select required={field.required} value={values[field.id]||''} onChange={e=>handleChange(field.id,e.target.value)}
                  style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', fontFamily:'inherit', fontSize:14, borderRadius:0, outline:'none', background:'white' }}>
                  <option value="">Select…</option>
                  {(field.options||[]).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type={field.type} required={field.required} placeholder={field.placeholder}
                  value={values[field.id]||''} onChange={e=>handleChange(field.id,e.target.value)}
                  style={{ width:'100%', padding:'10px 14px', border:'1.5px solid var(--border)', fontFamily:'inherit', fontSize:14, borderRadius:0, outline:'none' }} />
              )}
            </div>
          ))}
          <button type="submit" style={{ padding:'13px 28px', background:'var(--navy)', color:'white', border:'none', fontFamily:'inherit', fontSize:13, fontWeight:800, letterSpacing:'.06em', textTransform:'uppercase', cursor:'pointer' }}>
            {data.submitText || 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}

// CODE BLOCK
function BlockCode({ data }) {
  useEffect(() => {
    if (!data.execute || !data.code) return;
    const lang = data.language;
    try {
      if (lang === 'javascript' || lang === 'js') {
        const s = document.createElement('script');
        s.textContent = data.code;
        document.body.appendChild(s);
      } else if (lang === 'css') {
        const s = document.createElement('style');
        s.textContent = data.code;
        document.head.appendChild(s);
      } else if (lang === 'html') {
        const div = document.createElement('div');
        div.innerHTML = data.code;
        document.getElementById('code-block-' + data.id)?.appendChild(div);
      }
    } catch(e) { console.warn('Code block error:', e); }
  }, []);

  if (data.execute && (data.language === 'html')) {
    return <div id={'code-block-' + data.id}></div>;
  }
  if (data.execute && (data.language === 'javascript' || data.language === 'css')) {
    return null; // injected silently
  }
  return (
    <section style={{ padding:'32px 0' }}>
      <div className="container">
        {data.label && <p style={{ fontSize:11, fontWeight:800, color:'var(--muted)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:8 }}>{data.label}</p>}
        <pre style={{ background:'#0d1117', color:'#e6edf3', padding:'24px 28px', overflowX:'auto', fontSize:13, lineHeight:1.7, fontFamily:"ui-monospace,'SF Mono',Menlo,monospace", border:'1px solid #30363d' }}>
          <code>{data.code}</code>
        </pre>
      </div>
    </section>
  );
}

// HTML EMBED
function BlockHTMLEmbed({ data }) {
  return <div dangerouslySetInnerHTML={{ __html: data.html || '' }} />;
}

// ── BLOCK ROUTER ──
function renderBlock(block) {
  const { type, data, id } = block;
  const key = id;
  switch(type) {
    case 'hero':           return <BlockHero           key={key} data={data} />;
    case 'section-header': return <BlockSectionHeader  key={key} data={data} />;
    case 'text-image':     return <BlockTextImage      key={key} data={data} />;
    case 'cards-grid':     return <BlockCardsGrid      key={key} data={data} />;
    case 'gallery':        return <BlockGallery        key={key} data={data} />;
    case 'rich-text':      return <BlockRichText       key={key} data={data} />;
    case 'stats-row':      return <BlockStatsRow       key={key} data={data} />;
    case 'locations':      return <BlockLocations      key={key} data={data} />;
    case 'blog-grid':      return <BlockBlogGrid       key={key} data={data} />;
    case 'cta-band':       return <BlockCtaBand        key={key} data={data} />;
    case 'faq-accordion':  return <BlockFAQAccordion   key={key} data={data} />;
    case 'testimonials':   return <BlockTestimonials   key={key} data={data} />;
    case 'video':          return <BlockVideo          key={key} data={data} />;
    case 'spacer':         return <BlockSpacer         key={key} data={data} />;
    case 'form':           return <BlockForm           key={key} data={data} />;
    case 'code':           return <BlockCode           key={key} data={{ ...data, id }} />;
    case 'html-embed':     return <BlockHTMLEmbed      key={key} data={data} />;
    default:               return <div key={key} style={{ padding:20, color:'orange', fontSize:12 }}>Unknown block type: {type}</div>;
  }
}

// ── PAGE RENDERER ──
function BlockPage({ pageId, current }) {
  useEffect(() => { applySEO(pageId); }, [pageId]);
  const page = _pages[pageId];
  if (!page) return <div style={{ padding: 80, textAlign:'center', color:'var(--muted)' }}>Page not found: {pageId}</div>;
  return (
    <>
      <Nav current={current || pageId} />
      <main>{(page.blocks || []).map(block => renderBlock(block))}</main>
      <Footer />
    </>
  );
}

// Expose for HTML shells
window.BlockPage = BlockPage;
