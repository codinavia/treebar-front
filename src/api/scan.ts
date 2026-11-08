import { client } from "@/lib/api";
import type { Ubicacion, ScanResponse } from "@/types/api";

export const aggregate = (codigo: string, ubicacion: Ubicacion | null) =>
  client
    .get<ScanResponse>(`/scan/${encodeURIComponent(codigo)}`, {
      params: ubicacion ? ubicacion : null,
    })
    .then((r) => r.data);