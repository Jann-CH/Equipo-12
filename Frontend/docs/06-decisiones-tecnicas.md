# ⚙️ Decisiones Técnicas

> *"Cada decisión técnica de hoy define la facilidad con la que podremos crecer mañana."*

---

# Innova Mentor

**Última actualización:** Junio de 2026

## Objetivo del documento

Este documento registra las principales decisiones técnicas adoptadas durante el desarrollo de **Innova Mentor**.

Su propósito es explicar el motivo de cada decisión importante, facilitando el mantenimiento del proyecto y permitiendo que cualquier integrante del equipo comprenda el razonamiento detrás de la arquitectura y las tecnologías utilizadas.

Cada nueva decisión relevante deberá documentarse en este archivo.

---

# Decisión 1

## Utilizar React como biblioteca principal

### Decisión

Desarrollar el frontend utilizando React.

### Justificación

React permite construir interfaces modernas mediante componentes reutilizables, facilitando el mantenimiento del código y el crecimiento del proyecto.

Además, React cuenta con una amplia comunidad, abundante documentación y es una de las tecnologías más utilizadas en el desarrollo de aplicaciones web.

### Estado

✅ Implementada.

---

# Decisión 2

## Utilizar Vite como entorno de desarrollo

### Decisión

Utilizar Vite como herramienta de desarrollo y compilación.

### Justificación

Vite ofrece tiempos de inicio muy rápidos, compilaciones eficientes y una excelente integración con React.

Esto mejora la experiencia de desarrollo y reduce significativamente los tiempos de espera durante las pruebas.

### Estado

✅ Implementada.

---

# Decisión 3

## Desarrollar una Aplicación Web Progresiva (PWA)

### Decisión

Implementar Innova Mentor como una Progressive Web App.

### Justificación

Una PWA permite instalar la aplicación directamente desde el navegador, sin necesidad de publicarla inicialmente en una tienda de aplicaciones.

Esto facilita el acceso desde dispositivos móviles y reduce las barreras de entrada para los usuarios.

Además, permite mantener una única base de código para distintos dispositivos.

### Estado

✅ Implementada.

---

# Decisión 4

## Utilizar Git y GitHub para el control de versiones

### Decisión

Gestionar todo el desarrollo mediante Git y alojar el repositorio en GitHub.

### Justificación

El uso de Git permite mantener un historial completo de cambios, facilitar el trabajo colaborativo y garantizar la trazabilidad del desarrollo.

GitHub centraliza el código fuente y facilita la colaboración entre los integrantes del equipo.

### Estado

✅ Implementada.

---

# Decisión 5

## Documentar el proyecto desde las primeras etapas

### Decisión

Crear la documentación técnica desde el inicio del desarrollo.

### Justificación

La documentación temprana facilita la incorporación de nuevos integrantes al equipo, reduce la dependencia del conocimiento individual y mejora la mantenibilidad del proyecto.

Asimismo, permite justificar las decisiones adoptadas durante el desarrollo y mantener una visión clara de la evolución del sistema.

### Estado

✅ Implementada.

---

# Decisión 6

## Adoptar una arquitectura modular

### Decisión

Organizar el proyecto mediante carpetas especializadas y componentes reutilizables.

### Justificación

Una arquitectura modular facilita el crecimiento progresivo del proyecto, mejora la organización del código y reduce la duplicación de funcionalidades.

Esta estructura permitirá incorporar nuevas características sin afectar significativamente el código existente.

### Estado

✅ Implementada parcialmente.

---

# Decisión 7

## Crear una identidad visual propia

### Decisión

Desarrollar una identidad visual específica para Innova Mentor.

### Justificación

Se decidió crear una marca propia, un logotipo, una paleta de colores y el personaje Nova para ofrecer una experiencia cercana, coherente y fácilmente reconocible.

Una identidad visual consistente fortalece la percepción del proyecto y mejora la experiencia del usuario.

### Estado

✅ Implementada.

---

# Decisión 8

## Incorporar a Nova como mentor virtual

### Decisión

Crear un personaje que acompañe al usuario durante todo su proceso de aprendizaje.

### Justificación

Se buscó diferenciar Innova Mentor de otras plataformas educativas mediante una experiencia más humana.

Nova actuará como un mentor virtual que ofrecerá acompañamiento, motivación y seguimiento del progreso, sin sustituir el contenido educativo.

### Estado

✅ Implementada parcialmente.

---

# Decisiones pendientes

Las siguientes decisiones serán documentadas cuando llegue el momento de implementarlas:

* Selección del sistema de autenticación.
* Integración con Firebase Authentication.
* Organización de Firestore.
* Gestión del estado global.
* Integración con APIs externas.
* Sistema de notificaciones.
* Estrategia de pruebas.
* Despliegue en producción.
* Integración de inteligencia artificial.

---

# Principios para futuras decisiones

Toda decisión técnica deberá cumplir, en la medida de lo posible, con los siguientes criterios:

* Simplicidad.
* Escalabilidad.
* Mantenibilidad.
* Reutilización.
* Accesibilidad.
* Rendimiento.
* Facilidad de aprendizaje para nuevos integrantes.
* Consistencia con la arquitectura existente.

---

# Actualización del documento

Cada vez que el equipo adopte una decisión técnica importante, deberá añadirse una nueva sección indicando:

* La decisión tomada.
* La justificación.
* El estado de implementación.
* El impacto esperado sobre el proyecto.

---

# Conclusión

Las decisiones técnicas documentadas en este archivo representan el conocimiento acumulado del proyecto.

Su objetivo es garantizar que el crecimiento de Innova Mentor responda a criterios claros y compartidos por todo el equipo, favoreciendo un desarrollo ordenado, colaborativo y sostenible.
