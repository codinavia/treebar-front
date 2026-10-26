import * as reviews from "@/api/reviews";
import * as scan from "@/api/scan";
import { parse_error } from "@/lib/api";
import { obtenerUbicacion } from "@/lib/location";
import type { Product, RepairPlace, Review } from "@/types/api";
import axios from "axios";
import { create } from "zustand";

type Estado = "cargando" | "ok" | "noEncontrado" | "error";

type Ubicacion = { latitud: number; longitud: number };

type ProductoStore = {
  codigo: string | null;
  estado: Estado;
  error: string | null;
  producto: Product | null;
  reparaciones: RepairPlace[];
  resenas: Record<string, Review[]>;
  ubicacion: Ubicacion | null;

  cargar: (codigo: string, forzar?: boolean) => Promise<void>;
  cargarResenas: (tipo: string) => Promise<void>;
};

export const useProductoStore = create<ProductoStore>((set, get) => ({
  codigo: null,
  estado: "cargando",
  error: null,
  producto: null,
  reparaciones: [],
  resenas: {},
  ubicacion: null, // ← era `ubicacion = null` (asignación, no propiedad)

  cargar: async (codigo, forzar = false) => {
    if (!forzar && get().codigo === codigo && get().estado === "ok") return;

    set({
      codigo,
      estado: "cargando",
      error: null,
      producto: null,
      reparaciones: [],
      resenas: {},
      ubicacion: null,
    });

    try {
      const ubicacion = await obtenerUbicacion();
      const d = await scan.aggregate(codigo, ubicacion);
      if (get().codigo !== codigo) return;

      if (!d.producto) return set({ estado: "noEncontrado" });

      set({
        estado: "ok",
        producto: d.producto,
        reparaciones: d.reparaciones ?? [],
        resenas: d.reseñas?.length ? { uso: d.reseñas } : {},
        ubicacion, // ← se guarda para el mapa
      });
    } catch (e) {
        if (axios.isAxiosError(e)) {
    console.log("code:", e.code, "| base:", e.config?.baseURL, "| url:", e.config?.url);
  }
      if (get().codigo !== codigo) return;
      if (axios.isAxiosError(e) && e.response?.status === 404)
        set({ estado: "noEncontrado" });
      else set({ estado: "error", error: parse_error(e) });
    }
  },

  cargarResenas: async (tipo) => {
    const codigo = get().codigo;
    if (!codigo || get().resenas[tipo]) return;

    let data: Review[];
    try {
      data = await reviews.get(codigo, tipo);
    } catch (e) {
      console.log("ERROR SCAN:", e);
      if (axios.isAxiosError(e)) {
        console.log("status:", e.response?.status, "body:", e.response?.data, "code:", e.code);
      }
      // if (axios.isAxiosError(e) && e.response?.status === 404) data = [];
      // else throw e;
    }
    if (get().codigo !== codigo) return;
    set((s) => ({ resenas: { ...s.resenas, [tipo]: data } }));
  },
}));