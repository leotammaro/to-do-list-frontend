import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const loginWithService = ({ service, email, password }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  if (service === "gmail") {
    signInWithPopup(auth, provider)
      .then((result) => {
        return result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return signInWithEmailAndPassword(auth, email, password);
  }
};

export const registerService = ({ service, password }) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, service, password);
};
