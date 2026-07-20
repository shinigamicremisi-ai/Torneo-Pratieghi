// =========================================================
// PAGINA PUBBLICA — logica di rendering
// Oggi legge da dati-demo.js. Nella Fase "Archivio storico"
// questo file verrà collegato a Firestore (stessa forma dati).
// =========================================================

import { ottieniEdizioneDemo, elencoAnniDisponibili } from "./dati-demo.js";

const selettore = document.getElementById("selettore-anno");
const badgeEdizione = document.getElementById("badge-edizione");

function renderPartecipanti(edizione) {
  const cUomini = document.getElementById("lista-uomini");
  const cDonne = document.getElementById("lista-donne");
  cUomini.innerHTML = edizione.partecipanti.uomini
    .map(n => `<li>${n}</li>`).join("");
  cDonne.innerHTML = edizione.partecipanti.donne
    .map(n => `<li>${n}</li>`).join("");
}

function renderCoppie(edizione) {
  const cont = document.getElementById("griglia-coppie");
  cont.innerHTML = edizione.coppie.map(c => `
    <div class="coppia-card">
      <span class="numero">${String(c.numero).padStart(2, "0")}</span>
      <span class="nomi">${c.uomo} — ${c.donna}</span>
    </div>
  `).join("");
}

function renderTabellone(edizione) {
  const cont = document.getElementById("tabellone");
  cont.innerHTML = edizione.turni.map(turno => `
    <div class="turno">
      <div class="turno-titolo">${turno.titolo}</div>
      ${turno.match.map(m => renderMatch(m)).join("")}
    </div>
  `).join("");
}

function renderMatch(m) {
  const bClasse = c => {
    if (!c) return "bye";
    return "";
  };
  const vinceA = m.vincitore === "a" ? "vincitore" : "";
  const vinceB = m.vincitore === "b" ? "vincitore" : "";
  const testoB = m.b ? m.b : "BYE";
  return `
    <div class="match">
      <div class="contendente ${vinceA}">${m.a || "—"}</div>
      <div class="contendente ${vinceB} ${bClasse(m.b)}">${testoB}</div>
    </div>
  `;
}

function renderCampioni(edizione) {
  const blocco = document.getElementById("blocco-campioni");
  if (edizione.campioni) {
    blocco.innerHTML = `
      <div class="trofeo-label">Campioni ${edizione.anno}</div>
      <p class="nomi-campioni">${edizione.campioni.uomo} &amp; ${edizione.campioni.donna}</p>
    `;
  } else {
    blocco.innerHTML = `
      <div class="trofeo-label">Torneo in corso</div>
      <p class="nomi-campioni">Il campione si scoprirà in campo 🎯</p>
    `;
  }
}

function renderEdizione(anno) {
  const edizione = ottieniEdizioneDemo(anno);
  if (!edizione) return;

  badgeEdizione.textContent = `Edizione ${edizione.anno}`;
  renderPartecipanti(edizione);
  renderCoppie(edizione);
  renderTabellone(edizione);
  renderCampioni(edizione);
}

function popolaSelettore() {
  const anni = elencoAnniDisponibili();
  selettore.innerHTML = anni
    .sort((a, b) => b - a)
    .map(a => `<option value="${a}">${a}</option>`)
    .join("");
  selettore.addEventListener("change", e => renderEdizione(Number(e.target.value)));
}

popolaSelettore();
renderEdizione(elencoAnniDisponibili().sort((a, b) => b - a)[0]);
