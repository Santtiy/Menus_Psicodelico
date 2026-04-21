// PauseScreen.jsx — Menú de pausa, estética gótica/terror psicológico
// Coherente con la portada: negro profundo + carmesí + tipografía Cinzel.

function PauseScreen({ grainOn = true, glowIntensity = 1, onNavigate }) {
  const [hovered, setHovered] = React.useState(null);
  const [selected, setSelected] = React.useState(0);

  const items = [
    { id: 'resume',   label: 'Reanudar partida',          sub: 'Continuar donde lo dejaste' },
    { id: 'options',  label: 'Opciones',                  sub: 'Ajustes del juego' },
    { id: 'restart',  label: 'Reiniciar desde checkpoint', sub: 'Última marca · Capítulo III' },
    { id: 'menu',     label: 'Volver al menú principal',  sub: 'Abandonar esta sesión' },
    { id: 'quit',     label: 'Salir del juego',           sub: 'Cerrar Phsico Delico' },
  ];

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') setSelected((s) => Math.min(items.length - 1, s + 1));
      if (e.key === 'ArrowUp')   setSelected((s) => Math.max(0, s - 1));
      if (e.key === 'Enter' && onNavigate) {
        if (items[selected].id === 'options') onNavigate('options');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, items, onNavigate]);

  const active = hovered ?? selected;

  return (
    <div style={pauseStyles.root}>
      {/* Capas de ambiente */}
      <div style={pauseStyles.vignette} />
      <div style={{ ...pauseStyles.glow, opacity: 0.55 * glowIntensity }} />
      <div style={pauseStyles.fog} />
      {grainOn && <div style={pauseStyles.grain} />}

      {/* Esquinas decorativas */}
      <CornerOrnament pos="tl" />
      <CornerOrnament pos="tr" />
      <CornerOrnament pos="bl" />
      <CornerOrnament pos="br" />

      {/* Panel central */}
      <div style={pauseStyles.panel}>
      {/* Encabezado */}
      <div style={pauseStyles.header}>
        <div style={pauseStyles.eyebrow}>— IV · SESIÓN INTERRUMPIDA —</div>
        <h1 style={pauseStyles.title}>PAUSA</h1>
        <div style={pauseStyles.sep}>
          <span style={pauseStyles.sepLine} />
          <svg width="7" height="7" viewBox="0 0 10 10" style={{ opacity: 0.6 }}>
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#8a0e2a" />
          </svg>
          <span style={pauseStyles.sepLine} />
        </div>
        <div style={pauseStyles.subtitle}>el silencio también guarda memoria</div>
      </div>

      {/* Lista de botones */}
      <nav style={pauseStyles.nav} aria-label="Menú de pausa">
        {items.map((it, i) => {
          const isActive = active === i;
          return (
            <button
              key={it.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => {
                setSelected(i);
                if (it.id === 'options' && onNavigate) onNavigate('options');
              }}
              style={{
                ...pauseStyles.item,
                color: isActive ? '#ffe9ec' : 'rgba(224,210,180,0.5)',
                letterSpacing: isActive ? '0.42em' : '0.32em',
                textShadow: isActive
                  ? `0 0 10px rgba(196,28,68,${0.55 * glowIntensity}), 0 0 22px rgba(196,28,68,${0.3 * glowIntensity})`
                  : 'none',
              }}
            >
              <span style={{
                ...pauseStyles.itemMarker,
                opacity: isActive ? 1 : 0,
                transform: `translateX(${isActive ? 0 : -8}px)`,
              }}>◆</span>
              <span style={pauseStyles.itemLabel}>{it.label}</span>
              <span style={{
                ...pauseStyles.itemMarker,
                opacity: isActive ? 1 : 0,
                transform: `translateX(${isActive ? 0 : 8}px)`,
              }}>◆</span>

              <span style={{
                ...pauseStyles.itemSub,
                opacity: isActive ? 0.75 : 0,
                transform: `translateY(${isActive ? 0 : -4}px)`,
              }}>{it.sub}</span>
            </button>
          );
        })}
      </nav>
      </div>

      {/* Pie de página */}
      <div style={pauseStyles.footer}>
        <div style={pauseStyles.footerRow}>
          <Key>↑</Key><Key>↓</Key><span>Navegar</span>
          <span style={pauseStyles.footerDot}>·</span>
          <Key>Enter</Key><span>Seleccionar</span>
          <span style={pauseStyles.footerDot}>·</span>
          <Key>Esc</Key><span>Reanudar</span>
        </div>
        <div style={pauseStyles.capitulo}>
          CAP. III — <em style={{ fontStyle: 'italic', opacity: 0.8 }}>“El umbral de porcelana”</em>
          <span style={pauseStyles.footerDot}>·</span>
          03:42:11
        </div>
      </div>
    </div>
  );
}

function Key({ children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 22,
      height: 22,
      padding: '0 6px',
      border: '1px solid rgba(224,210,180,0.22)',
      borderRadius: 2,
      fontSize: 11,
      letterSpacing: '0.08em',
      color: 'rgba(224,210,180,0.8)',
      background: 'rgba(10,4,6,0.5)',
    }}>{children}</span>
  );
}

function CornerOrnament({ pos }) {
  const base = { position: 'absolute', width: 72, height: 72, pointerEvents: 'none', opacity: 0.35 };
  const map = {
    tl: { top: 40, left: 40 },
    tr: { top: 40, right: 40, transform: 'scaleX(-1)' },
    bl: { bottom: 40, left: 40, transform: 'scaleY(-1)' },
    br: { bottom: 40, right: 40, transform: 'scale(-1,-1)' },
  };
  return (
    <svg viewBox="0 0 72 72" style={{ ...base, ...map[pos] }}>
      <path d="M0 1 L40 1" stroke="#c41c44" strokeWidth="0.75" fill="none" />
      <path d="M1 0 L1 40" stroke="#c41c44" strokeWidth="0.75" fill="none" />
      <path d="M1 24 Q12 12 24 12" stroke="rgba(224,210,180,0.6)" strokeWidth="0.5" fill="none" />
      <circle cx="24" cy="12" r="1.5" fill="#c41c44" />
      <circle cx="12" cy="24" r="1" fill="rgba(224,210,180,0.6)" />
    </svg>
  );
}

const pauseStyles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#050305',
    color: '#e0d2b4',
    fontFamily: '"Cormorant Garamond", "Cinzel Decorative", Georgia, serif',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(30,6,14,0.15) 0%, rgba(5,3,5,0.7) 55%, rgba(0,0,0,0.95) 100%)',
    pointerEvents: 'none',
  },
  glow: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    width: '70%',
    height: '40%',
    transform: 'translateX(-50%)',
    background: 'radial-gradient(ellipse at center, rgba(196,28,68,0.18) 0%, rgba(120,8,36,0.08) 40%, transparent 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  fog: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 20% 110%, rgba(40,10,20,0.4), transparent 50%), radial-gradient(ellipse at 80% -10%, rgba(30,5,15,0.35), transparent 50%)',
    pointerEvents: 'none',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0.08,
    mixBlendMode: 'overlay',
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.9\'/></svg>")',
  },
  panel: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '42px 80px 48px',
    minWidth: 560,
    background: 'linear-gradient(180deg, rgba(10,4,6,0.55), rgba(6,2,4,0.35))',
    border: '1px solid rgba(224,210,180,0.06)',
    boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), 0 40px 100px rgba(0,0,0,0.6)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    zIndex: 2,
  },
  eyebrow: {
    fontFamily: '"JetBrains Mono", "Courier New", monospace',
    fontSize: 9,
    letterSpacing: '0.5em',
    color: 'rgba(224,210,180,0.38)',
    marginBottom: 14,
  },
  title: {
    fontFamily: '"Cinzel Decorative", serif',
    fontWeight: 400,
    fontSize: 44,
    lineHeight: 1,
    margin: 0,
    letterSpacing: '0.28em',
    background: 'linear-gradient(180deg, #e23a60 0%, #c41c44 50%, #8a0e2a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 12px rgba(196,28,68,0.28))',
  },
  sep: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
    marginBottom: 8,
  },
  sepLine: {
    display: 'inline-block',
    width: 80,
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(196,28,68,0.45), transparent)',
  },
  subtitle: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontStyle: 'italic',
    fontSize: 11,
    letterSpacing: '0.22em',
    color: 'rgba(224,210,180,0.35)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    zIndex: 2,
    minWidth: 520,
  },
  item: {
    position: 'relative',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '18px 28px',
    fontFamily: '"Cinzel Decorative", serif',
    fontWeight: 400,
    fontSize: 19,
    textTransform: 'uppercase',
    letterSpacing: '0.32em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    transition: 'color 420ms cubic-bezier(.2,.7,.3,1), letter-spacing 420ms, transform 420ms, text-shadow 420ms',
  },
  itemMarker: {
    fontSize: 7,
    color: '#c41c44',
    transition: 'opacity 380ms, transform 380ms',
  },
  itemLabel: {
    display: 'inline-block',
  },
  itemSub: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: '"Cormorant Garamond", serif',
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: 9,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: 'rgba(224,210,180,0.38)',
    textShadow: 'none',
    transition: 'opacity 360ms, transform 360ms',
    marginTop: -4,
    whiteSpace: 'nowrap',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    fontFamily: '"JetBrains Mono", "Courier New", monospace',
    fontSize: 10,
    letterSpacing: '0.3em',
    color: 'rgba(224,210,180,0.4)',
  },
  footerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  footerDot: { opacity: 0.4 },
  capitulo: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 12,
    letterSpacing: '0.4em',
    opacity: 0.55,
  },
};

window.PauseScreen = PauseScreen;
