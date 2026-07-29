import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";

import { useContentLibrary } from "../../contexts/ContentContext";
import { AudioPlayer } from "./AudioPlayer";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n\n";
  }

  return fullText.trim();
}

export function PdfToAudioUploader() {

  const { items, addTextToSpeech } = useContentLibrary();
  const inputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const pdfAudios = items.filter((item) => item.type === "tts");

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");

    if (file.type !== "application/pdf") {
      setError("Solo se aceptan archivos PDF.");
      event.target.value = "";
      return;
    }

    setProcessing(true);

    try {
      const text = await extractTextFromPdf(file);

      if (!text) {
        setError("No pudimos extraer texto de este PDF (¿es un PDF escaneado/imagen?).");
        return;
      }

      await addTextToSpeech(file.name, text);
    } catch (err) {
      console.error("⚠️ Error procesando el PDF:", err);
      setError("No se pudo procesar el PDF. Intentá con otro archivo.");
    } finally {
      setProcessing(false);
      event.target.value = "";
    }
  }

  return (
    <section className="info-card">
      <div className="card-header">
        <h3>🎧 Escuchá tus apuntes</h3>
      </div>

      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>
        Subí un PDF y Nova te lo lee en voz alta. Podés pausar, adelantar y retroceder.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={processing}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          background: "#4F46E5",
          color: "white",
          padding: "8px 16px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          opacity: processing ? 0.6 : 1,
        }}
      >
        <Upload size={14} />
        {processing ? "Procesando PDF..." : "Subir PDF"}
      </button>

      {error && <p style={{ fontSize: 12, color: "#e53935", marginTop: 8 }}>{error}</p>}

      {pdfAudios.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          {pdfAudios.map((item) => (
            <div key={item.id} style={{ background: "#F9FAFB", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <FileText size={14} color="#4F46E5" />
                <span style={{ fontSize: 13, color: "#374151" }}>{item.name}</span>
              </div>
              <AudioPlayer item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
