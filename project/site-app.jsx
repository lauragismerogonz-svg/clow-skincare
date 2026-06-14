/* global React, ReactDOM */
/* Site app — orchestrates the Clow storefront prototype.
   - hash routing
   - cart state (localStorage)
   - i18n: FR / EN / NL via I18n* overrides (from site-i18n.jsx)
   - Mobile preview mode (Tweak) — wraps the site in a phone frame
     and triggers the same responsive CSS as a real small viewport.
   - Quiz email capture — opens QuizRoutineEmailModal with the user's
     result + entered email.
   - Tweaks: language, homepage variant, device mode, routine accent
   - fixes the hero video path globally
*/
const { useState, useEffect, useMemo, useRef } = React;

/* ---------- localStorage helpers ---------- */
const LS = (k, fallback) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fallback : v; } catch { return fallback; } };
const setLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

/* ---------- Hash router ---------- */
function parseHash() {
  const h = location.hash.replace(/^#/, '') || 'home';
  const parts = h.split('/');
  const view = parts[0] || 'home';
  if (view === 'collection') {
    return { view: 'collection', data: { kind: parts[1] || 'cat', value: decodeURIComponent(parts.slice(2).join('/') || 'Tous') } };
  }
  if (view === 'pdp') return { view: 'pdp', data: { id: parts[1] } };
  return { view, data: null };
}
function setHash({ view, data }) {
  let h = view;
  if (view === 'collection' && data) h = `collection/${data.kind || 'cat'}/${encodeURIComponent(data.value || 'Tous')}`;
  if (view === 'pdp' && data && data.id) h = `pdp/${data.id}`;
  if ('#' + h !== location.hash) location.hash = h;
}

/* ---------- DEFAULTS ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  lang: 'fr',
  homeVariant: 'classic',
  device: 'desktop',
  accent: 'glass',
}/*EDITMODE-END*/;

/* ---------- Accent palette CSS overrides ---------- */
const ACCENTS = {
  hydra:     { solid: '#8fadb6', tint: '#e4edef', fg: '#3f6068', label: { fr: 'Hydratation', en: 'Hydration', nl: 'Hydratatie' } },
  pores:     { solid: '#94a47e', tint: '#e7ebdd', fg: '#4f5e3a', label: { fr: 'Anti-imperfections', en: 'Anti-blemish', nl: 'Anti-onzuiverheden' } },
  age:       { solid: '#a98a98', tint: '#ece0e4', fg: '#7a4d5c', label: { fr: 'Anti-Âge', en: 'Anti-Age', nl: 'Anti-Aging' } },
  glass:     { solid: '#a9a4c4', tint: '#e8e6f0', fg: '#5a5680', label: { fr: 'Glass Skin', en: 'Glass Skin', nl: 'Glass Skin' } },
  sensitive: { solid: '#d2a096', tint: '#f1ddd6', fg: '#9a5d50', label: { fr: 'Peau Sensible', en: 'Sensitive', nl: 'Gevoelige huid' } },
};

/* Short panel-strings */
const PANEL = {
  fr: { var: 'Variation', home: 'Page d\'accueil', lang: 'Langue', device: 'Appareil', accent: 'Accent routine active', desktop: 'Bureau', mobile: 'Mobile' },
  en: { var: 'Variation', home: 'Homepage', lang: 'Language', device: 'Device', accent: 'Active routine accent', desktop: 'Desktop', mobile: 'Mobile' },
  nl: { var: 'Variatie', home: 'Homepage', lang: 'Taal', device: 'Apparaat', accent: 'Actieve routine accent', desktop: 'Desktop', mobile: 'Mobiel' },
};

/* ---------- The App ---------- */
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(parseHash());
  const [cart, setCart] = useState(() => LS('clow.cart', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [emailModal, setEmailModal] = useState(null); // Quiz routine-email preview
  const rootRef = useRef(null);

  /* hash routing */
  useEffect(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /* persist cart */
  useEffect(() => { setLS('clow.cart', cart); }, [cart]);

  /* ---------- Mobile-preview class on <html> — drives the responsive CSS
     block in <style>, AND wraps #root in a phone-style frame. */
  useEffect(() => {
    const html = document.documentElement;
    if (t.device === 'mobile') html.classList.add('clow-mobile-mode');
    else html.classList.remove('clow-mobile-mode');
    return () => html.classList.remove('clow-mobile-mode');
  }, [t.device]);

  /* ---------- Accent override CSS so the active routine tint is reflected
     throughout (hero badges, quiz, account etc.) */
  useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.glass;
    const styleId = 'clow-accent-override';
    let s = document.getElementById(styleId);
    if (!s) { s = document.createElement('style'); s.id = styleId; document.head.appendChild(s); }
    s.textContent = `
      :root {
        --c-active: ${a.solid};
        --c-active-tint: ${a.tint};
        --c-active-fg: ${a.fg};
      }
      .accent-swap-bg { background: ${a.tint} !important; }
      .accent-swap-fg { color: ${a.fg} !important; }
      .accent-swap-dot { background: ${a.solid} !important; }
    `;
  }, [t.accent]);

  /* ---------- Drop the brand `ritual` photo behind any <video> on the
     page so the cover never reads as empty, even if the video itself
     fails to load. Also clears the bundled Hero's video src (it points
     at a broken `../../assets/...` path) to stop the network error. */
  useEffect(() => {
    const fix = () => {
      document.querySelectorAll('video').forEach((v) => {
        const src = v.getAttribute('src') || '';
        if (src && !v.dataset.clowHandled) {
          v.dataset.clowHandled = '1';
          v.removeAttribute('src');
          v.removeAttribute('preload');
          v.removeAttribute('autoplay');
          try { v.pause(); v.load(); } catch {}
        }
        const parent = v.parentElement;
        if (parent && !parent.querySelector('img[data-clow-fallback]') && window.CLOWIMG && window.CLOWIMG.ritual) {
          const cs = getComputedStyle(parent);
          if (cs.position === 'static') parent.style.position = 'relative';
          const img = document.createElement('img');
          img.src = window.CLOWIMG.ritual;
          img.alt = '';
          img.setAttribute('data-clow-fallback', '');
          Object.assign(img.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: '0' });
          parent.insertBefore(img, parent.firstChild);
        }
      });
    };
    fix();
    const obs = new MutationObserver(fix);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [route.view, t.homeVariant]);

  /* ---------- nav ---------- */
  const onNav = (view, data) => setHash({ view, data });

  /* ---------- cart ops ---------- */
  const onAdd = (p, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === p.id);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...n[idx], qty: n[idx].qty + qty }; return n; }
      return [...prev, { id: p.id, brand: p.brand, name: p.name, now: p.now, was: p.was, pimg: p.pimg, tint: p.tint, qty }];
    });
    setToast({ name: p.name, when: Date.now() });
  };
  const onQty = (id, delta) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0));
  };

  /* ---------- toast clear ---------- */
  useEffect(() => {
    if (!toast) return;
    const tm = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(tm);
  }, [toast]);

  /* ---------- Open product PDP by product id ---------- */
  const onOpen = (p) => onNav('pdp', { id: p.id });
  const product = useMemo(() => route.view === 'pdp' && route.data ? window.CLOW.PRODUCTS.find((p) => p.id === route.data.id) : null, [route]);

  /* ---------- main view picker ---------- */
  const renderView = () => {
    switch (route.view) {
      case 'home':
        return t.homeVariant === 'editorial'
          ? <window.HomeEditorial onNav={onNav} onAdd={onAdd} onOpen={onOpen} lang={t.lang} />
          : <ClassicHome onNav={onNav} onAdd={onAdd} onOpen={onOpen} lang={t.lang} />;
      case 'collection':
        return <window.Collection data={route.data || { kind: 'cat', value: 'Tous' }} onAdd={onAdd} onOpen={onOpen} onNav={onNav} />;
      case 'pdp':
        return product ? <window.PDP product={product} onNav={onNav} onAdd={onAdd} onOpen={onOpen} /> : <NotFound onNav={onNav} lang={t.lang} />;
      case 'quiz':
        return <window.I18nQuiz onNav={onNav} onAdd={onAdd} lang={t.lang} onShowRoutineEmail={setEmailModal} />;
      case 'account':
        return <window.I18nAccount lang={t.lang} />;
      case 'gift':
        return <window.GiftPage onAdd={onAdd} />;
      case 'about':
        return <window.About onNav={onNav} lang={t.lang} />;
      case 'checkout':
        return <window.Checkout cart={cart} onQty={onQty} onNav={onNav} lang={t.lang} />;
      default:
        return <NotFound onNav={onNav} lang={t.lang} />;
    }
  };

  const P = PANEL[t.lang] || PANEL.fr;

  return (
    <div ref={rootRef} className="clow-type" style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg-1)' }}>
      <window.I18nHeader cart={cart} onOpenCart={() => setCartOpen(true)} onNav={onNav} view={route.view} lang={t.lang} />
      <main key={route.view + '|' + (route.data && route.data.value) + '|' + t.homeVariant + '|' + t.lang} className="page-fade">
        {renderView()}
      </main>
      <window.I18nFooter lang={t.lang} />

      <CheckoutCartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onQty={onQty} onCheckout={() => { setCartOpen(false); onNav('checkout'); }} lang={t.lang} />

      {/* Quiz routine-email preview modal */}
      <window.QuizRoutineEmailModal open={!!emailModal} data={emailModal} onClose={() => setEmailModal(null)} />

      {/* Quick-add toast */}
      <div aria-live="polite" style={{ position: 'fixed', bottom: 24, left: '50%', transform: `translateX(-50%) translateY(${toast ? '0' : '20px'})`, opacity: toast ? 1 : 0, transition: 'all var(--dur) var(--ease-out)', background: 'var(--espresso-deep)', color: 'var(--fg-on-dark)', padding: '12px 22px', borderRadius: 999, boxShadow: 'var(--shadow-lg)', fontSize: 13.5, fontWeight: 500, zIndex: 90, pointerEvents: 'none' }}>
        {toast && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}><window.Icon name="check" size={15} /> <span style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{toast.name} · {(window.TXT?.[t.lang] || window.TXT?.fr)?.toastAdded || 'ajouté'}</span></span>}
      </div>

      {/* Tweaks panel */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label={P.var} />
        <window.TweakRadio label={P.home} value={t.homeVariant} options={['classic', 'editorial']} onChange={(v) => setTweak('homeVariant', v)} />
        <window.TweakSection label={P.lang} />
        <window.TweakRadio label={P.lang} value={t.lang} options={['fr', 'en', 'nl']} onChange={(v) => setTweak('lang', v)} />
        <window.TweakSection label={P.device} />
        <window.TweakRadio label={P.device} value={t.device}
          options={[{ value: 'desktop', label: P.desktop }, { value: 'mobile', label: P.mobile }]}
          onChange={(v) => setTweak('device', v)} />
        <window.TweakSection label={P.accent} />
        <AccentPicker value={t.accent} onChange={(v) => setTweak('accent', v)} lang={t.lang} />
      </window.TweaksPanel>
    </div>
  );
}

/* ---------- Classic home wrapping window.Home ---------- */
function ClassicHome({ onNav, onAdd, onOpen, lang }) {
  return <window.Home onNav={onNav} onAdd={onAdd} onOpen={onOpen} lang={lang} />;
}

/* ---------- Accent picker (custom Tweak control) ---------- */
function AccentPicker({ value, onChange, lang }) {
  return (
    <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {Object.entries(ACCENTS).map(([k, a]) => (
        <button key={k} onClick={() => onChange(k)} title={a.label[lang] || a.label.fr}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, background: value === k ? a.tint : 'transparent', border: '1.5px solid ' + (value === k ? a.solid : 'rgba(255,255,255,.18)'), color: value === k ? a.fg : '#cbd5e1', borderRadius: 999, padding: '5px 11px 5px 5px', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: a.solid, flex: 'none' }} />
          <span>{a.label[lang] || a.label.fr}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Cart drawer with checkout link (override of CartDrawer) ---------- */
function CheckoutCartDrawer({ open, cart, onClose, onQty, onCheckout, lang }) {
  const { Icon, Button, Price, ProductTile } = { Icon: window.Icon, Button: window.Button, Price: window.Price, ProductTile: window.ProductTile };
  const eur = (s) => parseFloat(String(s).replace('€', '').replace(',', '.'));
  const subtotalNum = cart.reduce((s, i) => s + eur(i.now) * i.qty, 0);
  const subtotal = '€' + subtotalNum.toFixed(2).replace('.', ',');
  const freeAt = 39, remain = Math.max(0, freeAt - subtotalNum);
  const L = lang === 'en' ? { title: 'Your bag', remain: 'left for free samples', unlocked: 'Free samples unlocked ✓', empty: 'Your bag is empty.', sub: 'Subtotal', pts: "You'll earn", cta: 'Checkout', just: 'Just ' }
          : lang === 'nl' ? { title: 'Je tas', remain: 'voor gratis stalen', unlocked: 'Gratis stalen vrijgespeeld ✓', empty: 'Je tas is leeg.', sub: 'Subtotaal', pts: 'Je verdient', cta: 'Afrekenen', just: 'Nog ' }
          :                 { title: 'Ton panier', remain: 'pour des échantillons offerts', unlocked: 'Échantillons offerts débloqués ✓', empty: 'Ton panier est vide.', sub: 'Sous-total', pts: 'Tu gagnes', cta: 'Passer la commande', just: 'Plus que ' };
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(46,29,14,.34)', backdropFilter: 'blur(2px)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur)', zIndex: 60 }} />
      <aside style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: 420, maxWidth: '92vw', background: 'var(--bg)', boxShadow: 'var(--shadow-lg)', zIndex: 61,
        transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform var(--dur-slow) var(--ease-out)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--fg-1)' }}>{L.title}</span>
          <button onClick={onClose} aria-label="close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mocha)', padding: 4 }}><Icon name="x" size={22} /></button>
        </div>
        <div style={{ padding: '14px 24px', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12.5, color: 'var(--mocha)', marginBottom: 8 }}>{remain > 0 ? <>{L.just}<b style={{ color: 'var(--espresso)' }}>€{remain.toFixed(2).replace('.', ',')}</b> {L.remain}</> : <b style={{ color: 'var(--success)' }}>{L.unlocked}</b>}</div>
          <div style={{ height: 6, background: 'var(--sand)', borderRadius: 99 }}><div style={{ height: '100%', width: Math.min(100, (subtotalNum / freeAt) * 100) + '%', background: 'var(--c-active, var(--c-glass))', borderRadius: 99, transition: 'width var(--dur)' }} /></div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
          {cart.length === 0 && <div style={{ textAlign: 'center', color: 'var(--fg-3)', padding: '60px 0', fontSize: 14 }}>{L.empty}</div>}
          {cart.map((i) => (
            <div key={i.id} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 64, flex: 'none' }}><ProductTile label={i.name} pimg={i.pimg} tint={i.tint} ratio={1} radius={10} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--latte)' }}>{i.brand}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3, marginBottom: 6 }}>{i.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--border-strong)', borderRadius: 999, padding: '3px 8px' }}>
                    <button onClick={() => onQty(i.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mocha)', display: 'flex', padding: 2 }}><Icon name="minus" size={13} /></button>
                    <span style={{ fontSize: 13, fontWeight: 600, minWidth: 14, textAlign: 'center' }}>{i.qty}</span>
                    <button onClick={() => onQty(i.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mocha)', display: 'flex', padding: 2 }}><Icon name="plus" size={13} /></button>
                  </div>
                  <Price now={i.now} was={i.was} size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ color: 'var(--mocha)', fontSize: 14 }}>{L.sub}</span><span style={{ fontWeight: 700, fontSize: 17, color: 'var(--fg-1)' }}>{subtotal}</span></div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginBottom: 14 }}>{L.pts} <b style={{ color: 'var(--espresso)' }}>{Math.round(subtotalNum)} points</b> Clow Rewards.</div>
            <Button full size="lg" onClick={onCheckout}>{L.cta} <Icon name="arrow-right" size={16} /></Button>
          </div>
        )}
      </aside>
    </>
  );
}

function NotFound({ onNav, lang }) {
  const L = lang === 'en' ? { h: "This page doesn't exist.", b: 'Back to home' }
          : lang === 'nl' ? { h: 'Deze pagina bestaat niet.', b: 'Terug naar home' }
          :                 { h: "Cette page n'existe pas.", b: "Retour à l'accueil" };
  return (
    <div style={{ padding: '120px 32px', textAlign: 'center' }}>
      <window.Eyebrow style={{ justifyContent: 'center' }}>404</window.Eyebrow>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, color: 'var(--fg-1)', margin: '8px 0 16px', letterSpacing: '-0.02em' }}>{L.h}</h2>
      <window.Button onClick={() => onNav('home')}>{L.b}</window.Button>
    </div>
  );
}

/* ---------- Mount ---------- */
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
