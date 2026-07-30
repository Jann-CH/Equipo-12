
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

import { getUserProfile, createUserProfile, checkInStreak } from "../api/authApi";

const UserContext = createContext();

const initialProfile = {

  uid: "",

  name: "",

  email: "",

  goal: null,

  time: null,

  interests: [],

  streak: 0,

  weeklyProgress: 0,

};

export function UserProvider({ children }) {

  const { currentUser } = useAuth();

  const [userProfile, setUserProfile] = useState(initialProfile);

  const [loading, setLoading] = useState(true);

  async function loadUserProfile() {

    if (!currentUser) {

      setUserProfile(initialProfile);

      setLoading(false);

      return;

    }

    try {

      const profile = await getUserProfile();

      if (profile) {

        setUserProfile(profile);

      }

      // Registra la racha real de HOY (el Backend decide si suma, resetea o
      // no hace nada porque ya se registró hoy). Se hace después de tener
      // el perfil para no bloquear el primer render.
      try {
        const updatedProfile = await checkInStreak();
        if (updatedProfile) {
          setUserProfile(updatedProfile);
        }
      } catch (streakError) {
        console.error("⚠️ No se pudo registrar la racha de hoy:", streakError);
      }

    } catch (error) {

      // Antes de asumir que el perfil realmente no existe, esperamos un
      // toque y reintentamos: si esto pasó durante un registro recién
      // hecho, el POST real (con los datos verdaderos) puede estar
      // terminando de guardarse justo en este momento. Reintentar evita
      // pisarlo con datos de relleno por una carrera de tiempos.
      if (error.status === 404) {

        console.warn("⚠️ Perfil no encontrado, reintentando antes de asumir que hay que repararlo...");

        let profile = null;

        for (let attempt = 0; attempt < 2 && !profile; attempt++) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          try {
            profile = await getUserProfile();
          } catch (retryError) {
            if (retryError.status !== 404) {
              console.error("Error loading user profile:", retryError);
              break;
            }
          }
        }

        if (profile) {

          setUserProfile(profile);

        } else {

          // Recién ahora, después de reintentar, asumimos que la cuenta
          // está realmente rota (existe en Firebase Auth pero nunca se
          // creó su perfil en Firestore) y la reparamos con datos mínimos.
          console.warn("⚠️ Perfil no encontrado en Firestore tras reintentar, creando uno de respaldo...");

          try {

            const repaired = await createUserProfile({
              name: currentUser.displayName || currentUser.email?.split("@")[0] || "Usuario",
              apodo: null,
              fechaNacimiento: null,
            });

            setUserProfile(repaired);

          } catch (repairError) {
            console.error("⚠️ No se pudo crear el perfil de respaldo:", repairError);
          }

        }

      } else {

        console.error(
          "Error loading user profile:",
          error
        );

      }

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadUserProfile();

  }, [currentUser]);

  // Vuelve a pedirle el perfil al Backend (por ej. después de guardar el
  // onboarding o de confirmar una meta de racha), para no depender solo
  // del estado local en memoria.
  async function refreshProfile() {
    await loadUserProfile();
  }

  function updateProfile(field, value) {

    setUserProfile((prev) => ({

      ...prev,

      [field]: value,

    }));

  }

  function resetProfile() {

    setUserProfile(initialProfile);

  }

  return (

    <UserContext.Provider

      value={{

        userProfile,

        updateProfile,

        resetProfile,

        refreshProfile,

        loading,

      }}

    >

      {children}

    </UserContext.Provider>

  );

}

export function useUser() {

  return useContext(UserContext);

}
