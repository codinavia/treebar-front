import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const KEY = "huella";
let enMemoria: string | null = null;

export async function obtenerHuella(): Promise<string> {
  if (enMemoria) return enMemoria;
  let h = await AsyncStorage.getItem(KEY);
  if (!h) {
    h = Crypto.randomUUID();
    await AsyncStorage.setItem(KEY, h);
  }
  return (enMemoria = h);
}