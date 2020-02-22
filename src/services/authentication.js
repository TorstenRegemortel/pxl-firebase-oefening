import { auth } from './firebase';

export const signInUser = async (email, password) => {
  // oefening 1.2 log de gebruiker in.
};

export const signInAnonimously = async () => {
  // oefening 1.3 log de gebruiker anoniem in.
};

export const registerUser = async (email, password) => {
  // oefening 1.1 registreer de gebruiker met email en wachtwoord.
};

export const signOut = () => auth.signOut();

export const onAuthStateChanged = cb => auth.onAuthStateChanged(cb);
