import { client } from '@/lib/api';
import { CreateReview, Review } from '@/types/api';

export const create = (review: CreateReview) => 
    client.post('/reviews/dejar_resena', review).then((r) => r.data);

export const get = (
    codigo_producto: string,
    tipo: string
) => 
    client
        .get<Review[]>(`/reviews/${encodeURIComponent(codigo_producto)}/${tipo}`)
        .then((r) => r.data);

export const getQuestions = () => 
    client.get<string[]>('/reviews/preguntas').then((r) => r.data);