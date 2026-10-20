export type Error = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};

/**
 * Tipos de datos asociados al módulo de reseñas.
 */
export type Comment = {
    id_criterio: string;
    comentario: string;
    calificacion: number;
}

export type CreateReview = {
    huella_usuario: string;
    codigo_producto: string;
    comentarios: Comment[];
}

export type Review = {
    pregunta: string;
    calificaciones: Comment[];
}

/**
 * Tipos de datos asociados al módulo de preguntas.
 */
export type CreateQuery = {
    codigo_producto: string;
    pregunta: string;
}

export type Answer = {
    respuesta: string;
}

export type Query = {
    pregunta: string;
    respuestas: Answer[];
}