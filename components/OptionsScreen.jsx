// OptionsScreen.jsx — Menú de opciones con 4 categorías

function OptionsScreen({ grainOn = true, glowIntensity = 1, onBack }) {
  const [cat, setCat] = React.useState('audio');
  const [vals, setVals] = React.useState({
    master: 78, music: 65, sfx: 82, voices: 90, ambient: 55,
    quality: 'Alta', resolution: '2560 × 1440', windowMode: 'Pantalla completa',
    brightness: 60, shadows: 'Alta', textures: 'Ultra', antialiasing: 'TAA', vsync: true,
    sensX: 45, sensY: 45, sensCam: 50, invertY: false, smooth: 30,
  });
  const [rebinding, setRebinding] = React.useState(null);
  const [bindings, setBindings] = React.useState({
    move: 'W A S D',
    interact: 'E',
    attack: 'Clic izq.',
    dodge: 'Espacio',
    pause: 'Esc',
    run: 'Shift',
    jump: 'Ctrl',
  });

  const set = (k, v) => setVals((x) => ({ ...x, [k]: v }));

  const cats = [
    { id: 'audio',    label: 'Audio',       sub: 'Sonido y ambiente' },
    { id: 'graphics', label: 'Gráficos',    sub: 'Calidad visual' },
    { id: 'sens',     label: 'Sensibilidad', sub: 'Cámara y control' },
    { id: 'controls', label: 'Controles',    sub: 'Teclas y acciones' },
  ];

  React.useEffect(() => {
    if (!rebinding) return;
    const h = (e) => {
      e.preventDefault();
      let key = e.key;
      if (key === ' ') key = 'Espacio';
      else if (key.length === 1) key = key.toUpperCase();
      setBindings((b) => ({ ...b, [rebinding]: key }));
      setRebinding(null);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [rebinding]);

  return (
    <div style={optStyles.root}>
      <div style={optStyles.vignette} />
      <div style={{ ...optStyles.glow, opacity: 0.45 * glowIntensity }} />
      {grainOn && <div style={optStyles.grain} />}

      <CornerOrnament pos="tl" />
      <CornerOrnament pos="tr" />
      <CornerOrnament pos="bl" />
      <CornerOrnament pos="br" />

      {/* Encabezado */}
      <header style={optStyles.header}>
        <div style={optStyles.eyebrow}>— AJUSTES —</div>
        <h1 style={optStyles.title}>OPCIONES</h1>
        <div style={optStyles.sep}>
          <span style={optStyles.sepLine} />
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ opacity: 0.7 }}>
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#8a0e2a" />
          </svg>
          <span style={optStyles.sepLine} />
        </div>
      </header>

      {/* Cuerpo: sidebar + panel */}
      <div style={optStyles.body}>
        <aside style={optStyles.sidebar}>
          {cats.map((c, i) => {
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                style={{
                  ...optStyles.catBtn,
                  color: active ? '#ffe9ec' : 'rgba(224,210,180,0.55)',
                  textShadow: active
                    ? `0 0 16px rgba(196,28,68,${0.9 * glowIntensity}), 0 0 32px rgba(196,28,68,${0.5 * glowIntensity})`
                    : 'none',
                }}
              >
                <span style={{
                  ...optStyles.catIndex,
                  color: active ? '#c41c44' : 'rgba(224,210,180,0.25)',
                }}>0{i + 1}</span>
                <span style={optStyles.catLabelWrap}>
                  <span style={optStyles.catLabel}>{c.label}</span>
                  <span style={optStyles.catSub}>{c.sub}</span>
                </span>
                <span style={{
                  ...optStyles.catBar,
                  width: active ? 4 : 1,
                  background: active ? '#c41c44' : 'rgba(224,210,180,0.15)',
                  boxShadow: active ? `0 0 12px rgba(196,28,68,${0.9 * glowIntensity})` : 'none',
                }} />
              </button>
            );
          })}
        </aside>

        <main style={optStyles.panel}>
          {cat === 'audio' && (
            <Section title="Audio" subtitle="Balance del paisaje sonoro">
              <Slider label="Volumen general" value={vals.master} onChange={(v) => set('master', v)} glow={glowIntensity} />
              <Slider label="Música"          value={vals.music}  onChange={(v) => set('music', v)}  glow={glowIntensity} />
              <Slider label="Efectos"         value={vals.sfx}    onChange={(v) => set('sfx', v)}    glow={glowIntensity} />
              <Slider label="Voces"           value={vals.voices} onChange={(v) => set('voices', v)} glow={glowIntensity} />
              <Slider label="Ambiente"        value={vals.ambient} onChange={(v) => set('ambient', v)} glow={glowIntensity} />
            </Section>
          )}

          {cat === 'graphics' && (
            <Section title="Gráficos" subtitle="Fidelidad y rendimiento">
              <Picker label="Calidad gráfica" value={vals.quality} options={['Baja','Media','Alta','Ultra','Personalizada']} onChange={(v) => set('quality', v)} />
              <Picker label="Resolución"      value={vals.resolution} options={['1920 × 1080','2560 × 1440','3440 × 1440','3840 × 2160']} onChange={(v) => set('resolution', v)} />
              <Picker label="Modo ventana"    value={vals.windowMode} options={['Ventana','Ventana sin bordes','Pantalla completa']} onChange={(v) => set('windowMode', v)} />
              <Slider label="Brillo"          value={vals.brightness} onChange={(v) => set('brightness', v)} glow={glowIntensity} />
              <Picker label="Sombras"         value={vals.shadows} options={['Baja','Media','Alta','Ultra']} onChange={(v) => set('shadows', v)} />
              <Picker label="Texturas"        value={vals.textures} options={['Baja','Media','Alta','Ultra']} onChange={(v) => set('textures', v)} />
              <Picker label="Antialiasing"    value={vals.antialiasing} options={['Desactivado','FXAA','SMAA','TAA','DLAA']} onChange={(v) => set('antialiasing', v)} />
              <Toggle label="Sincronización vertical (VSync)" value={vals.vsync} onChange={(v) => set('vsync', v)} glow={glowIntensity} />
            </Section>
          )}

          {cat === 'sens' && (
            <Section title="Sensibilidad" subtitle="Control y precisión de cámara">
              <Slider label="Sensibilidad horizontal" value={vals.sensX} onChange={(v) => set('sensX', v)} glow={glowIntensity} />
              <Slider label="Sensibilidad vertical"   value={vals.sensY} onChange={(v) => set('sensY', v)} glow={glowIntensity} />
              <Slider label="Sensibilidad de cámara"  value={vals.sensCam} onChange={(v) => set('sensCam', v)} glow={glowIntensity} />
              <Toggle label="Invertir eje Y"          value={vals.invertY} onChange={(v) => set('invertY', v)} glow={glowIntensity} />
              <Slider label="Suavizado de cámara"     value={vals.smooth} onChange={(v) => set('smooth', v)} glow={glowIntensity} />
            </Section>
          )}

          {cat === 'controls' && (
            <Section title="Controles" subtitle="Reasignación de teclas">
              <div style={optStyles.bindHead}>
                <span>Acción</span>
                <span>Tecla asignada</span>
              </div>
              {[
                ['move', 'Moverse'],
                ['interact', 'Interactuar'],
                ['attack', 'Atacar'],
                ['dodge', 'Esquivar'],
                ['pause', 'Pausa'],
                ['run', 'Correr'],
                ['jump', 'Saltar'],
              ].map(([id, label]) => {
                const waiting = rebinding === id;
                return (
                  <button
                    key={id}
                    onClick={() => setRebinding(waiting ? null : id)}
                    style={{
                      ...optStyles.bindRow,
                      color: waiting ? '#ffe9ec' : 'rgba(224,210,180,0.85)',
                      borderColor: waiting ? 'rgba(196,28,68,0.7)' : 'rgba(224,210,180,0.08)',
                      background: waiting ? 'rgba(196,28,68,0.08)' : 'transparent',
                      boxShadow: waiting ? `0 0 24px rgba(196,28,68,${0.45 * glowIntensity}) inset` : 'none',
                    }}
                  >
                    <span style={optStyles.bindLabel}>{label}</span>
                    <span style={{
                      ...optStyles.bindKey,
                      color: waiting ? '#ffe9ec' : 'rgba(224,210,180,0.9)',
                      borderColor: waiting ? '#c41c44' : 'rgba(224,210,180,0.18)',
                      textShadow: waiting
                        ? `0 0 12px rgba(196,28,68,${0.9 * glowIntensity})`
                        : 'none',
                    }}>
                      {waiting ? '‹ pulsa una tecla ›' : bindings[id]}
                    </span>
                  </button>
                );
              })}
            </Section>
          )}
        </main>
      </div>

      {/* Botones inferiores */}
      <footer style={optStyles.footer}>
        <div style={optStyles.footerLeft}>
          <Key2>Tab</Key2><span>Cambiar categoría</span>
          <span style={{ opacity: 0.3, margin: '0 10px' }}>·</span>
          <Key2>Enter</Key2><span>Aplicar</span>
        </div>
        <div style={optStyles.footerBtns}>
          <FootBtn onClick={onBack}>Volver</FootBtn>
          <FootBtn>Restaurar predeterminados</FootBtn>
          <FootBtn primary glow={glowIntensity}>Aplicar</FootBtn>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div>
      <div style={optStyles.sectionHead}>
        <h2 style={optStyles.sectionTitle}>{title}</h2>
        <span style={optStyles.sectionLine} />
        <span style={optStyles.sectionSub}>{subtitle}</span>
      </div>
      <div style={optStyles.sectionBody}>{children}</div>
    </div>
  );
}

function Slider({ label, value, onChange, glow = 1 }) {
  const ref = React.useRef(null);
  const [drag, setDrag] = React.useState(false);
  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    onChange(Math.round(p));
  };
  return (
    <div style={optStyles.row}>
      <div style={optStyles.rowLabel}>{label}</div>
      <div
        ref={ref}
        onPointerDown={(e) => { setDrag(true); ref.current.setPointerCapture(e.pointerId); setFromEvent(e); }}
        onPointerMove={(e) => drag && setFromEvent(e)}
        onPointerUp={(e) => { setDrag(false); ref.current.releasePointerCapture(e.pointerId); }}
        style={optStyles.sliderTrack}
      >
        {/* Marcas */}
        {Array.from({ length: 21 }).map((_, i) => (
          <span key={i} style={{
            ...optStyles.sliderTick,
            left: `${i * 5}%`,
            opacity: i <= value / 5 ? 0.6 : 0.15,
            background: i <= value / 5 ? '#c41c44' : 'rgba(224,210,180,0.5)',
            height: i % 5 === 0 ? 8 : 4,
          }} />
        ))}
        <span style={{
          ...optStyles.sliderFill,
          width: `${value}%`,
          boxShadow: `0 0 14px rgba(196,28,68,${0.7 * glow})`,
        }} />
        <span style={{
          ...optStyles.sliderKnob,
          left: `${value}%`,
          boxShadow: `0 0 18px rgba(196,28,68,${0.95 * glow}), 0 0 4px #fff`,
        }} />
      </div>
      <div style={optStyles.rowValue}>{value}</div>
    </div>
  );
}

function Picker({ label, value, options, onChange }) {
  const idx = options.indexOf(value);
  const prev = () => onChange(options[(idx - 1 + options.length) % options.length]);
  const next = () => onChange(options[(idx + 1) % options.length]);
  return (
    <div style={optStyles.row}>
      <div style={optStyles.rowLabel}>{label}</div>
      <div style={optStyles.pickerBox}>
        <button onClick={prev} style={optStyles.pickerArrow}>‹</button>
        <div style={optStyles.pickerVal}>{value}</div>
        <button onClick={next} style={optStyles.pickerArrow}>›</button>
        {/* Dots */}
        <div style={optStyles.pickerDots}>
          {options.map((_, i) => (
            <span key={i} style={{
              ...optStyles.pickerDot,
              background: i === idx ? '#c41c44' : 'rgba(224,210,180,0.18)',
              boxShadow: i === idx ? '0 0 6px rgba(196,28,68,0.8)' : 'none',
            }} />
          ))}
        </div>
      </div>
      <div style={optStyles.rowValue}>{idx + 1}/{options.length}</div>
    </div>
  );
}

function Toggle({ label, value, onChange, glow = 1 }) {
  return (
    <div style={optStyles.row}>
      <div style={optStyles.rowLabel}>{label}</div>
      <button
        onClick={() => onChange(!value)}
        style={{
          ...optStyles.toggle,
          justifyContent: value ? 'flex-end' : 'flex-start',
          borderColor: value ? 'rgba(196,28,68,0.7)' : 'rgba(224,210,180,0.2)',
          boxShadow: value ? `0 0 14px rgba(196,28,68,${0.5 * glow}) inset` : 'none',
        }}
      >
        <span style={{
          ...optStyles.toggleDot,
          background: value ? '#c41c44' : 'rgba(224,210,180,0.55)',
          boxShadow: value ? `0 0 12px rgba(196,28,68,${0.9 * glow})` : 'none',
        }} />
      </button>
      <div style={{ ...optStyles.rowValue, color: value ? '#c41c44' : 'rgba(224,210,180,0.55)' }}>
        {value ? 'ACTIVADO' : 'DESACTIVADO'}
      </div>
    </div>
  );
}

function FootBtn({ children, primary, onClick, glow = 1 }) {
  const [hv, setHv] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHv(true)}
      onMouseLeave={() => setHv(false)}
      onClick={onClick}
      style={{
        fontFamily: '"Cinzel Decorative", serif',
        fontSize: 13,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        padding: '14px 28px',
        background: primary ? 'linear-gradient(180deg, rgba(196,28,68,0.22), rgba(120,8,36,0.18))' : 'transparent',
        border: primary ? '1px solid rgba(196,28,68,0.55)' : '1px solid rgba(224,210,180,0.15)',
        color: primary ? '#ffe9ec' : (hv ? '#ffe9ec' : 'rgba(224,210,180,0.75)'),
        cursor: 'pointer',
        transition: 'all 280ms cubic-bezier(.2,.7,.3,1)',
        textShadow: (primary || hv) ? `0 0 14px rgba(196,28,68,${0.8 * glow})` : 'none',
        borderColor: hv ? 'rgba(196,28,68,0.7)' : (primary ? 'rgba(196,28,68,0.55)' : 'rgba(224,210,180,0.15)'),
      }}
    >{children}</button>
  );
}

function Key2({ children }) {
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

const optStyles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#050305',
    color: '#e0d2b4',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: '56px 96px 40px',
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  vignette: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(30,6,14,0.12) 0%, rgba(5,3,5,0.6) 60%, rgba(0,0,0,0.92) 100%)',
    pointerEvents: 'none',
  },
  glow: {
    position: 'absolute',
    top: 0, left: '-10%', right: '-10%', height: '45%',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(196,28,68,0.15), transparent 65%)',
    pointerEvents: 'none',
    filter: 'blur(30px)',
  },
  grain: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    opacity: 0.06, mixBlendMode: 'overlay',
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.9\'/></svg>")',
  },
  header: {
    textAlign: 'center',
    zIndex: 2,
    marginBottom: 36,
  },
  eyebrow: {
    fontFamily: '"JetBrains Mono", "Courier New", monospace',
    fontSize: 10,
    letterSpacing: '0.55em',
    color: 'rgba(224,210,180,0.45)',
    marginBottom: 14,
  },
  title: {
    fontFamily: '"Cinzel Decorative", serif',
    fontWeight: 700,
    fontSize: 68,
    lineHeight: 1,
    margin: 0,
    letterSpacing: '0.18em',
    background: 'linear-gradient(180deg, #e23a60 0%, #c41c44 45%, #6b0a22 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 22px rgba(196,28,68,0.35))',
  },
  sep: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 12, marginTop: 12,
  },
  sepLine: {
    display: 'inline-block', width: 100, height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(196,28,68,0.5), transparent)',
  },
  body: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: 56,
    minHeight: 0,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderRight: '1px solid rgba(224,210,180,0.08)',
    paddingRight: 24,
  },
  catBtn: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '48px 1fr 4px',
    alignItems: 'center',
    gap: 14,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '18px 12px 18px 0',
    textAlign: 'left',
    transition: 'color 300ms, text-shadow 300ms',
  },
  catIndex: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 12,
    letterSpacing: '0.1em',
    transition: 'color 300ms',
  },
  catLabelWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  catLabel: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: 18,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
  },
  catSub: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 12,
    fontStyle: 'italic',
    letterSpacing: '0.1em',
    color: 'rgba(224,210,180,0.4)',
  },
  catBar: {
    height: 36,
    transition: 'width 300ms, background 300ms, box-shadow 300ms',
  },
  panel: {
    overflow: 'auto',
    padding: '0 4px 0 8px',
  },
  sectionHead: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 18,
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: 26,
    fontWeight: 400,
    letterSpacing: '0.2em',
    margin: 0,
    color: '#ffe9ec',
    textTransform: 'uppercase',
    textShadow: '0 0 18px rgba(196,28,68,0.6)',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    background: 'linear-gradient(90deg, rgba(196,28,68,0.5), rgba(224,210,180,0.15) 40%, transparent)',
  },
  sectionSub: {
    fontFamily: '"Cormorant Garamond", serif',
    fontStyle: 'italic',
    fontSize: 13,
    letterSpacing: '0.2em',
    color: 'rgba(224,210,180,0.45)',
  },
  sectionBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr 80px',
    alignItems: 'center',
    gap: 24,
    padding: '14px 0',
    borderBottom: '1px solid rgba(224,210,180,0.05)',
  },
  rowLabel: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: 13,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(224,210,180,0.8)',
  },
  rowValue: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 12,
    letterSpacing: '0.1em',
    textAlign: 'right',
    color: 'rgba(224,210,180,0.6)',
  },
  sliderTrack: {
    position: 'relative',
    height: 20,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  sliderTick: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1,
    transition: 'opacity 200ms, background 200ms',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: '50%',
    height: 1,
    transform: 'translateY(-50%)',
    background: 'linear-gradient(90deg, rgba(196,28,68,0.2), #c41c44)',
    pointerEvents: 'none',
  },
  sliderKnob: {
    position: 'absolute',
    top: '50%',
    width: 10,
    height: 10,
    transform: 'translate(-50%, -50%) rotate(45deg)',
    background: '#ffe9ec',
    pointerEvents: 'none',
  },
  pickerBox: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '28px 1fr 28px',
    alignItems: 'center',
    padding: '8px 10px',
    border: '1px solid rgba(224,210,180,0.12)',
    background: 'rgba(10,4,6,0.4)',
  },
  pickerArrow: {
    background: 'transparent',
    border: 'none',
    color: '#c41c44',
    fontSize: 22,
    fontFamily: 'serif',
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
    textShadow: '0 0 10px rgba(196,28,68,0.6)',
  },
  pickerVal: {
    textAlign: 'center',
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 16,
    letterSpacing: '0.12em',
    color: '#ffe9ec',
  },
  pickerDots: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 5,
  },
  pickerDot: {
    width: 4, height: 4,
    borderRadius: 2,
    transition: 'background 200ms, box-shadow 200ms',
  },
  toggle: {
    position: 'relative',
    width: 64,
    height: 24,
    padding: '0 3px',
    background: 'rgba(10,4,6,0.5)',
    border: '1px solid rgba(224,210,180,0.2)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 220ms',
  },
  toggleDot: {
    width: 14, height: 14,
    transform: 'rotate(45deg)',
    transition: 'all 220ms',
  },
  bindHead: {
    display: 'grid',
    gridTemplateColumns: '1fr 220px',
    padding: '12px 20px',
    marginBottom: 6,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(224,210,180,0.4)',
    borderBottom: '1px solid rgba(224,210,180,0.08)',
  },
  bindRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 220px',
    alignItems: 'center',
    padding: '14px 20px',
    border: '1px solid rgba(224,210,180,0.08)',
    borderTop: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 220ms',
  },
  bindLabel: {
    fontFamily: '"Cinzel Decorative", serif',
    fontSize: 13,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  bindKey: {
    justifySelf: 'end',
    minWidth: 100,
    padding: '6px 14px',
    border: '1px solid rgba(224,210,180,0.18)',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 12,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textAlign: 'center',
    transition: 'all 220ms',
    background: 'rgba(10,4,6,0.45)',
  },
  footer: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    letterSpacing: '0.28em',
    color: 'rgba(224,210,180,0.4)',
  },
  footerBtns: {
    display: 'flex',
    gap: 10,
  },
};

window.OptionsScreen = OptionsScreen;
