import axios, { AxiosError } from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

if (!baseUrl) 
    console.warn("EXPO_PUBLIC_API_URL no está configurada");

export const client = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export function parse_error(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const e = error as AxiosError;
    if (e.response?.status === 429)
      return "Demasiados escaneos seguidos. Espera un minuto e intenta de nuevo.";
    if (e.response?.status === 404)
      return "No encontramos ese producto";
    if (e.response?.status === 409) 
      return "Ya dejaste una reseña para este producto.";
    if (e.response?.status === 400) 
      return "Revisa los datos de tu reseña.";
    if (e.code === "ECONNABORTED")
      return "El servidor tardó demasiado en responder.";
    if (!e.response)
      return "No hay conexión con el servidor.";
  }
  return "Ocurrió un error inesperado.";
}