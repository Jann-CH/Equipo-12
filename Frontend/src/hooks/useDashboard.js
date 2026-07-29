
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

export default function useDashboard() {

  const navigate = useNavigate();

  const {
    currentUser,
    signOut,
  } = useAuth();

  const {
    userProfile,
    loading,
  } = useUser();

  async function handleLogout() {

    try {

      await signOut();

      navigate("/login");

    } catch (error) {

      console.error(error);

    }

  }

  return {

    currentUser,

    userProfile,

    loading,

    handleLogout,

  };

}