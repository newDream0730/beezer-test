import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {auth} from "../config/firebase";

export async function login(email: string, password: string) {
  const auth = getAuth();
  const response = await setPersistence(auth, browserLocalPersistence).then(
    async () => {
      return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user;
        })
        .catch((error) => {
          return error;
        });
    }
  );
  return response;
}

export async function register(email: string, password: string) {
  const auth = getAuth();
  const response = await setPersistence(auth, browserLocalPersistence).then(
    async () => {
      return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user;
        })
        .catch((error) => {
          return error;
        });
    }
  );
  return response;
}

export async function resetPassword(email: string) {
  const response = await sendPasswordResetEmail(auth, email)
    .then(() => {
      return {status: 200, message: "Success"};
    })
    .catch((error) => {
      return {status: error.errorCode, message: error.errorMessage};
    });
  return response;
}

export async function logout() {
  const response = await signOut(auth)
    .then(() => {
      return {status: 200, message: "Logged out"};
    })
    .catch((error) => {
      return {status: error.code, message: error.errorMessage};
    });
  return response;
}
