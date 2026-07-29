
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

      // Auto-reparo: si el usuario existe en Firebase Auth pero NO tiene
      // documento en Firestore (esto podía pasar antes si el registro
      // fallaba a mitad de camino por un cold-start de Render), se lo
      // creamos ahora con lo que tengamos disponible, en vez de dejarlo
      // con una cuenta "rota" para siempre.
      if (error.status === 404) {

        console.warn("⚠️ Perfil no encontrado en Firestore, creando uno de respaldo...");

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
