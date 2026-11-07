import { client } from '@/lib/api';
import { CreateReview, Criterio, Review } from '@/types/api';

export const create = (review: CreateReview) => 
    client.post('/reviews/dejar_resena', review).then((r) => r.data);

export const get = (
    codigo_producto: string,
    tipo: string
) => 
    client
        .get<Review[]>(`/reviews/producto/${encodeURIComponent(codigo_producto)}/${tipo}`)
        .then((r) => r.data);

export const getQuestions = () =>
  client.get<Criterio[]>("/reviews/preguntas").then((r) => r.data);

export const getReviewByUser = (
    huella_usuario: string,
    codigo_producto: string
) =>
    client
        .get<Review[]>(`/reviews/usuario/${encodeURIComponent(huella_usuario)}/${encodeURIComponent(codigo_producto)}`)
        .then((r) => r.data);