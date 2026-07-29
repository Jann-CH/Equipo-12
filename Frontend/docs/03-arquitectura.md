# 🏗️ Arquitectura del Proyecto

> *"Una buena arquitectura permite crecer sin perder el rumbo."*

---

# Innova Mentor

**Última actualización:** Junio de 2026

## Objetivo del documento

Este documento describe la arquitectura actual de **Innova Mentor**, explicando cómo está organizado el proyecto, las tecnologías utilizadas y la función de cada uno de sus componentes principales.

Su propósito es facilitar el mantenimiento del código, favorecer el trabajo colaborativo y servir como guía para futuras ampliaciones del sistema.

---

# 1. Introducción

Innova Mentor ha sido desarrollado siguiendo una arquitectura modular, con el objetivo de facilitar el crecimiento del proyecto a medida que se incorporen nuevas funcionalidades.

Desde las primeras etapas del desarrollo se decidió organizar el código por responsabilidades, evitando concentrar toda la lógica en un único archivo.

Aunque actualmente el proyecto corresponde a un Producto Mínimo Viable (MVP), su estructura ya está preparada para evolucionar hacia una aplicación de mayor complejidad.

---

# 2. Tecnologías principales

Actualmente el proyecto utiliza las siguientes tecnologías:

| Tecnología                   | Propósito                               |
| ---------------------------- | --------------------------------------- |
| React                        | Desarrollo de la interfaz de usuario.   |
| Vite                         | Entorno de desarrollo y compilación.    |
| JavaScript (ES6+)            | Lenguaje principal del proyecto.        |
| HTML5                        | Estructura base de la aplicación.       |
| CSS (estilos en componentes) | Presentación visual.                    |
| Vite PWA Plugin              | Conversión de la aplicación en una PWA. |
| Git                          | Control de versiones.                   |
| GitHub                       | Repositorio del proyecto.               |
| Vercel                       | Despliegue continuo de la aplicación.   |

En futuras versiones se incorporarán tecnologías como Firebase, Firestore y otros servicios necesarios para ampliar las funcionalidades del sistema.

---

# 3. Arquitectura general

Actualmente el proyecto sigue una arquitectura basada en componentes.

Cada responsabilidad se encuentra organizada en una carpeta específica, facilitando el mantenimiento y la escalabilidad del código.

La estructura general es la siguiente:

```text
Innova Mentor
│
├── docs/
├── public/
├── src/
├── package.json
├── vite.config.js
└── README.md
```

---

# 4. Carpeta `docs`

Contiene toda la documentación técnica y funcional del proyecto.

Su objetivo es mantener organizada la información relacionada con:

* Visión del proyecto.
* Identidad visual.
* Arquitectura.
* Backlog.
* Historial de versiones.
* Decisiones técnicas.
* Guías de usuario.
* Diario de desarrollo.

---

# 5. Carpeta `public`

Almacena los recursos estáticos utilizados por la aplicación.

Entre ellos:

* Branding.
* Iconos.
* Imágenes.
* Archivos utilizados por la PWA.

Estos recursos pueden ser utilizados directamente desde cualquier componente de React.

---

# 6. Carpeta `src`

Constituye el núcleo del proyecto.

Aquí se encuentra toda la lógica de la aplicación.

Actualmente incluye una estructura preparada para el crecimiento del proyecto mediante carpetas especializadas como:

* components
* pages
* hooks
* services
* api
* config
* routes
* store
* utils

Aunque algunas de estas carpetas aún no contienen funcionalidades completas, fueron creadas desde el inicio para mantener una organización consistente a medida que el proyecto evolucione.

---

# 7. Componentes

La interfaz de usuario se desarrollará utilizando componentes reutilizables.

Este enfoque permitirá:

* Reducir la duplicación de código.
* Facilitar el mantenimiento.
* Mejorar la legibilidad.
* Favorecer la reutilización entre distintas pantallas.

En futuras versiones se separarán elementos como:

* Header.
* Botones.
* Tarjetas.
* Avatar de Nova.
* Navegación.
* Formularios.

---

# 8. Gestión de recursos

Todos los elementos gráficos del proyecto se encuentran organizados de acuerdo con su función.

Entre ellos:

* Banner principal.
* Logos.
* Avatar de Nova.
* Iconos de la PWA.
* Imágenes utilizadas por la aplicación.

Esta organización facilita el mantenimiento de la identidad visual y evita la duplicación de archivos.

---

# 9. Arquitectura prevista

La arquitectura actual constituye únicamente la primera etapa del proyecto.

En futuras versiones se incorporarán nuevos módulos, entre ellos:

* Firebase Authentication.
* Cloud Firestore.
* Gestión del progreso del usuario.
* Integración con APIs externas.
* Sistema de desafíos.
* Perfil del usuario.
* Mentor inteligente.
* Notificaciones.

La estructura existente permitirá incorporar estas funcionalidades sin necesidad de reorganizar completamente el proyecto.

---

# 10. Principios de desarrollo

Durante el desarrollo de Innova Mentor se seguirán los siguientes principios:

* Código limpio.
* Componentes reutilizables.
* Documentación actualizada.
* Escalabilidad.
* Simplicidad.
* Mantenibilidad.
* Consistencia visual.
* Buenas prácticas de desarrollo.

---

# 11. Flujo general de trabajo

Cada nueva funcionalidad seguirá el siguiente proceso:

1. Definición de la necesidad.
2. Registro en el Backlog.
3. Documentación de la decisión técnica.
4. Desarrollo de la funcionalidad.
5. Pruebas.
6. Actualización de la documentación.
7. Commit en Git.
8. Publicación del cambio.

Este flujo busca mantener sincronizados el desarrollo y la documentación del proyecto.

---

# 12. Evolución de la arquitectura

La arquitectura de Innova Mentor evolucionará de forma gradual.

Cada nueva funcionalidad deberá integrarse respetando la organización existente, evitando la generación de código duplicado y manteniendo la estructura modular del proyecto.

Las decisiones arquitectónicas serán registradas en el documento **06 - Decisiones Técnicas**, permitiendo comprender el motivo de cada cambio realizado.

---

# Conclusión

La arquitectura de Innova Mentor ha sido diseñada pensando en el crecimiento progresivo del proyecto.

Aunque actualmente corresponde a un MVP, la organización adoptada permitirá incorporar nuevas funcionalidades de manera ordenada, favoreciendo el trabajo colaborativo y reduciendo la complejidad del mantenimiento.

La combinación de una estructura modular, documentación constante y buenas prácticas de desarrollo constituye uno de los pilares fundamentales para la evolución del proyecto.
