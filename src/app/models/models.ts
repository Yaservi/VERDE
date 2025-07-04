// Animal model
export interface Animal {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  imagenUrl: string;
  dieta: string;
  estadoDeConservacion: string;
  formaDeReproduccion: string;
  tipoDesarrolloEmbrionario: string;
  estatusBiogeografico: string;
  filo: string;
  clase: string;
  orden: string;
  familia: string;
  genero: string;
  especie: string;
  subEspecie: string;
  distribucionGeograficaUrl: string;
  observaciones?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Plant model
export interface Plant {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  imagenUrl: string;
  estadoDeConservacion: string;
  estatusBiogeografico: string;
  filo: string;
  clase: string;
  orden: string;
  familia: string;
  genero: string;
  especie: string;
  subEspecie: string;
  distribucionGeograficaUrl: string;
  observaciones?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Habitat model
export interface Habitat {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  clima: string;
  descripcion: string;
  imagenUrl: string;
  ubicacionGeograficaUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Search result model
export interface SearchResult {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  imagenUrl: string;
  tipo: 'animal' | 'plant' | 'habitat';
}
