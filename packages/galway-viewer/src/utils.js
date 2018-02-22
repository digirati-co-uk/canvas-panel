export function renderTemporal({ temporal }) {
  if (!temporal) {
    return '';
  }
  if (temporal.length <= 2) {
    return temporal.join(' - ');
  }
  return Math.min(temporal) + ' - ' + Math.max(temporal);
}
