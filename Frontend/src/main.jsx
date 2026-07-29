
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { TasksProvider } from "./contexts/TasksContext";
import { ContentProvider } from "./contexts/ContentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>

      <UserProvider>

        <TasksProvider>

          <ContentProvider>

            <App />

          </ContentProvider>

        </TasksProvider>

      </UserProvider>

    </AuthProvider>

  </StrictMode>
);
