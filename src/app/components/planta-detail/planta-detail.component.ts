import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Plant } from '../../models/models';
import { Subscription } from 'rxjs';
import {
  getEstadoDeConservacionText,
  getEstatusBiogeograficoPlantaText
} from '../../models/enums';

@Component({
  selector: 'app-planta-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planta-detail.component.html',
  styleUrls: ['./planta-detail.component.css']
})
export class PlantaDetailComponent implements OnInit, OnDestroy {
  planta: Plant | null = null;
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
      this.loadPlantData(params);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      this.routeSubscription = null;
    }
  }

  loadPlantData(params?: ParamMap): void {
    this.planta = null;
    this.error = false;

    const paramMap = params || this.route.snapshot.paramMap;
    const id = paramMap.get('id');

    console.log(`Plant detail component - ID from route: "${id}"`);

    if (id && id !== 'undefined') {
      this.loading = true;
      this.apiService.getPlantById(id).subscribe({
        next: (data) => {
          console.log('Plant data loaded successfully:', data);
          this.planta = data;
          this.loading = false;
          this.showApiConfig = false;
        },
        error: (err) => {
          console.error('Error fetching plant details:', err);
          this.error = true;
          this.loading = false;
          this.showApiConfig = true;
        }
      });
    } else {
      this.loading = false;

      if (id === 'undefined') {
        console.error('Invalid plant ID: "undefined" - This suggests a problem with the search results');
        this.error = true;
        this.showApiConfig = true;
      } else if (paramMap.has('id')) {
        console.error(`Invalid plant ID: "${id}"`);
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
      this.loadPlantData();
    }
  }

  openMapModal(): void {
    this.showMapModal = true;
  }

  closeMapModal(): void {
    this.showMapModal = false;
  }
  getEstadoDeConservacionText(value: number | string): string {
    return getEstadoDeConservacionText(value);
  }

  getEstatusBiogeograficoText(value: number | string): string {
    return getEstatusBiogeograficoPlantaText(value);
  }
}
