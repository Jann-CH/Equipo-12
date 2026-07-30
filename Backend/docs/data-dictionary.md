# Diccionario de datos — Innova Mentor

Referencia para el equipo de Data Analytics. Todos los datos de usuario viven en
Firestore, en la colección `users`, un documento por usuario (`users/{uid}`).

## Colección `users/{uid}`

| Campo | Tipo | Descripción |
|---|---|---|
| `uid` | string | ID del usuario (igual al de Firebase Auth) |
| `name` | string | Nombre completo |
| `apodo` | string \| null | Apodo elegido en el registro |
| `fechaNacimiento` | string (YYYY-MM-DD) \| null | Fecha de nacimiento |
| `email` | string | Correo electrónico |
| `goal` | string \| null | Objetivo elegido en el onboarding (paso "Elegir Objetivo") |
| `challenge` | string \| null | Dificultad elegida en el onboarding (paso "Elegir Desafíos") |
| `time` | string \| null | Tiempo disponible elegido en el onboarding (paso "Elegir Tiempo") |
| `interests` | array\<string\> | Intereses elegidos en el onboarding (paso "Elegir Intereses") |
| `subjects` | array\<string\> | Materias configuradas desde el perfil |
| `streak` | number | Racha actual (días consecutivos) |
| `bestStreak` | number | Racha más larga alcanzada |
| `streakGoal` | number \| null | Meta de racha elegida (en días) |
| `hasSeenStreakWelcome` | boolean | Si ya vio el aviso de bienvenida de racha (control interno de UI) |
| `tasksCompleted` | number | Cantidad total de tareas completadas |
| `challengesCompleted` | number | Cantidad total de desafíos completados |
| `achievements` | number | Logros desbloqueados (reservado, aún no se usa activamente) |
| `reminderEnabled` | boolean | Si tiene activado el recordatorio diario |
| `reminderTime` | string (HH:MM) \| null | Hora configurada del recordatorio |
| `loginCount` | number | Cantidad de veces que abrió la app (se suma en cada `GET /api/users/me`) |
| `lastLoginAt` | Timestamp \| null | Última vez que abrió la app |
| `totalTimeSpentSeconds` | number | Tiempo total acumulado usando la app (segundos) |
| `weeklyTimeSpent` | `{ weekStart, days: { "YYYY-MM-DD": segundos } }` \| null | Tiempo de uso desglosado por día, de la semana actual (lunes a domingo). Se reinicia al cambiar de semana. |
| `weekActivity` | `{ weekStart, days: { "YYYY-MM-DD": true } }` \| null | Qué días de esta semana tuvo actividad (para el calendario de racha) |
| `lastActiveDate` | string (YYYY-MM-DD) \| null | Última fecha con actividad registrada (para calcular la racha) |
| `createdAt` | Timestamp | Fecha de registro |
| `updatedAt` | Timestamp | Última modificación del documento |

## Subcolección `users/{uid}/tasks/{taskId}`

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | string | Título de la tarea |
| `notes` | string \| null | Notas opcionales |
| `dueDate` | string (YYYY-MM-DD) \| null | Fecha límite opcional |
| `completed` | boolean | Si está completada |
| `createdAt` | Timestamp | Fecha de creación |
| `completedAt` | Timestamp \| null | Fecha de finalización |

## Subcolección `users/{uid}/content/{contentId}`

Contenido en audio del usuario (PDFs convertidos a voz).

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | string | Nombre del archivo original |
| `type` | "audio" \| "tts" | "tts" = texto convertido a voz (PDF) |
| `text` | string \| null | Texto extraído del PDF (si aplica) |
| `createdAt` | Timestamp | Fecha de creación |

## ⚠️ Lo que TODAVÍA no medimos (gap conocido)

- **Tiempo real de uso por sesión individual** (cuánto duró cada visita puntual). Sí medimos tiempo total acumulado y desglosado por día (`totalTimeSpentSeconds`, `weeklyTimeSpent`), pero no la duración de cada sesión particular. Para eso haría falta trackear inicio/fin de cada visita por separado.
- El histórico de `weeklyTimeSpent` y `weekActivity` solo guarda **la semana actual** — al cambiar de semana se resetea. Si se necesita el histórico completo semana a semana, habría que guardar cada semana como un documento separado en vez de sobreescribir.

## Cómo acceder a los datos

- **Acceso online, siempre actualizado (recomendado)**: `GET /api/admin/export/users?format=json` (o `csv`), protegido con una clave (`ADMIN_EXPORT_KEY` en `Backend/.env`). Se puede abrir directo en el navegador o consumir desde Python/Excel/Sheets — ver detalle en `Backend/README.md`.
- **Exportar a JSON/CSV como archivo puntual**:
  desde la carpeta `Backend`, con el `.env` ya configurado, correr:
  ```bash
  npm run export-data
  ```
  Esto genera `Backend/exports/users.json`, `users.csv`, `tasks.json`,
  `tasks.csv`, `content.json` y `content.csv` — listos para mandarle al
  equipo de Data Analytics. (Esa carpeta está en `.gitignore` a propósito,
  para no subir datos de usuarios reales a GitHub sin querer.)
- **Firebase Console** → Firestore Database → navegar la colección `users`.
- **Exportar a BigQuery**: Firebase permite configurar una extensión oficial
  ("Export Collections to BigQuery") para que Data Analytics pueda correr SQL
  sobre estos datos sin tocar producción.
- Alternativamente, se puede armar un endpoint propio de agregación en el
  Backend (ej. `GET /api/admin/analytics`) si prefieren consumir una API en
  vez de acceder directo a Firestore/BigQuery — avisen si lo necesitan y lo
  armamos.
