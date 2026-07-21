# Torneo di Bocce — Pratieghi

App gratuita per gestire il torneo di bocce di Pratieghi: sorteggio,
tabellone, pagina pubblica, archivio storico e Hall of Fame.

## Stato del progetto

- Fase 1 (Fondamenta) OK
- Fase 2 (Autenticazione admin) OK — in corso di verifica
- Fase 3 (Gestione partecipanti) — prossima

## Struttura del database (Firestore)

tornei (collection)
  {anno}  es. "2026"  (document)
    - impostazioni: { dimensioneTabellone, bloccato, dataCreazione }
    - partecipanti (sub-collection): { nome, genere: "uomo"|"donna" }
    - coppie (sub-collection): { numero, uomo, donna }
    - incontri (sub-collection): { turno, posizione, coppiaA, coppiaB, vincitore }
    - vincitori: { uomo, donna, coppiaId }

alboOro (collection) — riepilogo per la Hall of Fame
  {anno}: { coppia, uomo, donna }

Ogni edizione (tornei/2026, tornei/2027, ...) e' completamente
indipendente: cancellare o modificare un anno non tocca gli altri.

## Struttura dei file

- index.html — Pagina pubblica
- admin/login.html — Login amministratore
- admin/dashboard.html — Dashboard admin (provvisoria)
- admin/js/login.js
- admin/js/dashboard.js
- css/style.css — Design system
- js/firebase-config.js — Configurazione Firebase
- js/auth.js — Funzioni condivise di autenticazione
- js/dati-demo.js — Dati di esempio (verranno sostituiti da Firestore)
- js/pagina-pubblica.js — Logica di rendering della pagina pubblica
- README.md

## Pubblicazione su GitHub Pages

Settings → Pages → Deploy da branch main, cartella /root.
Il link pubblico sara' https://tuonome.github.io/Torneo-Pratieghi/
