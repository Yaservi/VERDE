import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject, of, forkJoin } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { SearchResult } from '../models/models';

// Define a type for search source
export type SearchSource = 'navbar' | 'banner';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerms = new Subject<{term: string, source: SearchSource}>();
  private debounceTimeMs = 500; // 500ms debounce time

  constructor(private apiService: ApiService) { }

  // Method to push a search term into the observable stream
  search(term: string, source: SearchSource): void {
    this.searchTerms.next({term, source});
  }

  // Returns an observable of search results with debounce
  getSearchResults(): Observable<{results: SearchResult[], source: SearchSource}> {
    return this.searchTerms.pipe(
      debounceTime(this.debounceTimeMs),
      switchMap(searchData => {
        const { term, source } = searchData;

        if (!term.trim()) {
          // If search term is empty, return empty array with source
          return of({results: [], source});
        }

        // Search in all three categories (animal, plant, habitat) by both common and scientific name
        return forkJoin([
          // Animal searches
          this.apiService.searchAnimalByCommonName(term).pipe(
            map(animals => this.mapToSearchResults(animals, 'animal')),
            catchError(() => of([]))
          ),
          this.apiService.searchAnimalByScientificName(term).pipe(
            map(animals => this.mapToSearchResults(animals, 'animal')),
            catchError(() => of([]))
          ),

          // Plant searches
          this.apiService.searchPlantByCommonName(term).pipe(
            map(plants => this.mapToSearchResults(plants, 'plant')),
            catchError(() => of([]))
          ),
          this.apiService.searchPlantByScientificName(term).pipe(
            map(plants => this.mapToSearchResults(plants, 'plant')),
            catchError(() => of([]))
          ),

          // Habitat searches
          this.apiService.searchHabitatByCommonName(term).pipe(
            map(habitats => this.mapToSearchResults(habitats, 'habitat')),
            catchError(() => of([]))
          ),
          this.apiService.searchHabitatByScientificName(term).pipe(
            map(habitats => this.mapToSearchResults(habitats, 'habitat')),
            catchError(() => of([]))
          )
        ]).pipe(
          // Flatten the array of arrays and remove duplicates
          map(results => {
            const flatResults = results.flat();
            // Remove duplicates by ID
            const uniqueResults = Array.from(
              new Map(flatResults.map(item => [item.id, item])).values()
            );
            // Return results with source information
            return {results: uniqueResults, source};
          })
        );
      })
    );
  }

  // Helper method to map API results to SearchResult objects
  private mapToSearchResults(items: any[], tipo: 'animal' | 'plant' | 'habitat'): SearchResult[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    // Filter out items without an ID and map the rest to SearchResult objects
    return items
      .filter(item => {
        // Log the item to see what's coming from the API
        console.log(`Search result item (${tipo}):`, item);

        // Check if the item has an ID based on entity type
        let hasId = false;
        if (tipo === 'animal' && item.idAnimal) {
          hasId = true;
        } else if (tipo === 'plant' && item.idPlanta) {
          hasId = true;
        } else if (tipo === 'habitat' && item.idHabitat) {
          hasId = true;
        } else if (item.id) {
          hasId = true;
        }

        if (!hasId) {
          console.error(`Error: Item does not have an ID (${tipo}):`, item);
          return false; // Skip items without an ID
        }
        return true;
      })
      .map(item => {
        // Extract the correct ID based on entity type
        let id = item.id;
        if (tipo === 'animal' && item.idAnimal) {
          id = item.idAnimal;
        } else if (tipo === 'plant' && item.idPlanta) {
          id = item.idPlanta;
        } else if (tipo === 'habitat' && item.idHabitat) {
          id = item.idHabitat;
        }

        return {
          id: id,
          nombreComun: item.nombreComun || 'Sin nombre común',
          nombreCientifico: item.nombreCientifico || 'Sin nombre científico',
          imagenUrl: item.imagenUrl || 'https://via.placeholder.com/150',
          tipo: tipo
        };
      });
  }
}
