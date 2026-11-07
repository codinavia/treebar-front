import { client } from "@/lib/api";
import type { Location, ScanResponse } from "@/types/api";

export const aggregate = (codigo: string, ubicacion: Location) =>
  client
    .get<ScanResponse>(`/scan/${encodeURIComponent(codigo)}`, {
      params: { latitud: ubicacion.latitud, longitud: ubicacion.longitud },
    })
    .then((r) => r.data);