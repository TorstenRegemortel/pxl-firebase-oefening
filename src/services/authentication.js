import { auth } from './firebase';

export const signInUser = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    return err.code;
  }
};

export const signInAnonimously = async () => {
  try {
    const user = await auth.signInAnonymously();
    return user;
  } catch (err) {
    return err.code;
  }
};

export const registerUser = async (email, password) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    return err.code;
  }
};

export const signOut = () => auth.signOut();

export const onAuthStateChanged = cb => auth.onAuthStateChanged(cb);
