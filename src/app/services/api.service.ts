import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';
  private apiVersion = 'v1';  // Using a specific version number

  constructor(private http: HttpClient) {
    // Try to get the API URL from localStorage if available
    if (typeof window !== 'undefined') {
      const storedBaseUrl = localStorage.getItem('apiBaseUrl');
      if (storedBaseUrl) {
        // Use the setBaseUrl method to ensure proper handling of the URL
        this.setBaseUrl(storedBaseUrl);
      }
    }
  }

  // Method to set the base URL
  setBaseUrl(url: string): void {
    // If the URL is a full URL (starts with http:// or https://),
    // we need to extract just the path for the proxy to work
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        const urlObj = new URL(url);
        // Extract the path part (e.g., /api)
        this.baseUrl = urlObj.pathname;
        console.log(`Using proxied path: ${this.baseUrl}`);
      } catch (e) {
        console.error('Invalid URL format:', e);
        // Fallback to the provided URL
        this.baseUrl = url;
      }
    } else {
      // If it's already a relative path, use it as is
      this.baseUrl = url;
    }

    // Store the URL in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('apiBaseUrl', url); // Store the original URL for display purposes
    }
  }

  // Helper method to create headers
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  // Helper method to create HTTP options with headers
  private getHttpOptions() {
    return {
      headers: this.getHeaders()
      // Removed withCredentials: true as it was causing CORS issues
      // The server needs to be configured to return Access-Control-Allow-Credentials: true
    };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private logResponse(endpoint: string) {
    return tap({
      next: (data) => console.log(`Response from ${endpoint}:`, data),
      error: (error) => console.error(`Error from ${endpoint}:`, error)
    });
  }

  // Animal endpoints
  searchAnimalByCommonName(commonName: string): Observable<any> {
    const encodedName = encodeURIComponent(commonName);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/animal/search/commonName/${encodedName}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from searchAnimalByCommonName:', data)),
        this.logResponse('searchAnimalByCommonName'),
        catchError(this.handleError)
      );
  }

  searchAnimalByScientificName(scientificName: string): Observable<any> {
    const encodedName = encodeURIComponent(scientificName);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/animal/search/ScientificName/${encodedName}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from searchAnimalByScientificName:', data)),
        this.logResponse('searchAnimalByScientificName'),
        catchError(this.handleError)
      );
  }

  getAnimalById(id: string): Observable<any> {
    const encodedId = encodeURIComponent(id);
    console.log(`Getting animal by ID: ${id} (encoded: ${encodedId})`);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/animal/${encodedId}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from getAnimalById:', data)),
        this.logResponse('getAnimalById'),
        catchError(error => {
          console.error(`Error getting animal by ID ${id}:`, error);
          return this.handleError(error);
        })
      );
  }

  // Plant endpoints
  searchPlantByCommonName(commonName: string): Observable<any> {
    const encodedName = encodeURIComponent(commonName);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/plant/search/commonName/${encodedName}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from searchPlantByCommonName:', data)),
        this.logResponse('searchPlantByCommonName'),
        catchError(this.handleError)
      );
  }

  searchPlantByScientificName(scientificName: string): Observable<any> {
    const encodedName = encodeURIComponent(scientificName);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/plant/search/ScientificName/${encodedName}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from searchPlantByScientificName:', data)),
        this.logResponse('searchPlantByScientificName'),
        catchError(this.handleError)
      );
  }

  getPlantById(id: string): Observable<any> {
    const encodedId = encodeURIComponent(id);
    console.log(`Getting plant by ID: ${id} (encoded: ${encodedId})`);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/plant/${encodedId}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from getPlantById:', data)),
        this.logResponse('getPlantById'),
        catchError(error => {
          console.error(`Error getting plant by ID ${id}:`, error);
          return this.handleError(error);
        })
      );
  }

  // Habitat endpoints
  searchHabitatByCommonName(commonName: string): Observable<any> {
    const encodedName = encodeURIComponent(commonName);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/habitat/search/commonName/${encodedName}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from searchHabitatByCommonName:', data)),
        this.logResponse('searchHabitatByCommonName'),
        catchError(this.handleError)
      );
  }

  searchHabitatByScientificName(scientificName: string): Observable<any> {
    const encodedName = encodeURIComponent(scientificName);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/habitat/search/ScientificName/${encodedName}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from searchHabitatByScientificName:', data)),
        this.logResponse('searchHabitatByScientificName'),
        catchError(this.handleError)
      );
  }

  getHabitatById(id: string): Observable<any> {
    const encodedId = encodeURIComponent(id);
    console.log(`Getting habitat by ID: ${id} (encoded: ${encodedId})`);
    return this.http.get(`${this.baseUrl}/${this.apiVersion}/habitat/${encodedId}`, this.getHttpOptions())
      .pipe(
        tap(data => console.log('Raw API response from getHabitatById:', data)),
        this.logResponse('getHabitatById'),
        catchError(error => {
          console.error(`Error getting habitat by ID ${id}:`, error);
          return this.handleError(error);
        })
      );
  }
}
