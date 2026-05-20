# Mein Weg zur 10 km – Laufapp

Persönlicher 16-Wochen-Laufplan nach der Geburt mit TRX & Blackroll.

## Dateien

```
laufapp/
├── index.html      ← Haupt-HTML
├── style.css       ← Styling (Dark Mode inklusive)
├── app.js          ← Gesamte App-Logik
├── manifest.json   ← PWA-Manifest (App auf Homescreen speicherbar)
├── netlify.toml    ← Netlify-Konfiguration
└── README.md       ← Diese Datei
```

## Auf Netlify hosten (kostenlos)

### Option A – Drag & Drop (einfachste Methode)

1. Gehe zu [netlify.com](https://netlify.com) und erstelle ein kostenloses Konto
2. Klicke auf **"Add new site" → "Deploy manually"**
3. Ziehe den gesamten `laufapp`-Ordner in das Upload-Feld
4. Fertig – deine App ist live! 🎉

### Option B – über GitHub

1. Erstelle ein neues Repository auf GitHub
2. Lade alle Dateien hoch
3. Gehe zu Netlify → "Add new site" → "Import an existing project"
4. GitHub verbinden, Repository auswählen
5. Build-Einstellungen leer lassen (kein Build-Prozess nötig)
6. **"Deploy site"** klicken

## Features

- 📅 16-Wochen-Plan (4 Phasen)
- 🏃 3× pro Woche laufen (Mo / Mi / Fr)
- 💪 2× pro Woche TRX (Di / Do) – 15 Minuten
- ⚪ 1× Blackroll (Sa) – Regeneration
- 😴 Sonntag Ruhetag
- 📊 Pace & Pulsangaben je Phase
- 🌙 Dark Mode automatisch
- 📱 Mobiloptimiert

## Anpassen

Die Lauftage, TRX-Übungen und Blackroll-Einheiten können direkt in `app.js` angepasst werden:

- `TRX_POOL` – Array mit allen TRX-Übungen
- `BLACKROLL_POOL` – Array mit allen Blackroll-Übungen  
- `getWeekPlan(w)` – Funktion für Pace, Puls & Distanz je Woche
