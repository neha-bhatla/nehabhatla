import { useEffect, useRef, useState } from 'react';
import './MoleGame.css';

const ROUND_SECONDS = 20;
const MOLE_INTERVAL = 850;
const BEST_KEY = 'neha-mole-best';

function Mole({ visible, bonked }) {
  return <svg className="mole-art" viewBox="0 0 64 54" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
    <path fill="#bac69f" d="M8 38h48v3h4v7h-4v3H8v-3H4v-7h4z" />
    <path fill="#685348" d="M12 39h40v3h4v5h-4v2H12v-2H8v-5h4z" />
    <g className={`mole-character ${visible ? 'is-up' : ''} ${bonked ? 'is-bonked' : ''}`}>
      <path fill="#76594c" d="M19 15h5v-4h16v4h5v4h3v28H16V19h3z" />
      <path fill="#b58b73" d="M20 19h4v-4h16v4h4v26H20z" />
      <path fill="#d5ac8e" d="M24 17h6v3h-6zM22 35h20v10H22z" />
      <path fill="#483e3d" d="M24 25h3v4h-3zM37 25h3v4h-3z" />
      <path fill="#edafb4" d="M20 30h6v3h-6zM38 30h6v3h-6z" />
      <path fill="#76594c" d="M29 30h6v3h-6zM31 33h2v3h-2zM28 36h8v2h-8z" />
      <path fill="#fff5df" d="M29 36h3v4h-3zM33 36h3v4h-3z" />
      <path fill="#d5ac8e" d="M13 41h8v5h-8zM43 41h8v5h-8z" />
    </g>
    <path fill="#8c9e72" d="M8 46h12v2h24v-2h12v4h-4v2H12v-2H8z" />
    <path fill="#a7b78c" d="M12 48h6v2h-6zM47 48h5v2h-5z" />
  </svg>;
}

export default function MoleGame() {
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [target, setTarget] = useState(-1);
  const [bonked, setBonked] = useState(-1);
  const [best, setBest] = useState(() => {
    try {
      const stored = Number(localStorage.getItem(BEST_KEY));
      return Number.isFinite(stored) && stored >= 0 ? Math.floor(stored) : 0;
    } catch { return 0; }
  });
  const targetRef = useRef(-1);
  const previousTarget = useRef(-1);
  const deadline = useRef(0);
  const firstHole = useRef(null);

  useEffect(() => {
    if (status !== 'playing') return undefined;
    let nextMoleAt = 0;
    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((deadline.current - now) / 1000));
      setTimeLeft(remaining);
      if (now >= deadline.current) {
        targetRef.current = -1;
        setTarget(-1);
        setBonked(-1);
        setStatus('finished');
        return;
      }
      if (now >= nextMoleAt) {
        // Pick a different hole each time, even if the previous mole was hit.
        const choice = Math.floor(Math.random() * (previousTarget.current < 0 ? 9 : 8));
        const next = previousTarget.current >= 0 && choice >= previousTarget.current ? choice + 1 : choice;
        previousTarget.current = next;
        targetRef.current = next;
        setTarget(next);
        setBonked(-1);
        nextMoleAt = now + MOLE_INTERVAL;
      }
    };
    tick();
    const timer = window.setInterval(tick, 100);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status !== 'finished' || score <= best) return;
    setBest(score);
    try { localStorage.setItem(BEST_KEY, String(score)); } catch { /* Play still works when storage is unavailable. */ }
  }, [status, score, best]);

  function start() {
    targetRef.current = -1;
    previousTarget.current = -1;
    deadline.current = Date.now() + ROUND_SECONDS * 1000;
    setScore(0);
    setBonked(-1);
    setTimeLeft(ROUND_SECONDS);
    setStatus('playing');
  }
  useEffect(() => { if (status === 'playing') firstHole.current?.focus({ preventScroll: true }); }, [status]);

  function hit(index) {
    if (status !== 'playing' || Date.now() >= deadline.current || targetRef.current !== index) return;
    targetRef.current = -1; // Lock immediately so a double click only scores once.
    setScore(value => value + 1);
    setTarget(-1);
    setBonked(index);
  }
  function end() {
    targetRef.current = -1;
    setTarget(-1);
    setBonked(-1);
    setStatus('finished');
  }
  function keyboard(event) {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || !/^[1-9]$/.test(event.key)) return;
    event.preventDefault();
    hit(Number(event.key) - 1);
  }

  const message = status === 'idle' ? 'The moles are getting a little too comfortable.'
    : status === 'playing' ? 'Go on. Give them a gentle bonk.'
      : score === 0 ? 'The moles won this one. Rematch?'
        : `You bonked ${score} ${score === 1 ? 'mole' : 'moles'}. ${score >= best ? 'A personal best. Very official.' : 'Your résumé remains unchanged.'}`;

  return <section className="game-section" id="play" aria-labelledby="game-title">
    <div className="section-wrap game-layout" onKeyDown={keyboard}>
      <div className="game-copy">
        <p className="eyebrow">HERE’S A TREAT</p>
        <h2 id="game-title">Whack-a-mole<span>.</span></h2>
        <p className="game-description">A very serious test of absolutely nothing.<br />You have 20 seconds. Make them count.</p>
        <div className="game-actions">
          {status === 'playing' ? <button type="button" className="button game-end" onClick={end}>End round</button>
            : <button type="button" className="button primary" onClick={start}>{status === 'idle' ? 'Let’s play' : 'One more round'} <span aria-hidden="true">↗</span></button>}
          <a className="game-skip" href="#contact">Back to business ↓</a>
        </div>
        <p className="game-message" role="status">{message}</p>
      </div>
      <div className={`game-console game-${status}`}>
        <div className="game-scoreboard">
          <div><span>score</span><strong data-testid="mole-score">{String(score).padStart(2, '0')}</strong></div>
          <div><span>time</span><strong className={timeLeft <= 5 && status === 'playing' ? 'time-low' : ''}>{timeLeft}<small>s</small></strong></div>
          <div><span>best</span><strong>{String(best).padStart(2, '0')}</strong></div>
        </div>
        <div className="mole-board" role="group" aria-label="Whack-a-mole board, holes numbered 1 to 9">
          {Array.from({ length: 9 }, (_, index) => <button type="button" ref={index === 0 ? firstHole : undefined} key={index}
            className={`mole-hole ${target === index ? 'has-mole' : ''}`} disabled={status !== 'playing'}
            aria-label={`Hole ${index + 1}${target === index ? ', mole here' : ', empty'}`} onClick={() => hit(index)}>
            <Mole visible={target === index || (status === 'idle' && index === 4)} bonked={bonked === index} />
            {bonked === index && <span className="mole-point" aria-hidden="true">+1</span>}
            <span className="hole-number" aria-hidden="true">{index + 1}</span>
          </button>)}
        </div>
        <p className="game-instructions">Tap a mole · or use keys 1–9 while playing</p>
      </div>
    </div>
  </section>;
}
