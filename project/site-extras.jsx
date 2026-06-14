/* global React */
/* Custom pages that extend the DS storefront:
   - HeroV1Fixed       — Hero overriding broken ../.. video path
   - HomeEditorial     — second home variation: editorial showcase
   - About             — brand story
   - Checkout          — multi-step cart→address→payment→confirm
   - HomeClassic       — wraps window.Home but re-mounts our Hero
*/

const SX = {};
const { useState: useSX, useEffect: useESX, useRef: useRSX } = React;

/* ---------- Helper: copy used DS globals ---------- */
const useDS = () => ({
  Icon: window.Icon, Button: window.Button, Eyebrow: window.Eyebrow,
  Price: window.Price, ProductTile: window.ProductTile, ProductCard: window.ProductCard,
  Section: window.Section, Wordmark: window.Wordmark,
  TrustStrip: window.TrustStrip, Footer: window.Footer,
  CLOW: window.CLOW, CLOWIMG: window.CLOWIMG, CLOWPROD: window.CLOWPROD,
});

/* ========== HERO (fixed video path) ========== */
function HeroV1Fixed({ onNav, lang }) {
  const { Icon, Button, Eyebrow } = useDS();
  const t = lang === 'en'
    ? { eb: '스킨케어 · authentic K-beauty', h: ['Give your skin','what it','needs.'], p: 'Korean skincare curated for healthy, luminous skin. Simple routines, made for your skin type.', cta1: 'Find your skin type', cta2: 'Browse routines', badge: ['Glass Skin · 5 steps','Our most-loved routine'] }
    : { eb: '스킨케어 · K-beauty authentique', h: ['Donne à ta peau','ce dont elle','a besoin.'], p: 'La skincare coréenne sélectionnée pour une peau saine et lumineuse. Des routines simples, pensées pour ton type de peau.', cta1: 'Découvre ton type de peau', cta2: 'Voir les routines', badge: ['Glass Skin · 5 étapes','Routine la plus aimée'] };
  return (
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', minHeight: 560 }}>
        <div style={{ padding: '64px 0' }}>
          <Eyebrow>{t.eb}</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(48px,6vw,82px)', lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--espresso-deep)', margin: '18px 0 0' }}>
            {t.h[0]}<br />{t.h[1]}<br /><span style={{ fontStyle: 'italic' }}>{t.h[2]}</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--mocha)', maxWidth: 440, margin: '24px 0 32px' }}>{t.p}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => onNav('quiz')}>{t.cta1}</Button>
            <Button size="lg" variant="secondary" onClick={() => onNav('collection', { kind: 'routines-all' })}>{t.cta2}</Button>
          </div>
        </div>
        <div style={{ position: 'relative', height: 480 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: '#e6dccb' }}>
            {window.CLOWIMG?.ritual && <img src={window.CLOWIMG.ritual} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          </div>
          <div style={{ position: 'absolute', bottom: -22, left: -26, background: 'var(--surface-2)', borderRadius: 16, boxShadow: 'var(--shadow-md)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--c-glass-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a5680' }}><Icon name="sparkles" size={20} /></span>
            <div><div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.25 }}>{t.badge[0]}</div><div style={{ fontSize: 12, color: 'var(--latte)', lineHeight: 1.3 }}>{t.badge[1]}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== HOME CLASSIC: window.Home with custom Hero ========== */
function HomeClassic(props) {
  // Use the DS Home; an effect in the App swaps the video src for ours.
  return React.createElement(window.Home, props);
}

/* ========== HOME EDITORIAL — second variation ========== */
function HomeEditorial({ onNav, onAdd, onOpen, lang }) {
  const { Icon, Button, Eyebrow, Section, ProductCard, ProductTile, CLOW, CLOWIMG } = useDS();
  const t = lang === 'en'
    ? { eb1: 'Issue №04 · Spring/Summer', h1a: 'A quieter', h1b: 'kind of glow.', sub: 'A curated edit of the Korean skincare we use, tested and love. No noise — just routines that work.', cta1: 'Take the quiz', cta2: 'Shop the edit',
        eyeRout: 'The routines', hRout: 'Five paths, one philosophy.',
        eyeBest: 'What we reach for', hBest: 'This week, on our shelves.',
        eyePack: 'Sets we curated', hPack: 'Three soins. One ritual.',
        eyeQuote: 'A note', quote: '"Ma peau me parle tous les jours. Bien choisir mes produits pour répondre à ses besoins, quand elle en a besoin."', quoteAttr: '— Inès, fondatrice de Clow',
        eyeIngr: 'In the formulas', hIngr: 'The ingredients we trust.',
        eyeGift: 'Give Clow', hGift: 'The gift card', pGift: 'The perfect gift for K-beauty lovers. Delivered by email, redeemable across the site — no expiry.', amount: 'Amount', addCart: 'Add to bag',
        eyeIg: 'Community', subIg: 'Follow us for routines, before/afters and offers.',
        ctaAll: 'All routines', ctaAll2: 'See the full shelf', ctaPack: 'See the set', ctaQuiz: 'Find my routine →',
        quizHead: 'Don\'t know where to start?', quizSub: '1 minute, that\'s it.' }
    : lang === 'nl'
    ? { eb1: 'Nummer №·04 · Lente/Zomer', h1a: 'Een rustigere', h1b: 'glans.', sub: 'Een selectie van Koreaanse skincare die we gebruiken, testen en geliefd hebben. Geen ruis — alleen routines die werken.', cta1: 'Doe de quiz', cta2: 'Shop de selectie',
        eyeRout: 'De routines', hRout: 'Vijf paden, één filosofie.',
        eyeBest: 'Waar we naar grijpen', hBest: 'Deze week, op onze plank.',
        eyePack: 'Onze packs', hPack: 'Drie producten. Eén ritueel.',
        eyeQuote: 'Een woord', quote: '« Mijn huid sprak elke dag tegen me. De juiste producten op het juiste moment kiezen — dat is wat haar heeft veranderd. »', quoteAttr: '— Inès, oprichter van Clow',
        eyeIngr: 'In de formules', hIngr: 'De actieve stoffen waarin we geloven.',
        eyeGift: 'Clow geven', hGift: 'De cadeaukaart', pGift: 'Het ideale cadeau voor K-beauty liefhebbers. Per e-mail verzonden, in te wisselen op de hele site — geen vervaldatum.', amount: 'Bedrag', addCart: 'In de tas',
        eyeIg: 'Community', subIg: 'Volg ons voor routines, voor/na\'s en aanbiedingen.',
        ctaAll: 'Alle routines', ctaAll2: 'Bekijk de hele plank', ctaPack: 'Bekijk de set', ctaQuiz: 'Vind mijn routine →',
        quizHead: 'Weet je niet waar te beginnen?', quizSub: '1 minuut, meer niet.' }
    : { eb1: 'Numéro №04 · Printemps/Été', h1a: 'Un éclat,', h1b: 'plus discret.', sub: 'Une sélection de soins coréens, testés et aimés. Pas de bruit — juste des routines qui fonctionnent.', cta1: 'Passe le quiz', cta2: 'Voir la sélection',
        eyeRout: 'Les routines', hRout: 'Cinq chemins, une philosophie.',
        eyeBest: 'Ce qu\'on attrape', hBest: 'Cette semaine, sur l\'étagère.',
        eyePack: 'Nos coffrets', hPack: 'Trois soins. Un seul rituel.',
        eyeQuote: 'Un mot', quote: '« Ma peau me parle tous les jours. Bien choisir mes produits pour répondre à ses besoins, quand elle en a besoin. »', quoteAttr: '— Inès, fondatrice de Clow',
        eyeIngr: 'Dans les formules', hIngr: 'Les actifs auxquels on croit.',
        eyeGift: 'Offrir Clow', hGift: 'La carte cadeau', pGift: 'Le cadeau idéal pour les amoureux·ses de K-beauty. Envoyée par e-mail, à utiliser sur tout le site — sans date d\'expiration.', amount: 'Montant', addCart: 'Ajouter au panier',
        eyeIg: 'Communauté', subIg: 'Suis-nous pour des routines, des avant/après et des offres.',
        ctaAll: 'Toutes les routines', ctaAll2: 'Voir l\'étagère complète', ctaPack: 'Voir le coffret', ctaQuiz: 'Trouve ma routine →',
        quizHead: 'Tu ne sais pas par où commencer ?', quizSub: '1 minute, c\'est tout.' };

  const R = CLOW.ROUTINES;
  const PK = CLOW.PACKS;
  const top = CLOW.PRODUCTS.slice(0, 6);

  /* ----- Editorial hero: full-bleed photo with serif headline overlaid ----- */
  return (
    <>
      {/* Editorial cover */}
      <section style={{ background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
          <Eyebrow>{t.eb1}</Eyebrow>
          <span style={{ fontSize: 12, color: 'var(--latte)', fontFamily: 'var(--font-sans)' }}>Édition Clow · 스킨케어</span>
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, minHeight: 620 }}>
            <div style={{ padding: '70px 60px 80px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(60px,8vw,128px)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--espresso-deep)', margin: 0 }}>
                {t.h1a}<br /><span style={{ fontStyle: 'italic' }}>{t.h1b}</span>
              </h1>
              <p style={{ fontSize: 18.5, lineHeight: 1.55, color: 'var(--mocha)', maxWidth: 460, margin: '34px 0 36px' }}>{t.sub}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Button size="lg" onClick={() => onNav('quiz')}>{t.cta1} <Icon name="arrow-right" size={17} /></Button>
                <Button size="lg" variant="text" onClick={() => onNav('collection', { kind: 'cat', value: 'Tous' })}>{t.cta2}</Button>
              </div>
              <div style={{ display: 'flex', gap: 28, marginTop: 56, paddingTop: 26, borderTop: '1px solid var(--border)' }}>
                {[['1—2',{en:'days to ship',fr:'jours d\'expédition'}],['100%',{en:'authentic 🇰🇷',fr:'authentique 🇰🇷'}],['+15%',{en:'on sign-up',fr:'à l\'inscription'}]].map(([n,l])=>(
                  <div key={l[lang==='en'?'en':'fr']}><div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--espresso)', lineHeight: 1 }}>{n}</div><div style={{ fontSize: 12.5, color: 'var(--latte)', marginTop: 4 }}>{l[lang==='en'?'en':'fr']}</div></div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', alignSelf: 'stretch', overflow: 'hidden', borderRadius: 'var(--r-xl)', margin: '20px 0', background: '#e6dccb', minHeight: 480 }}>
              {window.CLOWIMG?.ritual && <img src={window.CLOWIMG.ritual} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(190deg, transparent 60%, rgba(46,29,14,.18))' }} />
              <div style={{ position: 'absolute', left: 22, bottom: 22, right: 22, color: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85 }}>{lang==='en'?'On the cover':lang==='nl'?'Op de cover':'En couverture'}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, marginTop: 4 }}>Le rituel Clow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <window.TrustStrip />

      {/* Routines — editorial grid (1 hero + 4 small) */}
      <Section bg="var(--bg-alt)">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div><Eyebrow>{t.eyeRout}</Eyebrow><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, color: 'var(--fg-1)', margin: '10px 0 0', letterSpacing: '-0.02em' }}>{t.hRout}</h2></div>
          <Button variant="text" onClick={() => onNav('collection', { kind: 'routines-all' })}>{t.ctaAll} <Icon name="arrow-right" size={15} /></Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14 }}>
          {R.map((r, i) => (
            <button key={r.id} onClick={() => onNav('collection', { kind: 'routine', value: r.id })}
              style={{ gridColumn: i === 0 ? 'span 1' : undefined, gridRow: i === 0 ? 'span 2' : undefined,
                cursor: 'pointer', border: '1px solid var(--border)', textAlign: 'left', background: r.tintv, borderRadius: 18, padding: i === 0 ? 28 : 18, position: 'relative', minHeight: i === 0 ? 0 : 180, transition: 'all var(--dur) var(--ease-out)' }}
              onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='var(--shadow-md)';}}
              onMouseLeave={(e)=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
              <span style={{ position: 'absolute', top: i===0?22:14, left: i===0?28:18, width: 32, height: 32, borderRadius: '50%', background: r.color }} />
              <div style={{ position: 'absolute', bottom: i===0?28:14, left: i===0?28:18, right: i===0?28:14 }}>
                <Eyebrow color={r.fg} style={{ fontSize: 10.5 }}>{lang==='en'?'Routine':'Routine'} · {String(i+1).padStart(2,'0')}</Eyebrow>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: i === 0 ? 38 : 22, color: 'var(--espresso-deep)', lineHeight: 1, margin: '6px 0 4px', letterSpacing: '-0.01em' }}>{r.name}</div>
                <div style={{ fontSize: i===0?14:12, color: 'var(--mocha)', maxWidth: i===0?280:'none' }}>{r.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Quote band */}
      <section style={{ background: 'var(--bg)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>{t.eyeQuote}</Eyebrow>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px,4vw,46px)', lineHeight: 1.25, color: 'var(--espresso-deep)', letterSpacing: '-0.015em', margin: '22px 0 18px' }}>{t.quote}</div>
          <div style={{ fontSize: 13.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--latte)' }}>{t.quoteAttr}</div>
        </div>
      </section>

      {/* Best sellers — list view */}
      <Section bg="var(--bg-alt)">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div><Eyebrow>{t.eyeBest}</Eyebrow><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 44, color: 'var(--fg-1)', margin: '8px 0 0', letterSpacing: '-0.02em' }}>{t.hBest}</h2></div>
          <Button variant="text" onClick={() => onNav('collection', { kind: 'cat', value: 'Tous' })}>{t.ctaAll2} <Icon name="arrow-right" size={15} /></Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {top.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} onOpen={onOpen} />)}
        </div>
      </Section>

      {/* Packs — alternating editorial rows */}
      <Section>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow style={{ justifyContent: 'center' }}>{t.eyePack}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, color: 'var(--fg-1)', margin: '10px 0 0', letterSpacing: '-0.02em' }}>{t.hPack}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PK.slice(0, 3).map((p, i) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.05fr' : '1.05fr 1fr', alignItems: 'center', gap: 0, padding: '32px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ order: i % 2 === 0 ? 1 : 2, position: 'relative', minHeight: 320, borderRadius: 'var(--r-lg)', overflow: 'hidden', background: p.tintv }}>
                <ProductTile label={p.name} ratio={1.2} radius={0} pimg={p.pimg} cover={true} tint={p.tintv} />
                <span style={{ position: 'absolute', top: 16, left: 16, background: p.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 999, letterSpacing: '.04em' }}>{p.concern}</span>
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1, padding: i % 2 === 0 ? '0 0 0 50px' : '0 50px 0 0' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--latte)' }}>№ {String(i+1).padStart(2,'0')} {lang==='en'?'· The set':'· Le coffret'}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px,3.8vw,52px)', color: 'var(--espresso-deep)', letterSpacing: '-0.02em', lineHeight: 1.04, margin: '8px 0 14px' }}>{p.name}</h3>
                <p style={{ color: 'var(--mocha)', fontSize: 16, lineHeight: 1.6, maxWidth: 420, margin: '0 0 18px' }}>{lang==='en'?`${p.contents.length} products. One ritual.`:`${p.contents.length} produits. Un seul rituel.`} {p.contents.slice(0,2).join(' · ')}…</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 22 }}>
                  <window.Price now={p.now} was={p.was} size={22} />
                  <span style={{ background: 'var(--c-' + (p.concern.toLowerCase().includes('hydra')?'hydra':p.concern.toLowerCase().includes('imp')?'pores':p.concern.toLowerCase().includes('age')?'age':p.concern.toLowerCase().includes('glass')?'glass':'sensitive') + '-tint)', color: p.color, fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999 }}>{lang==='en'?'Save':'Économie'} €10,00</span>
                </div>
                <Button size="lg" variant="secondary" onClick={() => onNav('collection', { kind: 'pack', value: p.id })}>{t.ctaPack} <Icon name="arrow-right" size={17} /></Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ingredient editorial */}
      <Section bg="var(--bg-alt)">
        <div style={{ textAlign: 'center', marginBottom: 38 }}>
          <Eyebrow style={{ justifyContent: 'center' }}>{t.eyeIngr}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 44, color: 'var(--fg-1)', margin: '10px 0 0', letterSpacing: '-0.02em' }}>{t.hIngr}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {[
            ['droplet', lang==='en'?'Hyaluronic Acid':'Acide Hyaluronique', 'var(--c-hydra)', lang==='en'?'Hydration that lasts in 5 molecular weights.':'L\'hydratation longue durée en 5 poids moléculaires.'],
            ['leaf', lang==='en'?'Centella Asiatica':'Centella Asiatica', 'var(--c-pores)', lang==='en'?'Calms reactive skin and rebuilds the barrier.':'Apaise les peaux réactives, renforce la barrière.'],
            ['sparkles', lang==='en'?'Niacinamide':'Niacinamide', 'var(--c-glass)', lang==='en'?'Smooths texture, balances sebum, brightens.':'Lisse le grain, équilibre, illumine.'],
            ['sun', lang==='en'?'PDRN & Peptides':'PDRN & Peptides', 'var(--c-age)', lang==='en'?'Firmness and rebound — the K-beauty signature.':'Fermeté et rebond — la signature K-beauty.'],
          ].map(([ic, t2, color, d]) => (
            <div key={t2} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 22, boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ width: 42, height: 42, borderRadius: '50%', background: color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Icon name={ic} size={19} /></span>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--espresso-deep)', letterSpacing: '-0.01em', marginBottom: 6 }}>{t2}</div>
              <div style={{ fontSize: 13.5, color: 'var(--mocha)', lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Carte cadeau — editorial split */}
      <Section pad="96px 0">
        <div className="i18n-edit-gift" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 0, borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
          <div style={{ minHeight: 420, background: '#efe7da', position: 'relative' }}>
            {window.CLOWPROD && window.CLOWPROD.giftcard ? (
              <img src={window.CLOWPROD.giftcard} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : null}
          </div>
          <GiftAside Icon={Icon} Button={Button} Eyebrow={Eyebrow} t={t} lang={lang} onAdd={onAdd} />
        </div>
      </Section>

      {/* Instagram strip */}
      <Section bg="var(--bg-alt)" pad="80px 0">
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Eyebrow style={{ justifyContent: 'center' }}>{t.eyeIg}</Eyebrow>
          <a href="https://www.instagram.com/clowskincare_/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginTop: 10 }}>
            <Icon name="instagram" size={28} style={{ color: 'var(--espresso)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(36px,4vw,46px)', color: 'var(--fg-1)', margin: 0, letterSpacing: '-0.02em' }}>@clowskincare_</h2>
          </a>
          <div style={{ fontSize: 14, color: 'var(--latte)', marginTop: 8 }}>{t.subIg}</div>
        </div>
        <InstaGrid Icon={Icon} CLOWIMG={CLOWIMG} />
      </Section>

      {/* Quiz CTA */}
      <section style={{ background: 'var(--espresso)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '90px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 36, alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(36px,5vw,60px)', color: 'var(--fg-on-dark)', letterSpacing: '-0.02em', lineHeight: 1.04, margin: 0 }}>
            {t.quizHead}
            <br /><span style={{ fontStyle: 'italic', color: 'var(--fg-on-dark-2)' }}>{t.quizSub}</span>
          </h2>
          <Button size="lg" variant="onDark" onClick={() => onNav('quiz')}>{t.ctaQuiz}</Button>
        </div>
      </section>

      {/* Newsletter — Rejoins le club Clow (i18n) */}
      {window.I18nNewsletter ? <window.I18nNewsletter lang={lang} /> : null}
    </>
  );
}

/* ---------- HomeEditorial helpers ---------- */
function GiftAside({ Icon, Button, Eyebrow, t, lang, onAdd }) {
  const amounts = ['€25', '€50', '€75', '€100'];
  const [amt, setAmt] = useSX('€50');
  const gNameMap = { fr: 'Carte cadeau ', en: 'Gift card ', nl: 'Cadeaukaart ' };
  const gName = (gNameMap[lang] || gNameMap.fr) + amt;
  return (
    <div className="i18n-edit-gift-aside" style={{ background: 'var(--surface)', padding: '48px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Eyebrow>{t.eyeGift}</Eyebrow>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 44, color: 'var(--espresso-deep)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '12px 0 0' }}>{t.hGift}</h2>
      <p style={{ color: 'var(--mocha)', fontSize: 16, lineHeight: 1.6, margin: '14px 0 24px', maxWidth: 380 }}>{t.pGift}</p>
      <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--latte)', marginBottom: 10 }}>{t.amount}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 26 }}>
        {amounts.map((a) => (
          <button key={a} onClick={() => setAmt(a)}
            style={{ cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, padding: '12px 20px', borderRadius: 12,
              border: '1.5px solid ' + (amt === a ? 'var(--espresso)' : 'var(--border-strong)'),
              background: amt === a ? 'var(--espresso)' : 'transparent',
              color: amt === a ? 'var(--fg-on-dark)' : 'var(--mocha)',
              transition: 'all var(--dur-fast) var(--ease-out)' }}>{a}</button>
        ))}
      </div>
      <div>
        <Button size="lg" onClick={() => onAdd && onAdd({ id: 'gift-' + amt, brand: 'Clow Skincare', name: gName, now: amt.replace('€','') + ',00', was: null, pimg: 'giftcard' })}>{t.addCart} <Icon name="gift" size={17} /></Button>
      </div>
    </div>
  );
}

function InstaGrid({ Icon, CLOWIMG }) {
  const shots = ['mask', 'sun', 'featDrip', 'maskB'];
  const IG = 'https://www.instagram.com/clowskincare_/';
  return (
    <div className="i18n-edit-ig" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      {shots.map((s) => (
        <a key={s} href={IG} target="_blank" rel="noopener noreferrer"
          style={{ aspectRatio: '1', borderRadius: 'var(--r-md)', overflow: 'hidden', background: '#e6dccb', position: 'relative', display: 'block' }}
          onMouseEnter={(e) => { const ov = e.currentTarget.querySelector('.ov'); if (ov) ov.style.opacity = '1'; }}
          onMouseLeave={(e) => { const ov = e.currentTarget.querySelector('.ov'); if (ov) ov.style.opacity = '0'; }}>
          {CLOWIMG && CLOWIMG[s] && <img src={CLOWIMG[s]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          <span className="ov" style={{ position: 'absolute', inset: 0, background: 'rgba(46,29,14,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: 0, transition: 'opacity var(--dur)' }}>
            <Icon name="instagram" size={26} style={{ color: '#fff' }} />
          </span>
        </a>
      ))}
    </div>
  );
}

/* ========== ABOUT PAGE ========== */
function About({ onNav, lang }) {
  const { Icon, Button, Eyebrow, Section, CLOWIMG } = useDS();
  const t = lang === 'en'
    ? { eb: 'Clow Skincare', h: 'Korean skincare, curated.', sub: 'We started Clow with one simple idea: bring the best of Korean beauty to Europe — without the noise, without the markup, with the routines that actually work.',
        founderEb: 'A note from us',
        founderQuote: '"My skin spoke to me every day. The right products at the right time — that\'s the only thing that changed it. Clow exists to make that easy."',
        founderName: 'Inès & Marc, founders',
        valuesEb: 'What we believe',
        valuesH: 'Three things, always.',
        values: [
          ['leaf','Authenticity 🇰🇷','Sourced directly from Korean labs and brands — never a grey-market reseller. Every batch traceable.'],
          ['sparkles','Real routines','We test everything for weeks before it lands on the shelf. If we wouldn\'t use it, it doesn\'t make the cut.'],
          ['shield-check','No bull','Sensible ingredients, honest claims, transparent prices. Skincare shouldn\'t feel like science fiction.'],
        ],
        timelineEb: 'The story so far',
        timeline: [
          ['2022','Two friends, one Seoul trip.','Inès and Marc come back from Seoul with a suitcase full of products and a question: why is K-beauty so hard to find well in France?'],
          ['2023','Clow goes live.','First 28 SKUs, hand-picked. The first 100 customers become regulars.'],
          ['2024','Routines, not just products.','We launch the 5 routine packs and the skin quiz — because choosing should be simple.'],
          ['2026','Today.','12,000+ skin types served. The shelf keeps growing — only with products we actually love.'],
        ],
        statsEb: 'Some numbers',
        stats: [['12K+','skin types'],['28','curated products'],['4.8','★ average rating'],['1—2','days to ship']],
        ctaH: 'Ready to find yours?', ctaP: 'Take the 1-minute quiz and we\'ll build the routine for you.', cta: 'Take the quiz' }
    : { eb: 'Clow Skincare', h: 'La K-beauty, choisie pour toi.', sub: 'On a créé Clow avec une idée simple : amener le meilleur de la beauté coréenne en Europe — sans le bruit, sans la marge, avec des routines qui fonctionnent vraiment.',
        founderEb: 'Un mot de nous',
        founderQuote: '« Ma peau me parlait tous les jours. Les bons produits, au bon moment — c\'est la seule chose qui l\'a changée. Clow existe pour rendre ça simple. »',
        founderName: 'Inès & Marc, fondateurs',
        valuesEb: 'Ce en quoi on croit',
        valuesH: 'Trois choses, toujours.',
        values: [
          ['leaf','Authenticité 🇰🇷','Sourcé directement chez les labos et marques coréennes — jamais en marché gris. Chaque lot traçable.'],
          ['sparkles','De vraies routines','On teste tout pendant des semaines avant de le sélectionner. Si on n\'utiliserait pas, ça ne passe pas.'],
          ['shield-check','Sans baratin','Des actifs sensés, des promesses honnêtes, des prix transparents. La skincare ne devrait pas être de la science-fiction.'],
        ],
        timelineEb: 'L\'histoire',
        timeline: [
          ['2022','Deux ami·es, un voyage à Séoul.','Inès et Marc reviennent de Séoul avec une valise pleine de produits et une question : pourquoi la K-beauty est-elle si difficile à bien trouver en France ?'],
          ['2023','Clow ouvre ses portes.','Les 28 premières références, choisies une à une. Les 100 premiers client·es deviennent des habitué·es.'],
          ['2024','Des routines, pas que des produits.','On lance les 5 coffrets routine et le quiz peau — parce que choisir devrait être simple.'],
          ['2026','Aujourd\'hui.','12 000+ types de peau accompagnés. L\'étagère grandit — uniquement avec ce qu\'on aime vraiment.'],
        ],
        statsEb: 'Quelques chiffres',
        stats: [['12K+','types de peau'],['28','produits sélectionnés'],['4,8','★ note moyenne'],['1—2','jours d\'expédition']],
        ctaH: 'Prêt·e à trouver la tienne ?', ctaP: 'Passe le quiz d\'une minute, on construit ta routine pour toi.', cta: 'Passe le test' };
  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px 88px', textAlign: 'center' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>{t.eb}</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(48px,6.5vw,92px)', color: 'var(--espresso-deep)', letterSpacing: '-0.025em', lineHeight: 1, margin: '14px 0 22px' }}><span style={{ fontStyle: 'italic' }}>{t.h.split(',')[0]},</span>{t.h.split(',')[1]}</h1>
          <p style={{ fontSize: 18, color: 'var(--mocha)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>{t.sub}</p>
        </div>
      </section>

      {/* Founder note */}
      <Section pad="96px 0 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }}>
          <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', minHeight: 460, background: '#e6dccb', boxShadow: 'var(--shadow-md)' }}>
            <img src={CLOWIMG && CLOWIMG.ritual} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <Eyebrow>{t.founderEb}</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.25, color: 'var(--espresso-deep)', letterSpacing: '-0.015em', margin: '20px 0 22px' }}>{t.founderQuote}</div>
            <div style={{ fontSize: 13.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--latte)' }}>{t.founderName}</div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section bg="var(--bg-alt)">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow style={{ justifyContent: 'center' }}>{t.valuesEb}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 46, color: 'var(--fg-1)', margin: '10px 0 0', letterSpacing: '-0.02em' }}>{t.valuesH}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {t.values.map(([ic, h, d]) => (
            <div key={h} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '32px 28px', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--almond)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--espresso)', marginBottom: 16 }}><Icon name={ic} size={22} /></span>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 26, color: 'var(--fg-1)', letterSpacing: '-0.01em', marginBottom: 8 }}>{h}</div>
              <div style={{ fontSize: 14.5, color: 'var(--mocha)', lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section pad="96px 0">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <Eyebrow>{t.timelineEb}</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 56, color: 'var(--espresso-deep)', letterSpacing: '-0.02em', lineHeight: 1, marginTop: 14 }}>2022 → 2026</div>
          </div>
          <div>
            {t.timeline.map(([y, h, d], i) => (
              <div key={y} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, padding: '26px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 28, color: 'var(--espresso)', letterSpacing: '-0.01em' }}>{y}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 26, color: 'var(--fg-1)', letterSpacing: '-0.01em', marginBottom: 8 }}>{h}</div>
                  <p style={{ fontSize: 15, color: 'var(--mocha)', lineHeight: 1.6, margin: 0, maxWidth: 480 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats band */}
      <section style={{ background: 'var(--espresso)', color: 'var(--fg-on-dark)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Eyebrow color="var(--fg-on-dark-2)" style={{ justifyContent: 'center' }}>{t.statsEb}</Eyebrow>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
            {t.stats.map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center', borderLeft: '1px solid rgba(244,236,225,.18)', padding: '8px 0' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 64, color: 'var(--fg-on-dark)', letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--fg-on-dark-2)', marginTop: 8, textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section pad="96px 0">
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(36px,4.5vw,56px)', color: 'var(--espresso-deep)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>{t.ctaH}</h2>
          <p style={{ color: 'var(--mocha)', fontSize: 17, margin: '16px 0 28px' }}>{t.ctaP}</p>
          <Button size="lg" onClick={() => onNav('quiz')}>{t.cta} <Icon name="arrow-right" size={17} /></Button>
        </div>
      </Section>
    </div>
  );
}

/* ========== CHECKOUT ========== */
function Checkout({ cart, onQty, onNav, lang }) {
  const { Icon, Button, Eyebrow, Section, ProductTile } = useDS();
  const [step, setStep] = useSX(0); // 0 address, 1 shipping, 2 payment, 3 done
  const [form, setForm] = useSX({ email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'France', ship: 'standard', pay: 'card' });

  const T = lang === 'en'
    ? { steps: ['Address', 'Shipping', 'Payment', 'Confirmed'], eb: 'Checkout · CLW',
        addressH: 'Where do we ship?', email: 'Email', first: 'First name', last: 'Last name', addr: 'Address', city: 'City', zip: 'Postal code', country: 'Country', cont: 'Continue',
        shipH: 'How fast?', ship1: ['Standard · 1–2 days','Free', 0], ship2: ['Express · next day','€7,90', 7.9], samples: 'Free samples picked for your routine.',
        payH: 'And to pay?', card: 'Card', paypal: 'PayPal', bc: 'Bancontact', cardN: 'Card number', exp: 'Expiry', cvc: 'CVC', place: 'Place order',
        doneEb: 'Confirmed', doneH: 'Merci, Lina ✿', doneP: 'You\'ll receive an email confirmation in a moment. Your order #CLW-2042 is being prepared.',
        keep: 'Keep shopping', viewAcc: 'View my account',
        sum: 'Your bag', subtotal: 'Subtotal', shippingL: 'Shipping', disc: 'Welcome −15%', total: 'Total', pts: 'You\'ll earn', back: '← Back' }
    : { steps: ['Adresse', 'Livraison', 'Paiement', 'Confirmée'], eb: 'Commande · CLW',
        addressH: 'On livre où ?', email: 'E-mail', first: 'Prénom', last: 'Nom', addr: 'Adresse', city: 'Ville', zip: 'Code postal', country: 'Pays', cont: 'Continuer',
        shipH: 'À quelle vitesse ?', ship1: ['Standard · 1–2 jours','Offerte', 0], ship2: ['Express · 24h','€7,90', 7.9], samples: 'Échantillons offerts, choisis pour ta routine.',
        payH: 'Et pour payer ?', card: 'Carte', paypal: 'PayPal', bc: 'Bancontact', cardN: 'Numéro de carte', exp: 'Exp.', cvc: 'CVC', place: 'Passer la commande',
        doneEb: 'Confirmée', doneH: 'Merci, Lina ✿', doneP: 'Tu reçois un e-mail de confirmation dans un instant. Ta commande #CLW-2042 est en préparation.',
        keep: 'Continuer mes achats', viewAcc: 'Voir mon compte',
        sum: 'Ton panier', subtotal: 'Sous-total', shippingL: 'Livraison', disc: 'BIENVENUE15 −15%', total: 'Total', pts: 'Tu gagnes', back: '← Retour' };

  const eur = (s) => parseFloat(String(s).replace('€', '').replace(',', '.'));
  const subNum = cart.reduce((s, i) => s + eur(i.now) * i.qty, 0);
  const shipNum = form.ship === 'express' ? 7.9 : 0;
  const discNum = subNum * 0.15;
  const totalNum = Math.max(0, subNum - discNum) + shipNum;
  const f = (n) => '€' + n.toFixed(2).replace('.', ',');
  const points = Math.round(totalNum);

  const stepEl = (n, label) => (
    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= n ? 'var(--espresso)' : 'var(--latte)' }}>
      <span style={{ width: 26, height: 26, borderRadius: '50%', background: step >= n ? 'var(--espresso)' : 'var(--sand)', color: step >= n ? 'var(--fg-on-dark)' : 'var(--latte)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step > n ? <Icon name="check" size={13} /> : n + 1}</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600 }}>{label}</span>
    </div>
  );

  const FieldInput = ({ label, value, onChange, type = 'text', full }) => (
    <label style={{ display: 'block', gridColumn: full ? 'span 2' : undefined }}>
      <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--latte)', marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '13px 14px', borderRadius: 10, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--fg-1)', boxSizing: 'border-box' }} />
    </label>
  );

  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 113px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px' }}>
        <Eyebrow>{T.eb}</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14, marginBottom: 30, flexWrap: 'wrap' }}>
          {T.steps.map((s, i) => <React.Fragment key={s}>{stepEl(i, s)}{i < T.steps.length - 1 && <span style={{ flex: '0 0 30px', height: 1, background: 'var(--sand)' }} />}</React.Fragment>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: step === 3 ? '1fr' : '1.4fr 1fr', gap: 32, alignItems: 'start' }}>
          {/* MAIN */}
          <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--r-lg)', padding: '32px 36px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            {step === 0 && (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, letterSpacing: '-0.02em', color: 'var(--espresso-deep)', margin: '0 0 22px' }}>{T.addressH}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <FieldInput full label={T.email} value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />
                  <FieldInput label={T.first} value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
                  <FieldInput label={T.last} value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                  <FieldInput full label={T.addr} value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                  <FieldInput label={T.zip} value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} />
                  <FieldInput label={T.city} value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <FieldInput full label={T.country} value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
                </div>
                <div style={{ marginTop: 24 }}><Button size="lg" onClick={() => setStep(1)}>{T.cont} <Icon name="arrow-right" size={16} /></Button></div>
              </>
            )}
            {step === 1 && (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, letterSpacing: '-0.02em', color: 'var(--espresso-deep)', margin: '0 0 22px' }}>{T.shipH}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[['standard', T.ship1], ['express', T.ship2]].map(([id, [n, p]]) => (
                    <button key={id} onClick={() => setForm({ ...form, ship: id })}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
                        background: form.ship === id ? 'var(--almond)' : 'var(--cream)', border: '1.5px solid ' + (form.ship === id ? 'var(--espresso)' : 'var(--border)'),
                        borderRadius: 14, padding: '16px 20px', fontFamily: 'var(--font-sans)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid ' + (form.ship === id ? 'var(--espresso)' : 'var(--border-strong)'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{form.ship === id && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--espresso)' }} />}</span>
                        <span><div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-1)' }}>{n}</div></span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--fg-1)' }}>{p}</span>
                    </button>
                  ))}
                </div>
                <div style={{ background: 'var(--c-glass-tint)', borderRadius: 12, padding: '14px 16px', marginTop: 20, fontSize: 13, color: 'var(--mocha)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon name="gift" size={16} style={{ color: '#5a5680' }} /> {T.samples}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                  <Button variant="text" onClick={() => setStep(0)}>{T.back}</Button>
                  <Button size="lg" onClick={() => setStep(2)}>{T.cont} <Icon name="arrow-right" size={16} /></Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, letterSpacing: '-0.02em', color: 'var(--espresso-deep)', margin: '0 0 22px' }}>{T.payH}</h2>
                <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                  {[['card', T.card, 'credit-card'], ['paypal', T.paypal, 'wallet'], ['bc', T.bc, 'badge-euro']].map(([id, n, ic]) => (
                    <button key={id} onClick={() => setForm({ ...form, pay: id })}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                        background: form.pay === id ? 'var(--espresso)' : 'var(--cream)', color: form.pay === id ? 'var(--fg-on-dark)' : 'var(--mocha)',
                        border: '1.5px solid ' + (form.pay === id ? 'var(--espresso)' : 'var(--border-strong)'), borderRadius: 999, padding: '11px 18px',
                        fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600 }}>
                      <Icon name={ic} size={16} /> {n}
                    </button>
                  ))}
                </div>
                {form.pay === 'card' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <FieldInput full label={T.cardN} value="" onChange={() => {}} />
                    <FieldInput label={T.exp} value="" onChange={() => {}} />
                    <FieldInput label={T.cvc} value="" onChange={() => {}} />
                  </div>
                )}
                {form.pay !== 'card' && (
                  <div style={{ background: 'var(--bg-alt)', borderRadius: 12, padding: '22px 20px', textAlign: 'center', color: 'var(--mocha)', fontSize: 14 }}>
                    {lang === 'en' ? `You'll be redirected to ${form.pay === 'paypal' ? 'PayPal' : 'Bancontact'} to complete payment.` : `Tu seras redirigé·e vers ${form.pay === 'paypal' ? 'PayPal' : 'Bancontact'} pour finaliser le paiement.`}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26 }}>
                  <Button variant="text" onClick={() => setStep(1)}>{T.back}</Button>
                  <Button size="lg" onClick={() => setStep(3)}>{T.place} · {f(totalNum)}</Button>
                </div>
              </>
            )}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <span style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--success-tint)', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Icon name="check" size={36} /></span>
                <Eyebrow style={{ justifyContent: 'center' }} color="#3f5638">{T.doneEb}</Eyebrow>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, letterSpacing: '-0.02em', color: 'var(--espresso-deep)', margin: '12px 0 14px' }}>{T.doneH}</h2>
                <p style={{ color: 'var(--mocha)', fontSize: 16, maxWidth: 420, margin: '0 auto 28px' }}>{T.doneP}</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button variant="secondary" onClick={() => onNav('home')}>{T.keep}</Button>
                  <Button onClick={() => onNav('account')}>{T.viewAcc} <Icon name="arrow-right" size={16} /></Button>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          {step !== 3 && (
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: '26px 28px', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--fg-1)', marginBottom: 12 }}>{T.sum}</div>
              <div style={{ maxHeight: 280, overflowY: 'auto', marginBottom: 12 }}>
                {cart.length === 0 && <div style={{ color: 'var(--latte)', fontSize: 13, padding: '14px 0' }}>{lang === 'en' ? 'Empty.' : 'Vide.'}</div>}
                {cart.map((i) => (
                  <div key={i.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: 50, flex: 'none' }}><ProductTile label={i.name} pimg={i.pimg} tint={i.tint} ratio={1} radius={8} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.25 }}>{i.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--latte)' }}>×{i.qty} · {i.now}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--mocha)', paddingTop: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{T.subtotal}</span><span>{f(subNum)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{T.shippingL}</span><span>{shipNum === 0 ? (lang === 'en' ? 'Free' : 'Offerte') : f(shipNum)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--sale)' }}><span>{T.disc}</span><span>−{f(discNum)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, marginTop: 6, borderTop: '1px solid var(--border)', fontWeight: 700, color: 'var(--fg-1)', fontSize: 16 }}><span>{T.total}</span><span>{f(totalNum)}</span></div>
              </div>
              <div style={{ background: 'var(--bg-alt)', borderRadius: 10, padding: '10px 14px', marginTop: 14, fontSize: 12.5, color: 'var(--mocha)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="sparkles" size={14} style={{ color: 'var(--espresso)' }} />{T.pts} <b style={{ color: 'var(--espresso)' }}>{points} pts</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroV1Fixed, HomeClassic, HomeEditorial, About, Checkout });
