// Helpers compartidos para calcular fechas de "esta semana" (lunes a domingo),
// usados tanto por la racha (Racha.jsx) como por el gráfico de horas de
// Progreso (ProgresoGeneral.jsx) — misma lógica en un solo lugar.

export function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getMondayOf(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  const day = date.getDay(); // 0 = domingo, 1 = lunes, ...
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}
