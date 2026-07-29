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
