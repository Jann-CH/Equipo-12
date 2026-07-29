
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import { onAuthStateChanged } from "firebase/auth";

// import {
//   auth,
//   signUp,
//   signIn,
//   signOutUser,
//   resetPassword,
// } from "../services/firebase/authService";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {

//   const [currentUser, setCurrentUser] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user) => {

//         setCurrentUser(user);

//         setLoading(false);

//       }
//     );

//     return unsubscribe;

//   }, []);

//   const value = {

//     currentUser,

//     signUp,

//     signIn,

//     signOut: signOutUser,

//     resetPassword,

//     isAuthenticated: !!currentUser,

//   };

//   return (

//     <AuthContext.Provider value={value}>

//       {!loading && children}

//     </AuthContext.Provider>

//   );

// }

// export function useAuth() {

//   return useContext(AuthContext);

// }


import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import {
  auth,
  signUp,
  signIn,
  signOutUser,
  resetPassword,
} from "../services/firebase/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let unsubscribe = () => {};

    try {

      unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          setCurrentUser(user);
          setLoading(false);
        },
        (error) => {
          console.error(
            "⚠️ Error de Firebase Auth. Revisá tu archivo Frontend/.env:",
            error
          );
          setLoading(false);
        }
      );

    } catch (error) {

      console.error(
        "⚠️ No se pudo inicializar Firebase Auth. Revisá tu archivo Frontend/.env:",
        error
      );

      setLoading(false);

    }

    return unsubscribe;

  }, []);

  async function handleSignUp(email, password) {
  const credential = await signUp(email, password);
  setCurrentUser(credential.user);
  return credential;
}

async function handleSignIn(email, password) {
  const credential = await signIn(email, password);
  setCurrentUser(credential.user);
  return credential;
}

const value = {
  currentUser,
  signUp: handleSignUp,   // ← ahora usa la función nueva
  signIn: handleSignIn,   // ← ahora usa la función nueva
  signOut: signOutUser,
  resetPassword,
  isAuthenticated: !!currentUser,
};
  return (

    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}