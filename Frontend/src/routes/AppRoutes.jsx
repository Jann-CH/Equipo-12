import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { OnboardingLayout } from "../layouts/OnboardingLayout";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

import Mentor from "../pages/Mentor/Mentor";
import Goals from "../pages/Goals/Goals";
import Challenges from "../pages/Challenges/Challenges";
import Reto from "../pages/Challenges/Retos";
import Time from "../pages/Time/Time";
import Interests from "../pages/Interests/Interests";
import Ready from "../pages/Ready/Ready";
import Timer from "../pages/Timer/Timer";

import Dashboard from "../pages/Dashboard/Dashboard";
import Content from "../pages/Content/Content";
import { Profile } from "../pages/Profile/Profile";
import Racha from "../pages/Racha/Racha";
import SeleccionMetaRacha from "../pages/Racha/SeleccionMetaRacha";
import ProgresoGeneral from "../pages/Progress/ProgresoGeneral";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/registro" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/recuperar-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* Onboarding inicial (solo la primera vez, después de registrarse): SIN navbar */}
        <Route element={<ProtectedRoute><OnboardingLayout /></ProtectedRoute>}>

          <Route path="/mentor" element={<Mentor />} />
          <Route path="/objetivos" element={<Goals />} />
          <Route path="/desafios" element={<Challenges />} />
          <Route path="/tiempo" element={<Time />} />
          <Route path="/intereses" element={<Interests />} />
          <Route path="/listo" element={<Ready />} />
          <Route path="/temporizador" element={<Timer />} />

        </Route>

        {/* App principal (login entra directo acá): CON navbar */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>

          <Route path="/mi-recorrido" element={<Dashboard />} />
          <Route path="/contenido" element={<Content />} />
          <Route path="/dashboard" element={<ProgresoGeneral />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/reto" element={<Reto desafios={5} />} />
          <Route path="/racha" element={<Racha />} />
          <Route path="/configurar-meta" element={<SeleccionMetaRacha />} />
          <Route path="/progreso" element={<ProgresoGeneral />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
