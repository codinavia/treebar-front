
/**
 * Tipos de datos asociados 
 * al módulo de reseñas.
 */
export type Rating = {
    id_criterio: string;
    comentario: string;
    calificacion: number;
}

export type CreateReview = {
    huella_usuario: string;
    codigo_producto: string;
    comentarios: Rating[];
}

export type Review = {
    pregunta: string;
    calificaciones: Comment[];
}

export type Criterio = {
    id: string;
    tipo: string;
    pregunta: string;
}

/**
 * Tipos de datos asociados al 
 * módulo de preguntas.
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

/**
 * Tipos de datos asociados al módulo 
 * de escaner de productos.
 */
export type Location = {
    latitud: number;
    longitud: number;
}

export type Product = {
    nombre: string;
    marca?: string;
    descripcion?: string;
    imagenUrl?: string;
    categoria?: string;
    especificaciones?: Record<string, string>;
    inferido: boolean;
}

export type RepairPlace = {
    nombre: string;
    distanciaMetros?: number;
    googleMapsUri?: string;
    tipo?: string;
}

export type ScanResponse = {
    producto?: Product;
    reparaciones?: RepairPlace[];
    reseñas?: Review[];
}