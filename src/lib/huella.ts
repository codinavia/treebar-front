import * as Crypto from "expo-crypto";

const KEY = "huella";
let enMemoria: string | null = null;

type Almacenamiento = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

const almacenamiento = (globalThis as typeof globalThis & {
  localStorage?: Almacenamiento;
}).localStorage;

export async function obtenerHuella(): Promise<string> {
  if (enMemoria) return enMemoria;
  let h = almacenamiento?.getItem(KEY) ?? null;
  if (!h) {
    h = Crypto.randomUUID();
    almacenamiento?.setItem(KEY, h);
  }
  return (enMemoria = h);
}