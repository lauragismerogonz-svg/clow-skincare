/* global React */
/* Site i18n — FR/EN/NL translation strings + i18n-aware overrides of
   Header, Footer, Quiz, Account, Newsletter, TrustStrip.
   Also: QuizEmailModal — RoutineEmail preview triggered from quiz result.
*/

const { useState: useSi, useEffect: useEi, useRef: useRi } = React;

/* ============================================================
   Translation table
   ============================================================ */
const TXT = {
  fr: {
    nav: { best: 'Best Sellers', routine: 'Routine', products: 'Produits', quiz: 'Découvre ton type de peau', gift: 'Carte cadeau', account: 'Compte', cart: 'Panier' },
    routinesNav: ['Hydratation','Anti-imperfections & Pores','Anti-Âge','Glass Skin','Peau Sensible'],
    cats: ['Démaquillants & Nettoyants','Lotions','Ampoules & Sérums','Crèmes','Solaires','Gommages & Masques','Lèvres','Cheveux','Teint'],
    promo: '−15% sur ta 1ʳᵉ commande à l\'inscription · Échantillons offerts dès €39',
    addToCart: 'Ajouter au panier',
    toastAdded: 'ajouté au panier',
    footer: {
      tag: 'La skincare coréenne sélectionnée pour une peau saine et lumineuse. 🇰🇷',
      cols: [
        ['Boutique', ['Best Sellers','Routine','Produits','Découvre ton type de peau','Carte cadeau']],
        ['Aide', ['Routine coréenne : les étapes','Comment obtenir la glass skin','Choisir selon son type de peau','Contact']],
        ['À propos', ['Notre sélection',"Conditions d'utilisation",'Livraison & retours','Mentions légales']],
      ],
      legal: '© 2026 Clow Skincare · EUR / FR',
      pay: 'Visa · Mastercard · PayPal · Bancontact',
    },
    quiz: {
      eb: 'Quiz · ta peau te parle',
      counter: (a, b) => `${a} / ${b}`,
      prev: 'Précédent',
      questions: [
        { q: 'Comment ta peau se sent-elle en milieu de journée ?',
          opts: [['Elle tiraille, elle est inconfortable','r-hydra'],['Elle brille au niveau de la zone T','r-imp'],['Plutôt équilibrée et confortable','r-glass'],['Elle rougit ou réagit facilement','r-sens']] },
        { q: 'Quelle est ta préoccupation n°1 en ce moment ?',
          opts: [['Manque d\'hydratation, peau terne','r-hydra'],['Imperfections, pores visibles','r-imp'],['Premières rides, perte de fermeté','r-age'],['Éclat, effet « peau de verre »','r-glass']] },
        { q: 'Comment réagis-tu aux nouveaux produits ?',
          opts: [['Aucun souci, ma peau tolère tout','r-glass'],['Parfois quelques boutons','r-imp'],['Souvent rougeurs / picotements','r-sens'],['Ma peau boit tout, elle en redemande','r-hydra']] },
        { q: 'Ton objectif rêvé pour ta peau ?',
          opts: [['Une peau repulpée et hydratée','r-hydra'],['Un teint net, sans imperfections','r-imp'],['Une peau ferme et lissée','r-age'],['Un glow lumineux et dewy','r-glass']] },
      ],
      result: 'Ton résultat',
      routineLine: 'Routine',
      resultSub: (rname, rsub) => `${rsub}. Voici les soins qu'on a sélectionnés pour toi.`,
      ctaPackTitle: (r) => `Pack ${r} complet`,
      ctaPackSub: 'La routine entière, −15% pour ta 1ʳᵉ commande',
      ctaRetake: 'Refaire le test',
      ctaSeeRoutine: 'Voir la routine',
      ctaSeePack: (r) => `Voir le pack ${r}`,
      /* Email gate */
      emailEb: 'Garde ta routine sous la main',
      emailH: 'On t\'envoie ta routine par e-mail ?',
      emailP: 'Tu reçois les 3 soins en un récap propre, plus ton code −15% — à utiliser quand tu veux.',
      emailPh: 'ton@email.com',
      emailBtn: 'Envoyer ma routine',
      emailSent: 'Envoyé ✓ Regarde ta boîte.',
      emailPrivacy: 'On garde ça pour toi — désinscription en 1 clic.',
    },
    account: {
      eb: 'Mon espace', hi: 'Bonjour, Lina',
      memberTag: 'Membre Gold', toNext: 'Encore 160 pts pour un bon de €10',
      welcomeEb: 'Offre de bienvenue', welcomeH: '−15% sur ta 1ʳᵉ commande', welcomeSub: 'Cumulable avec tes points fidélité.', copy: 'Copier',
      earnTitle: 'Gagner des points',
      earn: [['shopping-bag','Passer une commande','1 pt / €1 dépensé'],['user-plus','Créer ton compte','+50 pts offerts'],['star','Laisser un avis','+20 pts'],['cake','Ton anniversaire','+100 pts'],['instagram','Suivre @clowskincare_','+15 pts']],
      rewardsTitle: 'Échanger tes points',
      rewards: [['€5 de réduction', '100 pts'],['€10 de réduction', '200 pts'],['Mini-masque offert', '300 pts'],['€25 de réduction', '500 pts']],
      redeem: 'Échanger', soon: 'Bientôt',
      ordersTitle: 'Mes commandes',
      orders: [['#CLW-2041', '24 mai 2026', 'Livré'],['#CLW-1987', '02 mai 2026', 'Livré'],['#CLW-1903', '14 avr. 2026', 'Livré']],
      details: 'Détails',
    },
    newsletter: { h: 'Rejoins le club Clow', p: ['Nouveautés, offres exclusives et récompenses — et ', ' sur ta 1ʳᵉ commande.'], promo: '−15%', placeholder: 'ton@email.com', cta: 'Profite de −15%', done: 'Inscrit·e ✓', fine: 'En t\'inscrivant, tu acceptes de recevoir nos e-mails. Désinscription à tout moment.' },
    trust: [['truck', 'Expédition 1–2 jours'],['badge-check', 'Authentique de Corée'],['shield-check', 'Paiement sécurisé'],['gift', 'Échantillons offerts']],
    notFoundH: "Cette page n'existe pas.", notFoundBack: "Retour à l'accueil",
  },
  en: {
    nav: { best: 'Best Sellers', routine: 'Routines', products: 'Products', quiz: 'Find your skin type', gift: 'Gift card', account: 'Account', cart: 'Bag' },
    routinesNav: ['Hydration','Anti-blemish & Pores','Anti-Age','Glass Skin','Sensitive'],
    cats: ['Cleansers','Toners','Ampoules & Serums','Creams','SPF','Exfoliants & Masks','Lips','Hair','Base'],
    promo: '−15% on your first order at sign-up · Free samples over €39',
    addToCart: 'Add to bag',
    toastAdded: 'added to bag',
    footer: {
      tag: 'Korean skincare, curated for healthy luminous skin. 🇰🇷',
      cols: [
        ['Shop', ['Best Sellers','Routines','Products','Find your skin type','Gift card']],
        ['Help', ['The Korean routine, step by step','How to get glass skin','Choosing by skin type','Contact']],
        ['About', ['Our selection','Terms of service','Shipping & returns','Legal']],
      ],
      legal: '© 2026 Clow Skincare · EUR / EN',
      pay: 'Visa · Mastercard · PayPal · Bancontact',
    },
    quiz: {
      eb: 'Quiz · your skin\'s telling you',
      counter: (a, b) => `${a} / ${b}`,
      prev: 'Back',
      questions: [
        { q: 'How does your skin feel mid-day?',
          opts: [['Tight, uncomfortable','r-hydra'],['Shiny on the T-zone','r-imp'],['Pretty balanced, comfortable','r-glass'],['Easily red or reactive','r-sens']] },
        { q: 'Your #1 concern right now?',
          opts: [['Dehydration, dullness','r-hydra'],['Breakouts, visible pores','r-imp'],['First lines, less firmness','r-age'],['Glow, glass-skin finish','r-glass']] },
        { q: 'How does your skin react to new products?',
          opts: [['No issue, my skin tolerates everything','r-glass'],['Sometimes a few breakouts','r-imp'],['Often redness / stinging','r-sens'],['It soaks it all up, asks for more','r-hydra']] },
        { q: 'Your dream goal for your skin?',
          opts: [['Plump, hydrated','r-hydra'],['Clear, no blemishes','r-imp'],['Firm, smoothed','r-age'],['Luminous, dewy glow','r-glass']] },
      ],
      result: 'Your result',
      routineLine: 'Routine',
      resultSub: (rname, rsub) => `${rsub}. Here are the products we picked for you.`,
      ctaPackTitle: (r) => `The full ${r} pack`,
      ctaPackSub: 'Whole routine, −15% on your first order',
      ctaRetake: 'Take the quiz again',
      ctaSeeRoutine: 'See the routine',
      ctaSeePack: (r) => `See the ${r} pack`,
      emailEb: 'Keep your routine handy',
      emailH: 'Want your routine by email?',
      emailP: 'You\'ll get the 3 products in a clean recap, plus your −15% code — to use whenever.',
      emailPh: 'you@email.com',
      emailBtn: 'Email me my routine',
      emailSent: 'Sent ✓ Check your inbox.',
      emailPrivacy: 'We keep it just for you — 1-click unsubscribe.',
    },
    account: {
      eb: 'My space', hi: 'Hi, Lina',
      memberTag: 'Gold member', toNext: '160 pts left for a €10 voucher',
      welcomeEb: 'Welcome offer', welcomeH: '−15% on your first order', welcomeSub: 'Stacks with your loyalty points.', copy: 'Copy',
      earnTitle: 'Earn points',
      earn: [['shopping-bag','Place an order','1 pt / €1 spent'],['user-plus','Create your account','+50 pts free'],['star','Leave a review','+20 pts'],['cake','Your birthday','+100 pts'],['instagram','Follow @clowskincare_','+15 pts']],
      rewardsTitle: 'Redeem your points',
      rewards: [['€5 off', '100 pts'],['€10 off', '200 pts'],['Free mini-mask', '300 pts'],['€25 off', '500 pts']],
      redeem: 'Redeem', soon: 'Soon',
      ordersTitle: 'My orders',
      orders: [['#CLW-2041', 'May 24, 2026', 'Delivered'],['#CLW-1987', 'May 02, 2026', 'Delivered'],['#CLW-1903', 'Apr 14, 2026', 'Delivered']],
      details: 'Details',
    },
    newsletter: { h: 'Join the Clow club', p: ['New arrivals, exclusive offers and rewards — plus ', ' on your first order.'], promo: '−15%', placeholder: 'you@email.com', cta: 'Get −15%', done: 'Subscribed ✓', fine: 'By subscribing, you agree to our emails. Unsubscribe any time.' },
    trust: [['truck', '1–2 day shipping'],['badge-check', 'Authentic from Korea'],['shield-check', 'Secure payment'],['gift', 'Free samples']],
    notFoundH: 'This page doesn\'t exist.', notFoundBack: 'Back to home',
  },
  nl: {
    nav: { best: 'Bestsellers', routine: 'Routines', products: 'Producten', quiz: 'Vind je huidtype', gift: 'Cadeaukaart', account: 'Account', cart: 'Tas' },
    routinesNav: ['Hydratatie','Anti-onzuiverheden & Poriën','Anti-Aging','Glass Skin','Gevoelige huid'],
    cats: ['Reinigers','Toners','Ampullen & Serums','Crèmes','Zon','Scrubs & Maskers','Lippen','Haar','Make-up base'],
    promo: '−15% op je eerste bestelling bij aanmelding · Gratis stalen vanaf €39',
    addToCart: 'In de tas',
    toastAdded: 'toegevoegd aan de tas',
    footer: {
      tag: 'Koreaanse skincare, geselecteerd voor een gezonde stralende huid. 🇰🇷',
      cols: [
        ['Shop', ['Bestsellers','Routines','Producten','Vind je huidtype','Cadeaukaart']],
        ['Hulp', ['De Koreaanse routine, stap voor stap','Hoe krijg je glass skin','Kiezen op huidtype','Contact']],
        ['Over ons', ['Onze selectie','Algemene voorwaarden','Verzending & retour','Juridisch']],
      ],
      legal: '© 2026 Clow Skincare · EUR / NL',
      pay: 'Visa · Mastercard · PayPal · Bancontact',
    },
    quiz: {
      eb: 'Quiz · je huid zegt je iets',
      counter: (a, b) => `${a} / ${b}`,
      prev: 'Terug',
      questions: [
        { q: 'Hoe voelt je huid halverwege de dag?',
          opts: [['Strak, ongemakkelijk','r-hydra'],['Glanst in de T-zone','r-imp'],['Vrij in balans, comfortabel','r-glass'],['Wordt snel rood of reactief','r-sens']] },
        { q: 'Wat is je grootste zorg op dit moment?',
          opts: [['Uitdroging, doffe huid','r-hydra'],['Onzuiverheden, zichtbare poriën','r-imp'],['Eerste lijntjes, minder stevigheid','r-age'],['Glow, glass-skin effect','r-glass']] },
        { q: 'Hoe reageert je huid op nieuwe producten?',
          opts: [['Geen probleem, mijn huid verdraagt alles','r-glass'],['Soms een paar puistjes','r-imp'],['Vaak roodheid / prikken','r-sens'],['Slurpt alles op en wil meer','r-hydra']] },
        { q: 'Je droomdoel voor je huid?',
          opts: [['Vol, gehydrateerd','r-hydra'],['Schoon, zonder onzuiverheden','r-imp'],['Stevig, glad','r-age'],['Stralend, dauwig','r-glass']] },
      ],
      result: 'Jouw resultaat',
      routineLine: 'Routine',
      resultSub: (rname, rsub) => `${rsub}. Hier zijn de soins die we voor jou hebben gekozen.`,
      ctaPackTitle: (r) => `De volledige ${r} pack`,
      ctaPackSub: 'De hele routine, −15% op je eerste bestelling',
      ctaRetake: 'Quiz opnieuw doen',
      ctaSeeRoutine: 'Bekijk de routine',
      ctaSeePack: (r) => `Bekijk de ${r} pack`,
      emailEb: 'Hou je routine bij de hand',
      emailH: 'Je routine per e-mail ontvangen?',
      emailP: 'Je krijgt de 3 producten in een mooie samenvatting, plus je −15% code — te gebruiken wanneer je wil.',
      emailPh: 'jij@email.com',
      emailBtn: 'Stuur me mijn routine',
      emailSent: 'Verzonden ✓ Check je inbox.',
      emailPrivacy: 'We houden het tussen ons — uitschrijven in 1 klik.',
    },
    account: {
      eb: 'Mijn ruimte', hi: 'Hallo, Lina',
      memberTag: 'Gold lid', toNext: 'Nog 160 pts voor een €10 voucher',
      welcomeEb: 'Welkomstaanbieding', welcomeH: '−15% op je eerste bestelling', welcomeSub: 'Combineert met je loyaltypunten.', copy: 'Kopieer',
      earnTitle: 'Punten verdienen',
      earn: [['shopping-bag','Plaats een bestelling','1 pt / €1 besteed'],['user-plus','Maak je account aan','+50 pts gratis'],['star','Laat een review achter','+20 pts'],['cake','Je verjaardag','+100 pts'],['instagram','Volg @clowskincare_','+15 pts']],
      rewardsTitle: 'Wissel je punten in',
      rewards: [['€5 korting', '100 pts'],['€10 korting', '200 pts'],['Gratis mini-masker', '300 pts'],['€25 korting', '500 pts']],
      redeem: 'Inwisselen', soon: 'Binnenkort',
      ordersTitle: 'Mijn bestellingen',
      orders: [['#CLW-2041', '24 mei 2026', 'Geleverd'],['#CLW-1987', '02 mei 2026', 'Geleverd'],['#CLW-1903', '14 apr. 2026', 'Geleverd']],
      details: 'Details',
    },
    newsletter: { h: 'Word lid van de Clow club', p: ['Nieuwe producten, exclusieve aanbiedingen en beloningen — plus ', ' op je eerste bestelling.'], promo: '−15%', placeholder: 'jij@email.com', cta: 'Krijg −15%', done: 'Aangemeld ✓', fine: 'Door je aan te melden, ga je akkoord met onze e-mails. Uitschrijven kan altijd.' },
    trust: [['truck', '1–2 dagen levertijd'],['badge-check', 'Authentiek uit Korea'],['shield-check', 'Veilig betalen'],['gift', 'Gratis stalen']],
    notFoundH: 'Deze pagina bestaat niet.', notFoundBack: 'Terug naar home',
  },
};

const SOCIAL = [['instagram', 'https://www.instagram.com/clowskincare_/'], ['tiktok', 'https://www.tiktok.com/@clowskincare'], ['pinterest', 'https://www.pinterest.com/clowskincare/'], ['mail', 'mailto:hello@clowskincare.com']];

/* ============================================================
   i18n Header
   ============================================================ */
function I18nHeader({ cart, onOpenCart, onNav, view, lang }) {
  const [openMenu, setOpenMenu] = useSi(null);
  const [mobNav, setMobNav] = useSi(false);
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const t = TXT[lang] || TXT.fr;
  const Icon = window.Icon, Wordmark = window.Wordmark;

  const ROUTS = t.routinesNav, CATS = t.cats;
  const navTop = (k) => {
    if (k === 'quiz') return onNav('quiz');
    if (k === 'gift') return onNav('gift');
    if (k === 'best') return onNav('collection', { kind: 'cat', value: 'Tous' });
    if (k === 'routine') return onNav('collection', { kind: 'routines-all' });
    if (k === 'products') return onNav('collection', { kind: 'cat', value: 'Tous' });
    return onNav('home');
  };
  const navSubRoutine = (i) => onNav('collection', { kind: 'routine', value: 'r-' + ['hydra','imp','age','glass','sens'][i] });
  /* Cat picker — translated label → original French slug (data keys are French) */
  const FR_CATS = ['Démaquillants & Nettoyants','Lotions','Ampoules & Sérums','Crèmes','Solaires','Gommages & Masques','Lèvres','Cheveux','Teint'];
  const navSubCat = (i) => onNav('collection', { kind: 'cat', value: FR_CATS[i] });

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ background: 'var(--espresso-deep)', color: 'var(--fg-on-dark)', textAlign: 'center', fontSize: 12.5, fontWeight: 500, padding: '9px 16px', letterSpacing: '.02em' }}>{t.promo}</div>
      <div style={{ background: 'rgba(246,241,233,.86)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="i18n-hd-bar" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 76, display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* hamburger (mobile only via CSS) */}
          <button className="i18n-hd-burger" aria-label="menu" onClick={() => setMobNav(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--espresso)', padding: 4, display: 'none' }}><Icon name="menu" size={22} /></button>
          <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Wordmark size={28} /></button>
          <nav className="i18n-hd-nav" style={{ display: 'flex', alignItems: 'center', gap: 22, marginLeft: 14, flex: 1 }}>
            <NavItem label={t.nav.best} onClick={() => navTop('best')} />
            <NavItem label={t.nav.routine} hasSub openMenu={openMenu} setOpenMenu={setOpenMenu}
              onClick={() => navTop('routine')}
              sub={ROUTS.map((s, i) => ({ label: s, onClick: () => navSubRoutine(i) }))} />
            <NavItem label={t.nav.products} hasSub openMenu={openMenu} setOpenMenu={setOpenMenu}
              onClick={() => navTop('products')}
              sub={CATS.map((s, i) => ({ label: s, onClick: () => navSubCat(i) }))} />
            <NavItem label={t.nav.quiz} cta onClick={() => navTop('quiz')} />
            <NavItem label={t.nav.gift} onClick={() => navTop('gift')} />
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--espresso)' }}>
            <button className="hicon" aria-label="search"><Icon name="search" size={20} /></button>
            <button className="hicon" aria-label="account" onClick={() => onNav('account')} style={view === 'account' ? { color: 'var(--sale)' } : {}}><Icon name="user" size={20} /></button>
            <button className="hicon" aria-label="cart" onClick={onOpenCart} style={{ position: 'relative' }}>
              <Icon name="shopping-bag" size={20} />
              {count > 0 && <span style={{ position: 'absolute', top: -7, right: -9, background: 'var(--sale)', color: '#fff', fontSize: 10, fontWeight: 700, minWidth: 17, height: 17, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{count}</span>}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile nav drawer */}
      <MobileNavDrawer open={mobNav} onClose={() => setMobNav(false)} t={t} onNav={onNav} navTop={navTop} navSubRoutine={navSubRoutine} navSubCat={navSubCat} lang={lang} ROUTS={ROUTS} CATS={CATS} />
    </header>
  );
}

function NavItem({ label, hasSub, sub, cta, onClick, openMenu, setOpenMenu }) {
  const Icon = window.Icon;
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => setOpenMenu && setOpenMenu(label)} onMouseLeave={() => setOpenMenu && setOpenMenu(null)}>
      <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: cta ? 600 : 500, color: cta ? 'var(--espresso)' : 'var(--fg-2)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', textDecoration: cta ? 'underline' : 'none', textUnderlineOffset: 4 }}>
        {label}{hasSub && <Icon name="chevron-down" size={14} />}
      </button>
      {hasSub && openMenu === label && (
        <div style={{ position: 'absolute', top: '100%', left: -14, paddingTop: 14 }}>
          <div style={{ background: 'var(--surface-2)', borderRadius: 14, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', padding: 10, minWidth: 240 }}>
            {sub.map((s) => (
              <button key={s.label} onClick={s.onClick} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--fg-2)', padding: '10px 12px', borderRadius: 8 }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--almond)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>{s.label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavDrawer({ open, onClose, t, navTop, navSubRoutine, navSubCat, lang, ROUTS, CATS }) {
  const Icon = window.Icon;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(46,29,14,.4)', backdropFilter: 'blur(2px)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur)', zIndex: 70 }} />
      <aside style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: 320, maxWidth: '88vw', background: 'var(--bg)', boxShadow: 'var(--shadow-lg)', zIndex: 71, transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform var(--dur-slow) var(--ease-out)', overflowY: 'auto' }}>
        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--fg-1)' }}>Menu</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mocha)' }}><Icon name="x" size={22} /></button>
        </div>
        <div style={{ padding: '14px 12px 24px' }}>
          {[['best', t.nav.best], ['quiz', t.nav.quiz], ['gift', t.nav.gift]].map(([k, l]) => (
            <button key={k} onClick={() => { navTop(k); onClose(); }} style={mNavBtn}>{l}</button>
          ))}
          <div style={mNavGroup}>{t.nav.routine}</div>
          {ROUTS.map((s, i) => <button key={s} onClick={() => { navSubRoutine(i); onClose(); }} style={mNavSub}>{s}</button>)}
          <div style={mNavGroup}>{t.nav.products}</div>
          {CATS.map((s, i) => <button key={s} onClick={() => { navSubCat(i); onClose(); }} style={mNavSub}>{s}</button>)}
        </div>
      </aside>
    </>
  );
}
const mNavBtn = { display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--fg-1)', padding: '14px 16px', borderRadius: 10 };
const mNavSub = { display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--mocha)', padding: '10px 16px' };
const mNavGroup = { padding: '14px 16px 6px', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--latte)', fontWeight: 700 };

/* ============================================================
   i18n Footer
   ============================================================ */
function I18nFooter({ lang }) {
  const t = (TXT[lang] || TXT.fr).footer;
  const Icon = window.Icon, Wordmark = window.Wordmark;
  return (
    <footer style={{ background: 'var(--espresso-deep)', color: 'var(--fg-on-dark)' }}>
      <div className="i18n-foot-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 30px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 36 }}>
        <div>
          <Wordmark size={30} color="var(--fg-on-dark)" dark={true} />
          <p style={{ color: 'var(--fg-on-dark-2)', fontSize: 13.5, lineHeight: 1.6, maxWidth: 260, marginTop: 18 }}>{t.tag}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {SOCIAL.map(([ic, href]) => (
              <a key={ic} href={href} target="_blank" rel="noopener noreferrer" aria-label={ic}
                style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(244,236,225,.28)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-on-dark)', textDecoration: 'none' }}>
                <Icon name={ic} size={17} />
              </a>
            ))}
          </div>
        </div>
        {t.cols.map(([title, links]) => (
          <div key={title}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-on-dark-2)', marginBottom: 16 }}>{title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {links.map((l) => <a key={l} href="#" style={{ color: 'var(--fg-on-dark)', textDecoration: 'none', fontSize: 13.5, opacity: 0.82 }}>{l}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div className="i18n-foot-bot" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px', borderTop: '1px solid rgba(244,236,225,.14)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, color: 'var(--fg-on-dark-2)', fontSize: 12.5 }}>
        <span>{t.legal}</span>
        <span style={{ display: 'flex', gap: 18 }}>{t.pay}</span>
      </div>
    </footer>
  );
}

/* ============================================================
   i18n Trust strip
   ============================================================ */
function I18nTrustStrip({ lang }) {
  const items = (TXT[lang] || TXT.fr).trust;
  const Icon = window.Icon;
  return (
    <div style={{ background: 'var(--espresso)' }}>
      <div className="i18n-trust" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', color: 'var(--fg-on-dark)' }}>
        {items.map(([ic, txt]) => (
          <span key={txt} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, fontWeight: 500 }}>
            <Icon name={ic} size={20} style={{ color: 'var(--fg-on-dark-2)' }} />{txt}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   i18n Quiz with email capture at the end
   ============================================================ */
function I18nQuiz({ onNav, onAdd, lang, onShowRoutineEmail }) {
  const t = (TXT[lang] || TXT.fr).quiz;
  const R = window.CLOW.ROUTINES;
  const Icon = window.Icon, Button = window.Button, Eyebrow = window.Eyebrow, ProductCard = window.ProductCard;
  const [step, setStep] = useSi(0);
  const [scores, setScores] = useSi({});
  const total = t.questions.length;
  const done = step >= total;

  const pick = (map) => { setScores({ ...scores, [map]: (scores[map] || 0) + 1 }); setStep(step + 1); };
  const reset = () => { setScores({}); setStep(0); };

  let winId = 'r-glass', best = -1;
  Object.entries(scores).forEach(([k, v]) => { if (v > best) { best = v; winId = k; } });
  const win = R.find((r) => r.id === winId) || R[3];
  const recos = window.CLOW.recoFor(winId, 3);

  // Routine display names per language: map id → translated label
  const ROUT_NAMES_I = { 'r-hydra': 0, 'r-imp': 1, 'r-age': 2, 'r-glass': 3, 'r-sens': 4 };
  const tNav = TXT[lang]?.routinesNav || TXT.fr.routinesNav;
  const winNameLocal = tNav[ROUT_NAMES_I[winId]] || win.name;

  return (
    <div style={{ background: done ? win.tintv : 'var(--bg)', transition: 'background var(--dur-slow)', minHeight: 'calc(100vh - 113px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px 24px' }}>
      <div style={{ width: '100%', maxWidth: done ? 980 : 620 }}>
        {!done && (
          <div style={{ background: 'var(--surface-2)', borderRadius: 24, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', padding: '38px 40px 34px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <Eyebrow>{t.eb}</Eyebrow>
              <span style={{ fontSize: 13, color: 'var(--latte)', fontWeight: 600 }}>{t.counter(step + 1, total)}</span>
            </div>
            <div style={{ height: 6, background: 'var(--sand)', borderRadius: 99, marginBottom: 28 }}>
              <div style={{ height: '100%', width: ((step) / total) * 100 + '%', background: 'var(--espresso)', borderRadius: 99, transition: 'width var(--dur)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 34, lineHeight: 1.12, color: 'var(--espresso-deep)', letterSpacing: '-0.02em', margin: '0 0 26px' }}>{t.questions[step].q}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.questions[step].opts.map(([opt, mapTo], idx) => <QuizOption key={idx} t={opt} onClick={() => pick(mapTo)} />)}
            </div>
            {step > 0 && <button onClick={() => setStep(step - 1)} style={{ marginTop: 22, background: 'none', border: 'none', color: 'var(--mocha)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="arrow-left" size={15} /> {t.prev}</button>}
          </div>
        )}

        {done && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <Eyebrow style={{ justifyContent: 'center' }}>{t.result}</Eyebrow>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px,5vw,60px)', color: 'var(--espresso-deep)', letterSpacing: '-0.02em', margin: '10px 0 6px', lineHeight: 1.02 }}>{t.routineLine} {winNameLocal}</h2>
              <p style={{ color: 'var(--mocha)', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>{t.resultSub(winNameLocal, win.sub)}</p>
            </div>
            <div style={{ background: 'var(--surface-2)', borderRadius: 24, boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', padding: 26 }}>
              <div className="i18n-quiz-recos" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {recos.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
              </div>

              {/* Email gate: get the routine by email */}
              <QuizEmailGate t={t} winId={winId} winNameLocal={winNameLocal} recos={recos} lang={lang} onShowRoutineEmail={onShowRoutineEmail} />

              <div className="i18n-quiz-ctas" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 22, paddingTop: 22, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 44, height: 44, borderRadius: '50%', background: win.color, flex: 'none' }} />
                  <div><div style={{ fontWeight: 600, color: 'var(--fg-1)', fontSize: 14.5 }}>{t.ctaPackTitle(winNameLocal)}</div><div style={{ fontSize: 13, color: 'var(--latte)' }}>{t.ctaPackSub}</div></div>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Button variant="secondary" onClick={reset}>{t.ctaRetake}</Button>
                  <Button variant="secondary" onClick={() => onNav('collection', { kind: 'routine', value: winId })}>{t.ctaSeeRoutine}</Button>
                  <Button onClick={() => onNav('collection', { kind: 'pack', value: 'p-' + winId.slice(2) })}>{t.ctaSeePack(winNameLocal)} <Icon name="arrow-right" size={16} /></Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizOption({ t, onClick }) {
  const [h, setH] = useSi(false);
  const Icon = window.Icon;
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 15.5, fontWeight: 500, color: 'var(--fg-1)', background: h ? 'var(--almond)' : 'var(--cream)', border: '1.5px solid ' + (h ? 'var(--espresso)' : 'var(--border)'), borderRadius: 14, padding: '17px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all var(--dur-fast) var(--ease-out)' }}>
      {t}<span style={{ color: 'var(--espresso)', opacity: h ? 1 : 0.4, transition: 'opacity var(--dur)' }}><Icon name="arrow-right" size={18} /></span>
    </button>
  );
}

function QuizEmailGate({ t, winId, winNameLocal, recos, lang, onShowRoutineEmail }) {
  const [email, setEmail] = useSi('');
  const [sent, setSent] = useSi(false);
  const Icon = window.Icon, Button = window.Button;
  const send = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    /* Reveal the actual RoutineEmail (preview modal) */
    onShowRoutineEmail({ winId, winNameLocal, recos, email, lang });
  };
  return (
    <form onSubmit={send} style={{ marginTop: 26, background: 'var(--bg-alt)', borderRadius: 16, padding: '20px 22px', border: '1px solid var(--border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }} className="i18n-quiz-emailgate">
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--latte)', marginBottom: 6 }}>{t.emailEb}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: 'var(--espresso-deep)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 4 }}>{t.emailH}</div>
          <div style={{ fontSize: 13.5, color: 'var(--mocha)', lineHeight: 1.5 }}>{t.emailP}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="i18n-quiz-emailrow">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh}
            style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-1)', minWidth: 220 }} />
          <Button type="submit">{sent ? t.emailSent : t.emailBtn} <Icon name={sent ? 'check' : 'arrow-right'} size={16} /></Button>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--fg-3)', marginTop: 12 }}>{t.emailPrivacy}</div>
    </form>
  );
}

/* ============================================================
   i18n Account
   ============================================================ */
function I18nAccount({ lang }) {
  const t = (TXT[lang] || TXT.fr).account;
  const Icon = window.Icon, Button = window.Button, Eyebrow = window.Eyebrow;
  const points = 340;
  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 113px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 80px' }}>
        <Eyebrow>{t.eb}</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 48, color: 'var(--espresso-deep)', letterSpacing: '-0.02em', margin: '8px 0 32px' }}>{t.hi}</h1>

        <div className="i18n-acc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 22, marginBottom: 22 }}>
          {/* points card */}
          <div style={{ background: 'var(--espresso)', color: 'var(--fg-on-dark)', borderRadius: 22, padding: '28px 30px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Eyebrow color="var(--fg-on-dark-2)">Clow Rewards</Eyebrow>
              <span style={{ background: 'rgba(244,236,225,.16)', borderRadius: 999, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{t.memberTag}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 1, margin: '14px 0 4px' }}>{points} <span style={{ fontSize: 26 }}>pts</span></div>
            <div style={{ fontSize: 13.5, color: 'var(--fg-on-dark-2)' }}>{t.toNext}</div>
            <div style={{ height: 8, background: 'rgba(244,236,225,.2)', borderRadius: 99, margin: '16px 0 0', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '68%', background: 'var(--c-active, var(--c-glass))', borderRadius: 99 }} />
            </div>
          </div>
          {/* welcome offer */}
          <div style={{ background: 'var(--c-sens-tint)', borderRadius: 22, padding: '28px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid var(--border)' }}>
            <Eyebrow color="#9a5d50">{t.welcomeEb}</Eyebrow>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 38, color: 'var(--espresso-deep)', letterSpacing: '-0.01em', margin: '8px 0 6px' }}>{t.welcomeH}</div>
            <p style={{ color: 'var(--mocha)', fontSize: 14, margin: '0 0 16px' }}>{t.welcomeSub}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--surface-2)', border: '1px dashed var(--c-sensitive)', borderRadius: 10, padding: '11px 16px', fontWeight: 700, color: 'var(--espresso)', letterSpacing: '0.08em' }}>
                <Icon name="ticket" size={17} /> BIENVENUE15
              </span>
              <Button variant="secondary" size="sm">{t.copy}</Button>
            </div>
          </div>
        </div>

        {/* earn + rewards */}
        <div className="i18n-acc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginBottom: 22 }}>
          <AccPanel title={t.earnTitle}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {t.earn.map(([ic, n, p], i) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i < t.earn.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--almond)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--espresso)', flex: 'none' }}><Icon name={ic} size={18} /></span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--fg-1)' }}>{n}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mocha)' }}>{p}</span>
                </div>
              ))}
            </div>
          </AccPanel>
          <AccPanel title={t.rewardsTitle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {t.rewards.map(([n, cost], i) => {
                const need = [100, 200, 300, 500][i];
                const ok = points >= need;
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 34, height: 34, borderRadius: '50%', background: ok ? 'var(--c-glass-tint)' : 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ok ? '#5a5680' : 'var(--latte)' }}><Icon name="gift" size={16} /></span>
                      <div><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>{n}</div><div style={{ fontSize: 12, color: 'var(--latte)' }}>{cost}</div></div>
                    </div>
                    <Button size="sm" variant={ok ? 'primary' : 'secondary'} style={ok ? {} : { opacity: 0.5 }}>{ok ? t.redeem : t.soon}</Button>
                  </div>
                );
              })}
            </div>
          </AccPanel>
        </div>

        {/* orders */}
        <AccPanel title={t.ordersTitle}>
          <div>
            {t.orders.map(([id, date, status], i) => (
              <div key={id} className="i18n-acc-order" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 0', borderBottom: i < t.orders.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--fg-1)', width: 110 }}>{id}</span>
                <span style={{ fontSize: 13.5, color: 'var(--mocha)', flex: 1 }}>{date}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)', background: 'var(--success-tint)', padding: '4px 11px', borderRadius: 999 }}>{status}</span>
                <span style={{ fontWeight: 700, color: 'var(--fg-1)', fontSize: 14.5, width: 80, textAlign: 'right' }}>{['€64,90','€40,95','€89,90'][i]}</span>
                <Button size="sm" variant="text">{t.details}</Button>
              </div>
            ))}
          </div>
        </AccPanel>
      </div>
    </div>
  );
}

function AccPanel({ title, children }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '22px 24px', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--fg-1)', marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

/* ============================================================
   i18n Newsletter (used by both home variants — keep simple)
   ============================================================ */
function I18nNewsletter({ lang }) {
  const t = (TXT[lang] || TXT.fr).newsletter;
  const Button = window.Button;
  const [sent, setSent] = useSi(false);
  return (
    <section style={{ background: 'var(--bg-alt)', padding: '64px 0' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36, color: 'var(--fg-1)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{t.h}</h2>
        <p style={{ color: 'var(--mocha)', fontSize: 15.5, margin: '0 0 22px' }}>{t.p[0]}<b style={{ color: 'var(--espresso)' }}>{t.promo}</b>{t.p[1]}</p>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="i18n-newsletter-form" style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }}>
          <input placeholder={t.placeholder} required style={{ flex: 1, padding: '14px 16px', borderRadius: 999, border: '1px solid var(--border-strong)', fontFamily: 'var(--font-sans)', fontSize: 14, background: 'var(--surface-2)', color: 'var(--fg-1)' }} />
          <Button size="lg" type="submit">{sent ? t.done : t.cta}</Button>
        </form>
        <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 12 }}>{t.fine}</div>
      </div>
    </section>
  );
}

/* ============================================================
   Routine email preview modal — triggered from quiz
   ============================================================ */
function QuizRoutineEmailModal({ open, data, onClose }) {
  if (!open || !data) return null;
  const Icon = window.Icon;
  const { winId, winNameLocal, recos, email, lang } = data;
  const lbl = lang === 'en' ? { eb: 'Email preview', subjL: 'SUBJECT', toL: 'TO', from: 'Clow Skincare <hello@clowskincare.com>', closeAria: 'close', sentNote: `Sent to ${email} (preview)` }
            : lang === 'nl' ? { eb: 'E-mailvoorbeeld', subjL: 'ONDERWERP', toL: 'NAAR', from: 'Clow Skincare <hello@clowskincare.com>', closeAria: 'sluiten', sentNote: `Verzonden naar ${email} (voorbeeld)` }
            :                  { eb: 'Aperçu de l\'e-mail', subjL: 'OBJET', toL: 'POUR', from: 'Clow Skincare <hello@clowskincare.com>', closeAria: 'fermer', sentNote: `Envoyé à ${email} (aperçu)` };

  /* Build a recipient-personalised routine email inline */
  const accent = { 'r-hydra': ['#3f6068','var(--c-hydra-tint)'], 'r-imp': ['#4f5e3a','var(--c-pores-tint)'], 'r-age': ['#7a4d5c','var(--c-age-tint)'], 'r-glass': ['#5a5680','var(--c-glass-tint)'], 'r-sens': ['#9a5d50','var(--c-sens-tint)'] }[winId] || ['#5a5680','var(--c-glass-tint)'];

  const subject = lang === 'en' ? `Lina, your ${winNameLocal} routine is ready` : lang === 'nl' ? `Lina, je ${winNameLocal} routine is klaar` : `Lina, ta routine ${winNameLocal} est prête`;
  const eb = lang === 'en' ? `Your result · ${winNameLocal}` : lang === 'nl' ? `Jouw resultaat · ${winNameLocal}` : `Ton résultat · ${winNameLocal}`;
  const head = lang === 'en' ? 'Your custom routine is ready.' : lang === 'nl' ? 'Je persoonlijke routine is klaar.' : 'Ta routine sur-mesure est prête.';
  const sub = lang === 'en' ? 'Based on your answers, here are the steps we picked for you.' : lang === 'nl' ? 'Op basis van je antwoorden zijn dit de stappen die we voor jou hebben gekozen.' : 'D\'après tes réponses, voici les étapes qu\'on a sélectionnées pour toi.';
  const packHead = lang === 'en' ? `The full ${winNameLocal} pack` : lang === 'nl' ? `De volledige ${winNameLocal} pack` : `Pack ${winNameLocal} complet`;
  const packSub = lang === 'en' ? `${recos.length} products · −15% with BIENVENUE15` : lang === 'nl' ? `${recos.length} producten · −15% met BIENVENUE15` : `${recos.length} produits · −15% avec BIENVENUE15`;
  const seePack = lang === 'en' ? 'See the pack' : lang === 'nl' ? 'Bekijk de pack' : 'Voir le pack';

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(46,29,14,.55)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 201, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 12 }} onClick={(e) => e.stopPropagation()}>
          {/* preview chrome */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-on-dark)' }}>{lbl.eb}</span>
            <button onClick={onClose} aria-label={lbl.closeAria} style={{ background: 'rgba(244,236,225,.18)', border: 'none', cursor: 'pointer', color: 'var(--fg-on-dark)', width: 38, height: 38, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={20} /></button>
          </div>
          {/* envelope meta */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 20px', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mocha)' }}>
            <div style={{ display: 'flex', gap: 14, padding: '4px 0' }}><span style={{ width: 60, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--latte)', textTransform: 'uppercase', fontWeight: 700 }}>{lbl.subjL}</span><span style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{subject}</span></div>
            <div style={{ display: 'flex', gap: 14, padding: '4px 0' }}><span style={{ width: 60, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--latte)', textTransform: 'uppercase', fontWeight: 700 }}>{lbl.toL}</span><span>{email || 'you@email.com'}</span></div>
            <div style={{ display: 'flex', gap: 14, padding: '4px 0' }}><span style={{ width: 60, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--latte)', textTransform: 'uppercase', fontWeight: 700 }}>FROM</span><span>{lbl.from}</span></div>
          </div>
          {/* email body — 600px shell */}
          <div style={{ width: '100%', maxWidth: 600, alignSelf: 'center', background: 'var(--surface-2)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            {/* header */}
            <div style={{ background: 'var(--espresso)', padding: '24px 0 22px', textAlign: 'center' }}>
              {window.CLOWIMG?.logoCream && <img src={window.CLOWIMG.logoCream} alt="Clow" style={{ height: 46 }} />}
            </div>
            <div style={{ background: 'var(--espresso-deep)', padding: '11px 0', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 24 }}>
              {['Best Sellers','Routines','Quiz','Packs'].map((l) => <span key={l} style={{ color: 'var(--fg-on-dark-2)', fontSize: 11.5, fontWeight: 600, letterSpacing: '.04em' }}>{l}</span>)}
            </div>
            <div style={{ padding: '36px 40px', background: 'var(--bg)' }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent[0] }}>{eb}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--espresso-deep)', margin: '10px 0 0' }}>{head}</h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.65, color: 'var(--mocha)', margin: '14px 0 0' }}>{sub}</p>
              <div style={{ margin: '24px 0 8px' }}>
                {recos.map((p, i) => (
                  <div key={p.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: i < recos.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: accent[1], color: accent[0], flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600 }}>{i + 1}</span>
                    <div style={{ width: 56, height: 56, flex: 'none', borderRadius: 10, background: 'var(--white)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                      {window.CLOWPROD?.[p.pimg] && <img src={window.CLOWPROD[p.pimg]} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--latte)' }}>{p.brand}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>{p.name}</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg-1)' }}>{p.now}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: accent[1], borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 18 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--espresso-deep)' }}>{packHead}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--mocha)' }}>{packSub}</div>
                </div>
                <span style={{ background: 'var(--espresso)', color: 'var(--fg-on-dark)', padding: '12px 22px', borderRadius: 999, fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>{seePack}</span>
              </div>
            </div>
            <div style={{ background: 'var(--espresso-deep)', color: 'var(--fg-on-dark-2)', padding: '24px 40px', textAlign: 'center', fontSize: 11.5 }}>
              {lbl.sentNote}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { TXT, I18nHeader, I18nFooter, I18nTrustStrip, I18nQuiz, I18nAccount, I18nNewsletter, QuizRoutineEmailModal });
