import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject, of, forkJoin } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { SearchResult } from '../models/models';

export type SearchSource = 'navbar' | 'banner';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerms = new Subject<{term: string, source: SearchSource}>();
  private debounceTimeMs = 500;

  constructor(private apiService: ApiService) { }
  search(term: string, source: SearchSource): void {
    this.searchTerms.next({term, source});
  }

  getSearchResults(): Observable<{results: SearchResult[], source: SearchSource}> {
    return this.searchTerms.pipe(
      debounceTime(this.debounceTimeMs),
      switchMap(searchData => {
        const { term, source } = searchData;

        if (!term.trim()) {
          return of({results: [], source});
        }

        return forkJoin([
          this.apiService.searchAnimalByCommonName(term).pipe(
            map(animals => this.mapToSearchResults(animals, 'animal')),
            catchError(() => of([]))
          ),
          this.apiService.searchAnimalByScientificName(term).pipe(
            map(animals => this.mapToSearchResults(animals, 'animal')),
            catchError(() => of([]))
          ),
          this.apiService.searchPlantByCommonName(term).pipe(
            map(plants => this.mapToSearchResults(plants, 'plant')),
            catchError(() => of([]))
          ),
          this.apiService.searchPlantByScientificName(term).pipe(
            map(plants => this.mapToSearchResults(plants, 'plant')),
            catchError(() => of([]))
          ),
          this.apiService.searchHabitatByCommonName(term).pipe(
            map(habitats => this.mapToSearchResults(habitats, 'habitat')),
            catchError(() => of([]))
          ),
          this.apiService.searchHabitatByScientificName(term).pipe(
            map(habitats => this.mapToSearchResults(habitats, 'habitat')),
            catchError(() => of([]))
          )
        ]).pipe(
          map(results => {
            const flatResults = results.flat();
            const uniqueResults = Array.from(
              new Map(flatResults.map(item => [item.id, item])).values()
            );
            return {results: uniqueResults, source};
          })
        );
      })
    );
  }

  private mapToSearchResults(items: any[], tipo: 'animal' | 'plant' | 'habitat'): SearchResult[] {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    return items
      .filter(item => {
        console.log(`Search result item (${tipo}):`, item);

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
          return false;
        }
        return true;
      })
      .map(item => {
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
