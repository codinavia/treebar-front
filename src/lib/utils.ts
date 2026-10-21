export const format_distance = (m?: number) =>
  m == null ? "" : m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`;