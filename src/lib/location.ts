import * as Location from "expo-location";
import type { Ubicacion } from "@/types/api";
import { Platform } from "react-native";

export type EstadoUbicacion = "ok" | "denegada" | "no_disponible";

export type ResultadoUbicacion = {
  estado: EstadoUbicacion;
  ubicacion: Ubicacion | null;
  puedePreguntar: boolean;
};

async function bloqueadaEnWeb(): Promise<boolean> {
  try {
    const r = await navigator.permissions.query({
      name: "geolocation" as PermissionName,
    });
    return r.state === "denied";
  } catch {
    return false;
  }
}

export async function obtenerUbicacion(): Promise<ResultadoUbicacion> {
  try {
    const permiso = await Location.requestForegroundPermissionsAsync();
    if (permiso.status !== "granted")
      return {
        estado: "denegada",
        ubicacion: null,
        puedePreguntar:
          Platform.OS === "web" ? !(await bloqueadaEnWeb()) : permiso.canAskAgain,
      };

    try {
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        estado: "ok",
        ubicacion: { latitud: pos.coords.latitude, longitud: pos.coords.longitude },
        puedePreguntar: true,
      };
    } catch {
      const last = await Location.getLastKnownPositionAsync().catch(() => null);

      if (last)
        return {
          estado: "ok",
          ubicacion: { latitud: last.coords.latitude, longitud: last.coords.longitude },
          puedePreguntar: true,
        };

      return { estado: "no_disponible", ubicacion: null, puedePreguntar: true };
    }
  } catch {

    return { estado: "no_disponible", ubicacion: null, puedePreguntar: true };
  }
}