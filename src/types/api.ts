
/**
 * Tipos de datos asociados 
 * al módulo de reseñas.
 */
export type Comment = {
    id_criterio: string;
    comentario: string;
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
    id: number;
    pregunta: string;
    respuestas: Answer[];
}

export type AnswerQuery = {
    id_duda: number;
    respuesta: string;
}

/**
 * Tipos de datos asociados al módulo 
 * de escaner de productos.
 */
export type Ubicacion = {
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

export type RecentlyScanned = {
  codigo: string;
  nombre: string | null;
};

/**
 * Tipos de datos asociados al módulo
 * de certificaciones.
 */
export type Certification = {
    nombre: string;
    url: string;
    descripcion: string;
}