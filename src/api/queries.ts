import { client } from '@/lib/api';
import { AnswerQuery, CreateQuery, Query } from '@/types/api';

export const create = (query: CreateQuery) => 
    client.post('/api/queries/dejar_duda', query).then((r) => r.data);

export const answer = (answer: AnswerQuery) => 
    client.post('/api/queries/responder', answer).then((r) => r.data);

export const get = (codigo_producto: string) =>
    client.get<Query[]>(`/api/queries/${encodeURIComponent(codigo_producto)}`).then((r) => r.data);