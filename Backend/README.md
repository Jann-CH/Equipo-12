# Backend — Innova Mentor

API en Node.js + Express que centraliza **Firestore** (vía Firebase Admin SDK)
y la lógica del mentor. Firebase Auth se queda en el Frontend (es requisito
de Firebase que el login corra en el cliente), pero una vez logueado, el
Frontend manda el **ID token** en cada request y este Backend lo valida.

## Setup

1. `cp .env.example .env`
2. Andá a Firebase Console → Project Settings → Service Accounts → **Generate new private key**. Descarga el JSON.
3. Completá `.env` con esos datos:
   - `FIREBASE_PROJECT_ID` → `project_id`
   - `FIREBASE_CLIENT_EMAIL` → `client_email`
   - `FIREBASE_PRIVATE_KEY` → `private_key` (dejalo entre comillas, con los `\n` tal cual vienen en el JSON)
4. `npm install`
5. `npm run dev` (arranca en `http://localhost:4000`)

## Endpoints

Todos (excepto `/health`) requieren header `Authorization: Bearer <idToken>`.

| Método | Ruta                     | Qué hace                                   |
|--------|--------------------------|---------------------------------------------|
| GET    | `/api/health`            | Chequeo de vida, sin auth                   |
| POST   | `/api/users`              | Crea el perfil del usuario en Firestore     |
| GET    | `/api/users/me`           | Devuelve el perfil del usuario logueado     |
| PATCH  | `/api/users/me/subjects`  | Actualiza las materias del perfil           |
| GET    | `/api/mentor/greeting`    | Saludo inicial de Nova                      |
| POST   | `/api/mentor/message`     | Envía un mensaje y devuelve la respuesta    |

### Exportación de datos para Data Analytics

Estos NO usan el token de usuario — usan una clave propia (`ADMIN_EXPORT_KEY`
en `Backend/.env`), pensada para compartir con el equipo de Data Analytics.
Siempre devuelven los datos actuales de Firestore (no un backup viejo).

| Método | Ruta                              | Qué hace                                    |
|--------|-------------------------------------|----------------------------------------------|
| GET    | `/api/admin/export/users?format=json\|csv`   | Perfiles de todos los usuarios       |
| GET    | `/api/admin/export/tasks?format=json\|csv`   | Todas las tareas de todos los usuarios |
| GET    | `/api/admin/export/content?format=json\|csv` | Todo el contenido de audio/PDF       |
| GET    | `/api/admin/export/all`                      | Las 3 colecciones juntas (solo JSON) |

**Cómo se llaman:** pasando la clave por header `x-admin-key: TU_CLAVE` o por
query param `?key=TU_CLAVE`. Ejemplo, para pegar directo en el navegador:
```
https://tu-backend.onrender.com/api/admin/export/users?format=csv&key=TU_CLAVE
```
El equipo de Data Analytics puede simplemente abrir esa URL en el navegador
(descarga el CSV directo), o consumirla desde Python/Excel/Google Sheets:
- Python: `pandas.read_json(url)` o `pandas.read_csv(url)`
- Google Sheets: `=IMPORTDATA("url")` (con el formato CSV)

⚠️ Esta clave da acceso a datos personales de usuarios (nombre, email, etc.).
Compartila solo con quien la necesite, y si alguna vez se filtra, cambiala en
`Backend/.env` (y en el Render de producción) de inmediato.

## Estructura

```
src/
├── config/firebaseAdmin.js   # init del Admin SDK (auth + firestore)
├── middleware/authMiddleware.js  # valida el ID token del Frontend
├── services/                 # lógica de negocio (Firestore, mentor)
├── controllers/               # arman la respuesta HTTP
├── routes/                    # define los endpoints
├── app.js                     # arma la app de Express
└── server.js                  # arranca el servidor
```

## Pendiente / próximos pasos

- `mentorService.js` responde con mocks — reemplazar por una llamada real a un LLM (OpenAI, Gemini, etc.) cuando tengan la API key.
- `Frontend/src/api/challengeApi.js` y `youtubeApi.js` siguen vacíos — falta decidir si esa lógica también se centraliza acá (recomendado si van a esconder API keys de YouTube o de generación de retos con IA).
- No hay tests todavía.
