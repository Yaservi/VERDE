import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Plant } from '../../models/models';
import { Subscription } from 'rxjs';

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
  showInErrorSection = false; // Show details in the dedicated section
  showMapModal = false; // Control visibility of the map modal
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Check if user is admin or editor (only in browser environment)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // In a real app, you would decode the token and check the role
        // For now, we'll just check if a token exists
        this.isAdmin = true;
      }

      // Get stored API URL if available
      const storedApiUrl = localStorage.getItem('apiBaseUrl');
      if (storedApiUrl) {
        this.apiUrl = storedApiUrl;
      } else {
        // Default API URL
        this.apiUrl = 'https://localhost:7057/api';
      }
    }

    // Subscribe to route parameter changes
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.loadPlantData(params);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      this.routeSubscription = null;
    }
  }

  loadPlantData(params?: ParamMap): void {
    // Reset state when loading new data
    this.planta = null;
    this.error = false;

    // Get the plant ID from the route parameters or snapshot
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
          this.showApiConfig = false; // Hide config if successful
        },
        error: (err) => {
          console.error('Error fetching plant details:', err);
          this.error = true;
          this.loading = false;
          this.showApiConfig = true; // Show config on error
        }
      });
    } else {
      // Handle the case when no ID is provided or ID is 'undefined'
      this.loading = false;

      if (id === 'undefined') {
        console.error('Invalid plant ID: "undefined" - This suggests a problem with the search results');
        this.error = true;
        this.showApiConfig = true; // Show config on error
      } else if (paramMap.has('id')) {
        // Some other invalid ID case
        console.error(`Invalid plant ID: "${id}"`);
        this.error = true;
        this.showApiConfig = true; // Show config on error
      } else {
        // Root route case - no ID expected
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
      this.loadPlantData(); // Retry loading data with new URL
    }
  }

  // Methods for map modal
  openMapModal(): void {
    this.showMapModal = true;
  }

  closeMapModal(): void {
    this.showMapModal = false;
  }
}
