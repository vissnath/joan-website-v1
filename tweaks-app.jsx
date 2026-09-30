// tweaks-app.jsx — Joan from Legal landing page tweaks
const { useEffect } = React;

const JOAN_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "statement",
  "accent": "#de5b3c",
  "display": "Newsreader",
  "density": "regular"
}/*EDITMODE-END*/;

function JoanTweaks(){
  const [t, setTweak] = useTweaks(JOAN_DEFAULTS);

  useEffect(() => {
    document.body.setAttribute('data-hero', t.hero);
  }, [t.hero]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
  }, [t.accent]);

  useEffect(() => {
    const stack = t.display === 'Spectral'
      ? "'Spectral', Georgia, serif"
      : "'Newsreader', Georgia, serif";
    document.documentElement.style.setProperty('--font-display', stack);
  }, [t.display]);

  useEffect(() => {
    const map = { compact: '84px', regular: '108px', comfy: '128px' };
    // adjust vertical rhythm of sections
    document.querySelectorAll('section').forEach((s) => {
      if (s.classList.contains('cta') || s.classList.contains('hero') || s.classList.contains('facts')) return;
      s.style.paddingTop = map[t.density];
      s.style.paddingBottom = map[t.density];
    });
  }, [t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero direction" />
      <TweakRadio
        label="Layout"
        value={t.hero}
        options={[
          { value: 'statement', label: 'Statement' },
          { value: 'split', label: 'Split' },
          { value: 'block', label: 'Block' },
        ]}
        onChange={(v) => setTweak('hero', v)}
      />
      <TweakSection label="Color & type" />
      <TweakColor
        label="Highlight accent"
        value={t.accent}
        options={['#de5b3c', '#2b6090']}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakRadio
        label="Headline serif"
        value={t.display}
        options={['Newsreader', 'Spectral']}
        onChange={(v) => setTweak('display', v)}
      />
      <TweakSection label="Spacing" />
      <TweakRadio
        label="Section rhythm"
        value={t.density}
        options={['compact', 'regular', 'comfy']}
        onChange={(v) => setTweak('density', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<JoanTweaks />);
