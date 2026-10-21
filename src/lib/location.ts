import * as Location from "expo-location";

export async function obtenerUbicacion() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") throw new Error("PERMISO_UBICACION");

  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return { latitud: pos.coords.latitude, longitud: pos.coords.longitude };
}