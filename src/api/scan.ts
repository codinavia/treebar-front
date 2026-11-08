import { client } from "@/lib/api";
import type { Ubicacion, ScanResponse, RecentlyScanned } from "@/types/api";

export const aggregate = (codigo: string, ubicacion: Ubicacion | null) =>
  client
    .get<ScanResponse>(`/scan/${encodeURIComponent(codigo)}`, {
      params: ubicacion ? ubicacion : null,
    })
    .then((r) => r.data);

export const recent = () =>
  client
    .get<RecentlyScanned[]>("/scan/recientes").then((r) => r.data);