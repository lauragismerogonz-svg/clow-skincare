/* global React, ReactDOM */
/* Email gallery — renders all 13 Clow email templates as artboards on a design canvas. */
const { useState: useSE, useEffect: useEE } = React;

function EmailLabel({ subject, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--latte)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--mocha)', fontStyle: 'italic' }}>“{subject}”</span>
    </div>
  );
}

/* Renders an email centered, on a soft inbox-like background. */
function EmailFrame({ Comp, height = 1180 }) {
  return (
    <div style={{ width: 640, height, background: '#efeae0', padding: '20px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ width: 600 }}><Comp /></div>
    </div>
  );
}

function App() {
  const EMAILS = window.EMAILS || [];

  /* Group emails by purpose */
  const groups = [
    { id: 'transac', title: 'Transactionnels',     subtitle: 'Quand un événement se produit — commande, expédition, stock',
      ids: ['welcome', 'order', 'ship', 'stock'] },
    { id: 'reward',  title: 'Fidélité · récompenses', subtitle: 'Cycle de vie du programme Clow Rewards',
      ids: ['rewards', 'birthday', 'review'] },
    { id: 'reten',   title: 'Rétention · réengagement', subtitle: 'On reconquiert celles et ceux qui se sont éloigné·es',
      ids: ['cart', 'replenish', 'winback'] },
    { id: 'edito',   title: 'Éditorial · contenu',  subtitle: 'Le journal Clow — éduquer, inspirer, convertir',
      ids: ['routine', 'article10', 'articlePore'] },
  ];

  /* Per-email artboard height (so canvas can size them tightly) */
  const heights = { welcome: 1180, routine: 1080, cart: 980, order: 1140, ship: 1100, rewards: 1180, birthday: 1100, winback: 1140, replenish: 1020, review: 1080, stock: 1080, article10: 1980, articlePore: 1620 };

  return (
    <window.DesignCanvas title="Clow Skincare — Suite e-mail">
      {groups.map((g) => (
        <window.DCSection key={g.id} id={g.id} title={g.title} subtitle={g.subtitle}>
          {g.ids.map((eid) => {
            const e = EMAILS.find((x) => x.id === eid);
            if (!e) return null;
            const h = heights[eid] || 1100;
            return (
              <window.DCArtboard key={e.id} id={e.id} label={e.label} width={640} height={h}>
                <EmailFrame Comp={e.Comp} height={h} />
              </window.DCArtboard>
            );
          })}
        </window.DCSection>
      ))}
    </window.DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
