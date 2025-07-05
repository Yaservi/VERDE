import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Animal } from '../../models/models';
import { Subscription } from 'rxjs';
import {
  getDietaText,
  getEstadoDeConservacionText,
  getFormaDeReproduccionText,
  getTipoDesarrolloEmbrionarioText,
  getEstatusBiogeograficoAnimalText
} from '../../models/enums';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit, OnDestroy {
  animal: Animal | null = null;
  loading = true;
  error = false;
  isAdmin = false;
  showApiConfig = false;
  apiUrl = '';
  showInErrorSection = false;
  showMapModal = false;
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.isAdmin = true;
      }

      const storedApiUrl = localStorage.getItem('apiBaseUrl');
      if (storedApiUrl) {
        this.apiUrl = storedApiUrl;
      } else {
        this.apiUrl = 'https://localhost:7057/api';
      }
    }

    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.loadAnimalData(params);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      this.routeSubscription = null;
    }
  }

  loadAnimalData(params?: ParamMap): void {
    this.animal = null;
    this.error = false;

    const paramMap = params || this.route.snapshot.paramMap;
    const id = paramMap.get('id');

    console.log(`Animal detail component - ID from route: "${id}"`);

    if (id && id !== 'undefined') {
      this.loading = true;
      this.apiService.getAnimalById(id).subscribe({
        next: (data) => {
          console.log('Animal data loaded successfully:', data);
          if (data.estatusBiogeográfico !== undefined && data.estatusBiogeografico === undefined) {
            data.estatusBiogeografico = data.estatusBiogeográfico;
          }
          this.animal = data;
          this.loading = false;
          this.showApiConfig = false;
        },
        error: (err) => {
          console.error('Error fetching animal details:', err);
          this.error = true;
          this.loading = false;
          this.showApiConfig = true;
        }
      });
    } else {
      this.loading = false;

      if (id === 'undefined') {
        console.error('Invalid animal ID: "undefined" - This suggests a problem with the search results');
        this.error = true;
        this.showApiConfig = true;
      } else if (paramMap.has('id')) {
        console.error(`Invalid animal ID: "${id}"`);
        this.error = true;
        this.showApiConfig = true;
      } else {
        console.log('No ID provided - assuming root route');
      }
    }
  }

  toggleApiConfig(): void {
    this.showApiConfig = !this.showApiConfig;
  }

  updateApiUrl(): void {
    if (this.apiUrl) {
      this.apiService.setBaseUrl(this.apiUrl);
      this.loadAnimalData();
    }
  }

  openMapModal(): void {
    this.showMapModal = true;
  }

  closeMapModal(): void {
    this.showMapModal = false;
  }
  getDietaText(value: number | string): string {
    return getDietaText(value);
  }

  getEstadoDeConservacionText(value: number | string): string {
    return getEstadoDeConservacionText(value);
  }

  getFormaDeReproduccionText(value: number | string): string {
    return getFormaDeReproduccionText(value);
  }

  getTipoDesarrolloEmbrionarioText(value: number | string): string {
    return getTipoDesarrolloEmbrionarioText(value);
  }

  getEstatusBiogeograficoText(value: number | string): string {
    return getEstatusBiogeograficoAnimalText(value);
  }
}
