import { client } from '@/lib/api';
import { CreateQuery, Query } from '@/types/api';

export const create = (query: CreateQuery) => 
    client.post('/queries/dejar_duda', query).then((r) => r.data);

export const get = (codigo_producto: string) =>
    client.get<Query[]>(`/queries/${encodeURIComponent(codigo_producto)}`).then((r) => r.data);