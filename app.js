'use strict';

// ===== DATA =====

const DAYS_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const DAYS_FULL  = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

const PHASES = [
  { weeks: [1,2,3,4],   name: 'Phase 1 – Basis aufbauen',  desc: 'Gehpausen erlaubt · Körper sanft rantasten' },
  { weeks: [5,6,7,8],   name: 'Phase 2 – Ausdauer stärken', desc: 'Laufzeit verlängern · Tempo leicht erhöhen' },
  { weeks: [9,10,11,12], name: 'Phase 3 – Kontinuität',     desc: 'Durchgehend laufen · Distanz aufbauen' },
  { weeks: [13,14,15,16], name: 'Phase 4 – Finalspurt',     desc: 'Auf 10 km zusteuern · Tapering vor dem Ziel' },
];

const TRX_POOL = [
  { name: 'TRX Squat',           desc: '3 × 12 Wdh. – Beine & Gesäß stärken. Schlingen schulterbreit, Rücken gerade, tief in die Knie.' },
  { name: 'TRX Row',             desc: '3 × 10 Wdh. – Rücken & Körperspannung. Körper gerade wie ein Brett, Ellbogen nah am Körper.' },
  { name: 'TRX Plank',           desc: '3 × 20 Sek. – Tiefe Rumpfstabilität. Füße in den Schlaufen, Hüfte nicht absinken lassen.' },
  { name: 'TRX Hip Press',       desc: '3 × 12 Wdh. – Gesäß & hintere Oberschenkel. Rückenlage, Füße in Schlaufen, Hüfte heben.' },
  { name: 'TRX Chest Press',     desc: '3 × 10 Wdh. – Brust & Schultern. Körper diagonal, Hände auf Schulterhöhe, langsam absenken.' },
  { name: 'TRX Lunge',           desc: '3 × 10 Wdh. je Seite – Einbeinige Stabilität & Kraft. Hinteres Bein in der Schlinge.' },
  { name: 'TRX Mountain Climber',desc: '3 × 15 Wdh. – Rumpf & Koordination. Füße in Schlaufen, langsam und kontrolliert ausführen.' },
  { name: 'TRX Y-Fly',           desc: '3 × 10 Wdh. – Schultern & oberer Rücken. Arme in Y-Form heben, wichtig nach der Stillzeit.' },
  { name: 'TRX Side Plank',      desc: '3 × 15 Sek. je Seite – Seitliche Rumpfstabilität. Fuß in Schlinge, Hüfte gerade halten.' },
  { name: 'TRX Hamstring Curl',  desc: '3 × 10 Wdh. – Hintere Oberschenkel & Gesäß. Rückenlage, Fersen in Schlaufen, Hüfte heben & Fersen heranziehen.' },
];

const BLACKROLL_POOL = [
  { name: 'Waden ausrollen',          desc: '60 Sek. je Seite – Langsam rollen, auf Verhärtungen warten (1–2 Sek. halten bis der Schmerz nachlässt).' },
  { name: 'Oberschenkel vorne',        desc: '60 Sek. je Seite – Bauchlage, Rolle unter dem Quadrizeps, Ellbogen abstützen.' },
  { name: 'IT-Band (Außenseite)',      desc: '60 Sek. je Seite – Seitlage, Rolle entlang dem Außenband. Entlastet Knie & Hüfte beim Laufen.' },
  { name: 'Brustwirbelsäule mobilisieren', desc: '30–60 Sek. – Rolle quer zwischen die Schulterblätter legen, Arme über den Kopf strecken. Atmen.' },
  { name: 'Gesäß (Piriformis)',        desc: '60 Sek. je Seite – Sitzknochen auf die Rolle, leicht zur Seite kippen. Hilft gegen Rückenschmerzen.' },
  { name: 'Rücken (nur Brustwirbel)', desc: '60 Sek. – Nur Brustwirbelsäule ausrollen! Lendenwirbelsäule (unterer Rücken) freilassen, nicht belasten.' },
  { name: 'Fußsohle (kleiner Ball)',  desc: '30 Sek. je Seite – Kleinen Ball oder Igel unter die Fußsohle, langsam abrollen. Plantarfaszie lockern.' },
  { name: 'Oberschenkel hinten',      desc: '60 Sek. je Seite – Sitzbeinstellung, Rolle unter den Oberschenkel. Hände abstützen, langsam vor/zurück.' },
];

// ===== PLAN GENERATOR =====

function getWeekPlan(w) {
  // Fixed day layout: Mo/Mi/Fr = Run, Di/Do = TRX, Sa = Blackroll, So = Rest
  const runDays       = [0, 2, 4];
  const trxDays       = [1, 3];
  const blackrollDays = [5];
  const restDays      = [6];

  let runDuration, runDesc, pace, pulse;

  if (w <= 4) {
    const mins = 20 + (w - 1) * 3;
    runDuration = mins + ' Minuten';
    runDesc     = 'Intervall: 2 Min. laufen / 2 Min. gehen. Kein Druck – locker bleiben!';
    pace        = '7:30 – 8:30 min/km';
    pulse       = '120 – 135 bpm (Zone 2)';
  } else if (w <= 8) {
    const mins = 28 + (w - 5) * 4;
    runDuration = mins + ' Minuten';
    runDesc     = 'Intervall: 4 Min. laufen / 1 Min. gehen. Ruhig und gleichmäßig.';
    pace        = '7:00 – 8:00 min/km';
    pulse       = '130 – 145 bpm (Zone 2–3)';
  } else if (w <= 12) {
    const km = (3.5 + (w - 9) * 0.4).toFixed(1);
    runDuration = km + ' km';
    runDesc     = 'Durchgehend laufen – letzter Lauf der Woche (Fr) etwas länger als die anderen.';
    pace        = '6:30 – 7:30 min/km';
    pulse       = '135 – 150 bpm (Zone 3)';
  } else {
    const km = (5.0 + (w - 13) * 1.2).toFixed(1);
    runDuration = km + ' km';
    runDesc     = w === 16
      ? '🎉 Zielwoche! Erste 10 km – kein Druck, ankommen zählt!'
      : 'Langer Lauf am Freitag, Di & Do kürzer halten (je ~4–5 km).';
    pace        = '6:00 – 7:00 min/km';
    pulse       = '140 – 155 bpm (Zone 3)';
  }

  // Rotate exercises per week so they're not always the same
  const trxSets = [
    [TRX_POOL[(w * 2) % 10],      TRX_POOL[(w * 2 + 1) % 10],  TRX_POOL[(w * 2 + 3) % 10]],
    [TRX_POOL[(w * 3 + 1) % 10],  TRX_POOL[(w * 3 + 4) % 10],  TRX_POOL[(w * 3 + 6) % 10]],
  ];
  const brSets = [
    [BLACKROLL_POOL[w % 8], BLACKROLL_POOL[(w + 2) % 8], BLACKROLL_POOL[(w + 5) % 8]],
  ];

  return { runDays, trxDays, blackrollDays, restDays, runDuration, runDesc, pace, pulse, trxSets, brSets };
}

function getPhase(w) {
  return PHASES.find(p => p.weeks.includes(w)) || PHASES[0];
}

// ===== STATE =====

let currentWeek = 1;
let selectedDay  = 0;

// ===== RENDER =====

function render() {
  const w    = currentWeek;
  const plan = getWeekPlan(w);
  const phase = getPhase(w);

  // Progress
  const pct = Math.round((w / 16) * 100);
  document.getElementById('prog-week-label').textContent = 'Woche ' + w + ' von 16';
  document.getElementById('prog-pct').textContent        = pct + '%';
  const fill = document.getElementById('progress-fill');
  fill.style.width = pct + '%';
  fill.closest('[role="progressbar"]').setAttribute('aria-valuenow', pct);

  // Week nav
  document.getElementById('week-label').textContent   = 'Woche ' + w;
  document.getElementById('week-phase').textContent   = phase.name + ' · ' + phase.desc;
  document.getElementById('btn-prev').disabled         = w === 1;
  document.getElementById('btn-next').disabled         = w === 16;

  // Days grid
  const grid = document.getElementById('days-grid');
  grid.innerHTML = '';

  for (let i = 0; i < 7; i++) {
    let type, icon, tag;
    if (plan.runDays.includes(i))       { type = 'run';       icon = '🏃'; tag = 'Laufen'; }
    else if (plan.trxDays.includes(i))  { type = 'trx';       icon = '💪'; tag = 'TRX'; }
    else if (plan.blackrollDays.includes(i)) { type = 'blackroll'; icon = '⚪'; tag = 'Blackroll'; }
    else                                 { type = 'rest';      icon = '😴'; tag = 'Pause'; }

    const btn = document.createElement('button');
    btn.className = 'day-btn type-' + type + (selectedDay === i ? ' selected' : '');
    btn.setAttribute('aria-label', DAYS_FULL[i] + ': ' + tag);
    btn.innerHTML = `
      <div class="day-name">${DAYS_SHORT[i]}</div>
      <div class="day-icon" aria-hidden="true">${icon}</div>
      <div class="day-tag">${tag}</div>
    `;
    btn.addEventListener('click', () => selectDay(i));
    grid.appendChild(btn);
  }

  renderDetail(plan, selectedDay);
}

function renderDetail(plan, d) {
  const panel = document.getElementById('detail-panel');

  if (d < 0) {
    panel.innerHTML = `
      <div class="empty-state">
        <span>👆</span>
        Einen Tag auswählen für die Trainingsdetails
      </div>`;
    return;
  }

  if (plan.runDays.includes(d)) {
    panel.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-icon run" aria-hidden="true">🏃</div>
          <div>
            <div class="detail-title">Laufeinheit – ${DAYS_FULL[d]}</div>
            <div class="detail-subtitle">Woche ${currentWeek} · ${getPhase(currentWeek).name.split('–')[0].trim()}</div>
          </div>
        </div>
        <div class="stats-row">
          <div class="stat-chip">
            <div class="stat-label">Dauer / Distanz</div>
            <div class="stat-value">${plan.runDuration}</div>
          </div>
          <div class="stat-chip">
            <div class="stat-label">Pace (Ziel)</div>
            <div class="stat-value">${plan.pace}</div>
          </div>
          <div class="stat-chip">
            <div class="stat-label">Puls</div>
            <div class="stat-value">${plan.pulse}</div>
          </div>
        </div>
        <div class="exercises run">
          <div class="exercise-item">
            <div class="ex-num">▶</div>
            <div>
              <div class="ex-name">Aufwärmen – 5 Minuten</div>
              <div class="ex-desc">Flott gehen, leichte Hüftkreise, Beinpendeln & Fußgelenke kreisen.</div>
            </div>
          </div>
          <div class="exercise-item">
            <div class="ex-num">🏃</div>
            <div>
              <div class="ex-name">Hauptlauf – ${plan.runDuration}</div>
              <div class="ex-desc">${plan.runDesc}</div>
            </div>
          </div>
          <div class="exercise-item">
            <div class="ex-num">◼</div>
            <div>
              <div class="ex-name">Cool-down – 5 Minuten</div>
              <div class="ex-desc">Langsam auslaufen / gehen + 3 Min. statisches Dehnen: Waden, Hüftbeuger, Oberschenkel.</div>
            </div>
          </div>
        </div>
        <p class="tip-box">💡 <strong>Pace-Tipp:</strong> Du solltest beim Laufen noch einen vollständigen Satz sprechen können – so findest du dein richtiges Tempo. Kein Druck!</p>
      </div>`;

  } else if (plan.trxDays.includes(d)) {
    const tIdx = plan.trxDays.indexOf(d);
    const exs  = plan.trxSets[tIdx];
    panel.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-icon trx" aria-hidden="true">💪</div>
          <div>
            <div class="detail-title">TRX-Training – ${DAYS_FULL[d]}</div>
            <div class="detail-subtitle">15 Minuten · Rumpf, Kraft & Stabilität</div>
          </div>
        </div>
        <div class="stats-row">
          <div class="stat-chip">
            <div class="stat-label">Dauer</div>
            <div class="stat-value">15 Minuten</div>
          </div>
          <div class="stat-chip">
            <div class="stat-label">Pause je Satz</div>
            <div class="stat-value">45 – 60 Sek.</div>
          </div>
          <div class="stat-chip">
            <div class="stat-label">Intensität</div>
            <div class="stat-value">Moderat</div>
          </div>
        </div>
        <div class="exercises trx">
          ${exs.map((e, i) => `
            <div class="exercise-item">
              <div class="ex-num">${i + 1}</div>
              <div>
                <div class="ex-name">${e.name}</div>
                <div class="ex-desc">${e.desc}</div>
              </div>
            </div>`).join('')}
        </div>
        <p class="tip-box">💡 <strong>Tipp:</strong> Bei jeder Übung den Beckenboden aktivieren (leicht anspannen wie beim Niesen aufhalten). Besonders wichtig nach der Geburt!</p>
      </div>`;

  } else if (plan.blackrollDays.includes(d)) {
    const exs = plan.brSets[0];
    panel.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-icon blackroll" aria-hidden="true">⚪</div>
          <div>
            <div class="detail-title">Blackroll – ${DAYS_FULL[d]}</div>
            <div class="detail-subtitle">15 Minuten · Regeneration & Mobilität</div>
          </div>
        </div>
        <div class="stats-row">
          <div class="stat-chip">
            <div class="stat-label">Dauer</div>
            <div class="stat-value">15 Minuten</div>
          </div>
          <div class="stat-chip">
            <div class="stat-label">Intensität</div>
            <div class="stat-value">Sanft</div>
          </div>
          <div class="stat-chip">
            <div class="stat-label">Fokus</div>
            <div class="stat-value">Erholung</div>
          </div>
        </div>
        <div class="exercises blackroll">
          ${exs.map((e, i) => `
            <div class="exercise-item">
              <div class="ex-num">${i + 1}</div>
              <div>
                <div class="ex-name">${e.name}</div>
                <div class="ex-desc">${e.desc}</div>
              </div>
            </div>`).join('')}
        </div>
        <p class="tip-box">💡 <strong>Tipp:</strong> Schmerz auf der Rolle ist normal – bleib auf der Stelle bis er nachlässt. Trinke danach viel Wasser um Schlacken auszuspülen.</p>
      </div>`;

  } else {
    panel.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-icon rest" aria-hidden="true">😴</div>
          <div>
            <div class="detail-title">Ruhetag – ${DAYS_FULL[d]}</div>
            <div class="detail-subtitle">Regeneration ist genauso Training!</div>
          </div>
        </div>
        <div class="exercises rest">
          <div class="exercise-item">
            <div class="ex-num">✓</div>
            <div>
              <div class="ex-name">Kein Sport heute</div>
              <div class="ex-desc">Dein Körper baut in der Ruhephase Muskeln auf und repariert Gewebe. Vollständige Pause ist wichtig.</div>
            </div>
          </div>
          <div class="exercise-item">
            <div class="ex-num">💧</div>
            <div>
              <div class="ex-name">Gut trinken & schlafen</div>
              <div class="ex-desc">2–2,5 Liter Wasser. Schlaf ist mit Baby knapp – nutze jeden Moment für Erholung.</div>
            </div>
          </div>
          <div class="exercise-item">
            <div class="ex-num">🧘</div>
            <div>
              <div class="ex-name">Optional: 5 Min. Atemübung</div>
              <div class="ex-desc">Tiefe Bauchatmung zur Aktivierung des Zwerchfells – gut für Beckenboden und Entspannung.</div>
            </div>
          </div>
        </div>
        <p class="tip-box">💡 <strong>Tipp:</strong> Wenn du dich müde fühlst – kein Schuldgefühl! Ein Ruhetag mehr ist kein Rückschritt. Dein Körper nach der Geburt braucht Zeit.</p>
      </div>`;
  }
}

// ===== ACTIONS =====

function changeWeek(delta) {
  currentWeek = Math.max(1, Math.min(16, currentWeek + delta));
  render();
  // Scroll to top smoothly on week change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectDay(i) {
  selectedDay = i;
  render();
  // Scroll detail panel into view on mobile
  setTimeout(() => {
    const panel = document.getElementById('detail-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

// ===== INIT =====
window.changeWeek = changeWeek;

document.addEventListener('DOMContentLoaded', () => {
  render();
});
