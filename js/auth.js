// =========================================================
// AUTH — funzioni condivise di autenticazione
// Usato sia da login.html che da tutte le pagine admin future
// per verificare che l'utente sia autenticato.
// =========================================================

import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Traduce i codici di errore di Firebase in messaggi comprensibili
export function messaggioErrore(codiceErrore) {
  const messaggi = {
    "auth/invalid-email": "L'indirizzo email non è valido.",
    "auth/invalid-credential": "Email o password non corretti.",
    "auth/wrong-password": "Email o password non corretti.",
    "auth/user-not-found": "Email o password non corretti.",
    "auth/too-many-requests": "Troppi tentativi. Riprova tra qualche minuto.",
  };
  return messaggi[codiceErrore] || "Si è verificato un errore. Riprova.";
}

// Protegge una pagina admin: se non c'è un utente loggato,
// rimanda automaticamente al login.
export function proteggiPagina() {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        window.location.href = "login.html";
      } else {
        resolve(user);
      }
    });
  });
}
