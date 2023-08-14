import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmNKg6cvkLgoHwI6VfPV2eo9-g9t_Ll4I",
  authDomain: "lista-de-contatos-12fdd.firebaseapp.com",
  projectId: "lista-de-contatos-12fdd",
  storageBucket: "lista-de-contatos-12fdd.appspot.com",
  messagingSenderId: "85367858173",
  appId: "1:85367858173:web:01590768b57e589db32f94",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
