// Enums for Animal
export enum Dieta {
  Herbivoro = 0,
  Carnivoro = 1,
  Omnivoro = 2,
  Detritivoro = 3
}

export enum EstadoDeConservacion {
  Extinto = 0,
  EnPeligroCritico = 1,
  EnPeligro = 2,
  Vulnerable = 3,
  CasiAmenazado = 4,
  PreocupacionMenor = 5,
  DatosInsuficientes = 6,
  NoEvaluado = 7
}

export enum EstatusBiogeograficoAnimal {
  Endémico = 0,
  Nativo = 1,
  Introducido = 2,
  Invasor = 3,
  Migratorio = 4,
  Residente = 5,
  Temporal = 6,
  Estacional = 7,
  Visitante = 8
}

export enum FormaDeReproduccion {
  Sexual = 0,
  Asexual = 1,
  Ambos = 2
}

export enum TipoDesarrolloEmbrionario {
  Oviparo = 0,
  Viviparo = 1,
  Ovoviviparo = 2
}

// Enums for Plant
export enum EstatusBiogeograficoPlanta {
  Endémico = 0,
  Nativo = 1,
  Introducido = 2,
  Invasor = 3,
  Migratorio = 4,
  Residente = 5,
  Temporal = 6,
  Estacional = 7,
  Visitante = 8
}

// Enums for Habitat
export enum Clima {
  Tropical = 0,
  Desertico = 1,
  Templado = 2,
  Polar = 3,
  Mediterraneo = 4
}

// Utility functions to convert enum values to strings
export function getDietaText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return Dieta[value] || `Desconocido (${value})`;
}

export function getEstadoDeConservacionText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return EstadoDeConservacion[value] || `Desconocido (${value})`;
}

export function getEstatusBiogeograficoAnimalText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return EstatusBiogeograficoAnimal[value] || `Desconocido (${value})`;
}

export function getEstatusBiogeograficoPlantaText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return EstatusBiogeograficoPlanta[value] || `Desconocido (${value})`;
}

export function getFormaDeReproduccionText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return FormaDeReproduccion[value] || `Desconocido (${value})`;
}

export function getTipoDesarrolloEmbrionarioText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return TipoDesarrolloEmbrionario[value] || `Desconocido (${value})`;
}

export function getClimaText(value: number | string): string {
  if (typeof value === 'string') {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return value; // Return the original string if it's not a number
    }
    value = numValue;
  }
  return Clima[value] || `Desconocido (${value})`;
}
