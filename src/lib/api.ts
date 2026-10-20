import axios from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

if (!baseUrl) 
    console.warn("EXPO_PUBLIC_API_URL no está configurada");

export const client = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});