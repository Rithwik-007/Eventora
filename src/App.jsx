import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown,
  Clock3, Compass, Facebook, Instagram, MapPin, Menu, Moon, Search,
  Sparkles, Sun, Ticket, X, Zap
} from 'lucide-react';

const events = [
  {
    id: 1, title: 'Neon Nights Festival', category: 'Music', date: '2026-11-21',
    time: '6:30 PM – 11:30 PM', venue: 'Ekamra Haat, Bhubaneswar', city: 'Bhubaneswar',
    price: '₹799', tag: 'TRENDING', featured: true,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85',
    description: 'A high-energy open-air celebration of sound, light and community. Discover emerging artists, immersive installations and a night made for dancing.',
    schedule: ['6:30 PM · Gates open & welcome DJ', '7:30 PM · Indie artist showcase', '9:00 PM · Headline performance', '10:45 PM · Neon after-hours']
  },
  {
    id: 2, title: 'Design Forward 2026', category: 'Technology', date: '2026-11-28',
    time: '10:00 AM – 5:00 PM', venue: 'Mayfair Convention, Bhubaneswar', city: 'Bhubaneswar',
    price: '₹499', tag: 'LIMITED SEATS', featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    description: 'A one-day gathering for curious minds shaping the future of digital products. Learn from makers, exchange ideas and leave with a fresh perspective.',
    schedule: ['10:00 AM · Registration & coffee', '11:00 AM · Keynote: Designing what is next', '1:00 PM · Product design workshops', '3:30 PM · Creative panel & networking']
  },
  {
    id: 3, title: 'The Sunday Table', category: 'Food', date: '2026-12-06',
    time: '12:00 PM – 4:00 PM', venue: 'Trident Lawns, Bhubaneswar', city: 'Bhubaneswar',
    price: '₹1,199', tag: 'NEW', featured: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85',
    description: 'A relaxed food and culture pop-up celebrating local flavours, independent kitchens and the joy of sharing a table.',
    schedule: ['12:00 PM · Doors & tasting trail', '1:00 PM · Live chef demos', '2:30 PM · Local food stories', '3:30 PM · Dessert social']
  },
  {
    id: 4, title: 'Move With Purpose', category: 'Wellness', date: '2026-12-12',
    time: '7:00 AM – 11:00 AM', venue: 'Biju Patnaik Park, Bhubaneswar', city: 'Bhubaneswar',
    price: '₹299', tag: 'COMMUNITY', featured: false,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85',
    description: 'Reset your routine with a morning of movement, mindful sessions and positive energy. All experience levels are welcome.',
    schedule: ['7:00 AM · Check-in & warm-up', '7:30 AM · Guided movement', '9:00 AM · Breathwork session', '10:00 AM · Healthy breakfast']
  },
  {
    id: 5, title: 'Founders & Futures', category: 'Business', date: '2026-12-19',
    time: '9:30 AM – 6:00 PM', venue: 'KIIT Convention Centre, Bhubaneswar', city: 'Bhubaneswar',
    price: '₹599', tag: 'NETWORKING', featured: false,
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=1200&q=85',
    description: 'Meet builders, operators and ambitious students for candid conversations on startups, product thinking and the next wave of ideas.',
    schedule: ['9:30 AM · Check-in', '10:30 AM · Founder stories', '1:30 PM · Startup showcase', '4:00 PM · Open networking']
  },
  {
    id: 6, title: 'Frames of Odisha', category: 'Arts', date: '2027-01-09',
    time: '11:00 AM – 7:00 PM', venue: 'Regional Museum of Natural History, Bhubaneswar', city: 'Bhubaneswar',
    price: 'Free', tag: 'CULTURE', featured: false,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85',
    description: 'An intimate showcase of photography, illustration and visual storytelling by independent artists from across Odisha.',
    schedule: ['11:00 AM · Exhibition opens', '1:00 PM · Artist walkthrough', '3:00 PM · Photo storytelling talk', '5:30 PM · Community meet-up']
  }
];

const categories = ['All events', 'Music', 'Technology', 'Food', 'Wellness', 'Business', 'Arts'];
const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const daysUntil = (date) => Math.max(0, Math.ceil((new Date(`${date}T23:59:59`).getTime() - Date.now()) / 86400000));

function Orb() {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
    }
  });
  return <Float speed={1.3} rotationIntensity={0.22} floatIntensity={0.55}>
    <mesh ref={mesh} scale={1.55}>
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial color="#a78bfa" roughness={0.18} metalness={0.68} distort={0.32} speed={1.5} />
    </mesh>
  </Float>;
}

function HeroScene() {
  return <div className="hero-scene" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 3, 4]} intensity={24} color="#ff9fcb" />
      <pointLight position={[-3, -2, 2]} intensity={18} color="#7765ff" />
      <Suspense fallback={null}><Orb /><Stars radius={24} depth={10} count={700} factor={2.2} fade speed={0.35} /></Suspense>
    </Canvas>
  </div>;
}

function EventCard({ event, onOpen, index }) {
  return <article className="event-card" style={{ '--delay': `${index * 70}ms` }}>
    <button className="card-image-button" onClick={() => onOpen(event)} aria-label={`View ${event.title} details`}>
      <img className="card-image" src={event.image} alt={event.title} loading="lazy" />
      <span className="event-tag">{event.tag}</span>
      <span className="image-arrow"><ArrowUpRight size={18} /></span>
    </button>
    <div className="card-content">
      <div className="card-meta"><span>{event.category}</span><span className="dot" /> <span>{formatDate(event.date)}</span></div>
      <button className="card-title" onClick={() => onOpen(event)}>{event.title}</button>
      <div className="card-bottom">
        <span className="card-venue"><MapPin size={14} /> {event.city}</span>
        <strong>{event.price}</strong>
      </div>
    </div>
  </article>;
}

function EventModal({ event, onClose, onRegister }) {
  if (!event) return null;
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="icon-button modal-close" onClick={onClose} aria-label="Close details"><X size={19} /></button>
      <div className="modal-image-wrap"><img src={event.image} alt={event.title} /></div>
      <div className="modal-body">
        <div className="card-meta"><span>{event.category}</span><span className="dot" /><span>{event.tag}</span></div>
        <h2 id="modal-title">{event.title}</h2>
        <p className="modal-description">{event.description}</p>
        <div className="detail-grid">
          <div><CalendarDays size={17} /><span><b>{formatDate(event.date)}</b><small>{daysUntil(event.date)} days to go</small></span></div>
          <div><Clock3 size={17} /><span><b>{event.time}</b><small>Local time (IST)</small></span></div>
          <div><MapPin size={17} /><span><b>{event.venue}</b><small>{event.city}, Odisha</small></span></div>
          <div><Ticket size={17} /><span><b>{event.price}</b><small>Per participant</small></span></div>
        </div>
        <h3 className="schedule-heading">The experience</h3>
        <div className="schedule-list">{event.schedule.map((item) => <div key={item}><span className="schedule-dot" />{item}</div>)}</div>
        <button className="primary-button modal-register" onClick={() => onRegister(event)}>Register for this event <ArrowRight size={17} /></button>
      </div>
    </section>
  </div>;
}

function RegisterModal({ event, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventId: String(event?.id || '') });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  useEffect(() => setForm((f) => ({ ...f, eventId: String(event?.id || '') })), [event]);
  const selected = events.find((e) => e.id === Number(form.eventId));
  const update = (key, value) => { setForm((f) => ({ ...f, [key]: value })); setErrors((e) => ({ ...e, [key]: '' })); };
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!form.eventId) next.eventId = 'Please select an event.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const registration = { ...form, eventId: Number(form.eventId), eventTitle: selected.title, createdAt: new Date().toISOString(), reference: `EVT-${Date.now().toString().slice(-7)}` };
    const previous = JSON.parse(localStorage.getItem('eventora_registrations') || '[]');
    localStorage.setItem('eventora_registrations', JSON.stringify([...previous, registration]));
    setDone(true);
    onSuccess();
  };
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="register-modal" role="dialog" aria-modal="true" aria-labelledby="register-title">
      <button className="icon-button modal-close" onClick={onClose} aria-label="Close registration"><X size={19} /></button>
      {!done ? <>
        <div className="eyebrow"><span className="eyebrow-line" /> SAVE YOUR SPOT</div>
        <h2 id="register-title">Make it <span>happen.</span></h2>
        <p className="register-intro">A few details and you're on the list. We'll see you there.</p>
        <form onSubmit={submit} noValidate>
          <label>Full name<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" autoComplete="name" />{errors.name && <small className="field-error">{errors.name}</small>}</label>
          <label>Email address<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />{errors.email && <small className="field-error">{errors.email}</small>}</label>
          <label>Phone number<input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="10-digit mobile number" maxLength={15} autoComplete="tel" />{errors.phone && <small className="field-error">{errors.phone}</small>}</label>
          <label>Select event<select value={form.eventId} onChange={(e) => update('eventId', e.target.value)}><option value="">Choose an event</option>{events.map((item) => <option value={item.id} key={item.id}>{item.title} · {formatDate(item.date)}</option>)}</select>{errors.eventId && <small className="field-error">{errors.eventId}</small>}</label>
          <button className="primary-button submit-button" type="submit">Confirm registration <ArrowRight size={17} /></button>
          <p className="privacy-note">Your details stay on this device for this prototype.</p>
        </form>
      </> : <div className="success-state">
        <div className="success-icon"><Check size={30} /></div>
        <div className="eyebrow"><span className="eyebrow-line" /> YOU'RE ON THE LIST</div>
        <h2>See you <span>there.</span></h2>
        <p>Your registration for <b>{selected?.title}</b> is confirmed on this device.</p>
        <button className="primary-button submit-button" onClick={onClose}>Back to exploring <ArrowRight size={17} /></button>
      </div>}
    </section>
  </div>;
}

export default function App() {
  const [category, setCategory] = useState('All events');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(() => localStorage.getItem('eventora_theme') !== 'light');
  const [selected, setSelected] = useState(null);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [toast, setToast] = useState('');
  const [registrations, setRegistrations] = useState(() => JSON.parse(localStorage.getItem('eventora_registrations') || '[]'));
  const searchRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('eventora_theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') { setSelected(null); setRegisterOpen(false); setRegisterEvent(null); setMenuOpen(false); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const filtered = useMemo(() => events.filter((event) => {
    const matchesCategory = category === 'All events' || event.category === category;
    const text = `${event.title} ${event.category} ${event.venue} ${event.description}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase().trim());
  }), [category, query]);
  const visible = showAll ? filtered : filtered.slice(0, 4);
  const openRegister = (event = null) => { setSelected(null); setRegisterEvent(event); setRegisterOpen(true); };
  const notify = () => { setRegistrations(JSON.parse(localStorage.getItem('eventora_registrations') || '[]')); setToast('Registration saved successfully'); setTimeout(() => setToast(''), 3200); };
  const featured = events.find((e) => e.featured);

  return <div className="app-shell">
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Eventora home"><span className="brand-mark"><Sparkles size={17} /></span>eventora<span className="brand-period">.</span></a>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
        <a href="#explore" onClick={() => setMenuOpen(false)}>Explore events</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
        <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="header-cta" onClick={() => openRegister(null)}>Get tickets <ArrowUpRight size={15} /></button>
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> GOOD THINGS HAPPEN WHEN WE GET TOGETHER</div>
          <h1>Find your next<br /><span>great story.</span></h1>
          <p className="hero-description">The best moments don't just happen. Discover experiences, meet your people, and make every plan count.</p>
          <div className="hero-actions">
            <a href="#explore" className="primary-button">Explore events <ArrowRight size={17} /></a>
            <a href="#about" className="text-link">What's Eventora? <ArrowDown size={15} /></a>
          </div>
          <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>A</span><span>M</span><span>+</span></div><p><b>2,400+</b> people finding their next thing</p></div>
        </div>
        <HeroScene />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-side-note"><span className="side-note-line" /> MADE FOR THE MOMENTS THAT MATTER</div>
        <div className="hero-bottom"><span>01 / DISCOVER</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
      </section>

      <section className="featured-section">
        <div className="section-topline"><span className="section-kicker">THE ONE TO WATCH</span><span className="section-index">FEATURED / 001</span></div>
        <div className="featured-card">
          <div className="featured-image"><img src={featured.image} alt={featured.title} /><div className="featured-image-shade" /><span className="featured-stamp"><Zap size={13} /> EDITOR'S PICK</span></div>
          <div className="featured-info">
            <div className="card-meta"><span>{featured.category}</span><span className="dot" /><span>{formatDate(featured.date)}</span></div>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <div className="featured-details"><span><MapPin size={15} /> {featured.venue}</span><span><Clock3 size={15} /> {featured.time}</span></div>
            <div className="featured-footer"><div><small>STARTING FROM</small><strong>{featured.price}</strong></div><button className="primary-button" onClick={() => setSelected(featured)}>Explore event <ArrowUpRight size={17} /></button></div>
          </div>
        </div>
      </section>

      <section className="explore-section" id="explore">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> THE GOOD STUFF</div><h2>Find your <span>thing.</span></h2></div>
          <p>From big nights out to little moments of inspiration. There's a place for you here.</p>
        </div>
        <div className="explore-toolbar">
          <div className="category-tabs" role="group" aria-label="Filter events by category">
            {categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => { setCategory(item); setShowAll(false); }}>{item}</button>)}
          </div>
          <label className="search-box"><Search size={17} /><input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events..." /><kbd>⌘ K</kbd>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}</label>
        </div>
        <div className="results-line"><span>{filtered.length} EXPERIENCES TO EXPLORE</span><span>BHUBANESWAR, INDIA <MapPin size={12} /></span></div>
        {visible.length ? <div className="events-grid">{visible.map((event, i) => <EventCard key={event.id} event={event} index={i} onOpen={setSelected} />)}</div> : <div className="empty-state"><Compass size={30} /><h3>No events found</h3><p>Try another search or category to find your next experience.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All events'); }}>Clear filters <ArrowRight size={15} /></button></div>}
        {filtered.length > 4 && <div className="load-more-wrap"><button className="secondary-button" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'Show all events'} <ChevronDown size={16} className={showAll ? 'rotate' : ''} /></button></div>}
      </section>

      <section className="about-section" id="about">
        <div className="about-decoration"><div className="about-ring ring-a" /><div className="about-ring ring-b" /><Sparkles size={35} /></div>
        <div className="about-copy"><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT US</div><h2>Less scrolling.<br /><span>More living.</span></h2><p>Eventora brings the experiences worth leaving home for into one place. No endless searching, no missed moments. Just good events and the people who make them memorable.</p><a href="#explore" className="text-link">Find your next experience <ArrowUpRight size={16} /></a></div>
        <div className="about-stats"><div><strong>06<span>+</span></strong><small>CURATED EVENTS</small></div><div><strong>2.4<span>k</span></strong><small>COMMUNITY MEMBERS</small></div><div><strong>01</strong><small>GOOD PLACE TO START</small></div></div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-orb"><Sparkles size={25} /></div>
        <div><div className="eyebrow"><span className="eyebrow-line" /> DON'T BE A STRANGER</div><h2>Your next story<br />starts <span>here.</span></h2></div>
        <button className="primary-button" onClick={() => openRegister(null)}>Find an event <ArrowRight size={17} /></button>
      </section>
    </main>

    <footer className="site-footer" id="footer">
      <div className="footer-top"><a href="#home" className="brand"><span className="brand-mark"><Sparkles size={17} /></span>eventora<span className="brand-period">.</span></a><p>Making room for more good moments.</p><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={17} /></a></div></div>
      <div className="footer-bottom"><span>© 2026 EVENTORA. MADE FOR THE MOMENTS.</span><span>DESIGNED WITH INTENTION <Sparkles size={12} /></span><span>MADE BY RITHWIK</span><a href="#home">BACK TO TOP ↑</a></div>
    </footer>

    {selected && <EventModal event={selected} onClose={() => setSelected(null)} onRegister={openRegister} />}
    {registerOpen && <RegisterModal event={registerEvent} onClose={() => { setRegisterOpen(false); setRegisterEvent(null); }} onSuccess={notify} />}
    {toast && <div className="toast"><Check size={16} />{toast}</div>}
  </div>;
}
