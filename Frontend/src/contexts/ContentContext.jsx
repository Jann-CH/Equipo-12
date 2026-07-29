import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { getContent, createContent } from "../api/contentApi";

const ContentContext = createContext();

export function ContentProvider({ children }) {

  const { currentUser } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!currentUser) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    getContent()
      .then(setItems)
      .catch((error) => console.error("⚠️ Error cargando contenido:", error))
      .finally(() => setLoading(false));

  }, [currentUser]);

  // objectUrl solo vive en esta sesión del navegador (no se persiste el archivo real,
  // ver nota en AudioUploader sobre Firebase Storage como siguiente paso)
  async function addAudioFile(name, objectUrl) {
    const saved = await createContent({ name, type: "audio" });
    setItems((prev) => [{ ...saved, objectUrl }, ...prev]);
  }

  async function addTextToSpeech(name, text) {
    const saved = await createContent({ name, type: "tts", text });
    setItems((prev) => [saved, ...prev]);
  }

  return (
    <ContentContext.Provider
      value={{
        items,
        loading,
        addAudioFile,
        addTextToSpeech,
      }}
    >
      {children}
    </ContentContext.Provider>
  );

}

export function useContentLibrary() {
  return useContext(ContentContext);
}
