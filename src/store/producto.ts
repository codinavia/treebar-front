import * as reviews from "@/api/reviews";
import * as scan from "@/api/scan";
import { parse_error } from "@/lib/api";
import { obtenerUbicacion, type EstadoUbicacion } from "@/lib/location";
import type { Ubicacion } from "@/types/api";
import type { Product, RepairPlace, Review } from "@/types/api";
import axios from "axios";
import { create } from "zustand";

type Estado = "cargando" | "ok" | "noEncontrado" | "error";

type ProductoStore = {
  codigo: string | null;
  estado: Estado;
  error: string | null;
  producto: Product | null;
  reparaciones: RepairPlace[];
  resenas: Record<string, Review[]>;

  // Ubicación
  // Permisos
  ubicacion: Ubicacion | null;
  estadoUbicacion: EstadoUbicacion;
  puedePreguntarUbicacion: boolean;
  actualizarUbicacion: () => Promise<EstadoUbicacion>;

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
  ubicacion: null,
  estadoUbicacion: "ok",
  puedePreguntarUbicacion: true,

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
      const loc = await obtenerUbicacion();
      const d = await scan.aggregate(codigo, loc.ubicacion);

      if (get().codigo !== codigo) return;
      if (!d.producto) return set({ estado: "noEncontrado" });

      set({
        estado: "ok",
        producto: d.producto,
        reparaciones: d.reparaciones ?? [],
        resenas: d.reseñas?.length ? { uso: d.reseñas } : {},
        ubicacion: loc.ubicacion,
        estadoUbicacion: loc.estado,
        puedePreguntarUbicacion: loc.puedePreguntar,
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
    }
    if (get().codigo !== codigo) return;
    set((s) => ({ resenas: { ...s.resenas, [tipo]: data } }));
  },

  actualizarUbicacion: async () => {
    const codigo = get().codigo;
    if (!codigo) return "no_disponible";

    const loc = await obtenerUbicacion();
    if (!loc.ubicacion) {
      set({ estadoUbicacion: loc.estado, puedePreguntarUbicacion: loc.puedePreguntar });
      return loc.estado;
    }

    const d = await scan.aggregate(codigo, loc.ubicacion);
    if (get().codigo !== codigo) return "ok";
    set({
      ubicacion: loc.ubicacion,
      estadoUbicacion: "ok",
      puedePreguntarUbicacion: true,
      reparaciones: d.reparaciones ?? [],
    });
    return "ok";
  },
}));