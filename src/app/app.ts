import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchSource } from './services/search.service';
import { SearchResult } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'FaunaEnriquilloFrontend';

  isScrolled = false;

  isLoggedIn = false;
  navbarSearchExpanded = false;
  navbarSearchTerm = '';
  navbarSearchResults: SearchResult[] = [];
  navbarSearchLoading = false;
  navbarGroupedResults: { [key: string]: SearchResult[] } = {};

  bannerSearchTerm = '';
  bannerSearchResults: SearchResult[] = [];
  bannerSearchLoading = false;
  bannerGroupedResults: { [key: string]: SearchResult[] } = {};

  constructor(
    private searchService: SearchService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
    }

    this.searchService.getSearchResults().subscribe(response => {
      const { results, source } = response;
      if (source === 'navbar') {
        this.navbarSearchResults = results;
        this.navbarGroupedResults = this.groupResultsByType(results);
        this.navbarSearchLoading = false;
        this.cdr.detectChanges();
      } else if (source === 'banner') {
        this.bannerSearchResults = results;
        this.bannerGroupedResults = this.groupResultsByType(results);
        this.bannerSearchLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 50;
    }
  }
  toggleNavbarSearch(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    this.navbarSearchExpanded = !this.navbarSearchExpanded;

    if (this.navbarSearchExpanded) {
      setTimeout(() => {
        const searchInitBtn = document.getElementById('search-init-btn');
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input');
        const mainMenu = document.getElementById('main-menu');

        if (searchInitBtn) {
          searchInitBtn.style.display = 'none';
        }

        if (searchContainer) {
          searchContainer.style.display = 'block';
        }

        if (mainMenu) {
          mainMenu.classList.add('slide-up');
        }

        setTimeout(() => {
          if (searchContainer) {
            searchContainer.classList.add('expanded');
          }

          if (searchInput) {
            searchInput.classList.add('expanded');
            (searchInput as HTMLInputElement).focus();
          }

          const closeSearchBtn = document.getElementById('close-search-btn');
          if (closeSearchBtn) {
            closeSearchBtn.classList.add('visible');
          }
        }, 10);
      }, 10);
    } else {
      this.closeNavbarSearch();
    }
  }

  closeNavbarSearch(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (closeSearchBtn) {
      closeSearchBtn.classList.remove('visible');
    }

    if (searchContainer) {
      searchContainer.classList.remove('expanded');
    }

    if (searchInput) {
      searchInput.classList.remove('expanded');
    }

    setTimeout(() => {
      if (searchContainer) {
        searchContainer.style.display = 'none';
      }

      const searchInitBtn = document.getElementById('search-init-btn');
      if (searchInitBtn) {
        searchInitBtn.style.display = 'block';
      }

      const mainMenu = document.getElementById('main-menu');
      if (mainMenu) {
        mainMenu.classList.remove('slide-up');
        mainMenu.classList.add('slide-down');

        setTimeout(() => {
          mainMenu.classList.remove('slide-down');
        }, 300);
      }

      this.navbarSearchExpanded = false;
      this.navbarSearchTerm = '';
      this.navbarSearchResults = [];
    }, 300);
  }

  onNavbarSearch(): void {
    if (this.navbarSearchTerm.trim()) {
      this.navbarSearchLoading = true;
      this.searchService.search(this.navbarSearchTerm, 'navbar');
    } else {
      this.navbarSearchResults = [];
    }
  }

  onBannerSearch(): void {
    if (this.bannerSearchTerm.trim()) {
      this.bannerSearchLoading = true;
      this.searchService.search(this.bannerSearchTerm, 'banner');
    } else {
      this.bannerSearchResults = [];
    }
  }
  navigateToDetail(result: SearchResult): void {
    if (!result.id) {
      console.error('Error: ID is undefined for search result', result);
      return;
    }

    this.router.navigate([`detalle/${result.tipo}/${result.id}`]);

    if (this.navbarSearchExpanded) {
      this.closeNavbarSearch();
    }
    this.bannerSearchTerm = '';
    this.bannerSearchResults = [];
    this.bannerGroupedResults = this.groupResultsByType([]);
  }

  toggleLogin(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.isLoggedIn) {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    } else {
      localStorage.setItem('token', 'dummy-token');
      this.isLoggedIn = true;
    }
  }

  private groupResultsByType(results: SearchResult[]): { [key: string]: SearchResult[] } {
    const grouped: { [key: string]: SearchResult[] } = {
      'animal': [],
      'plant': [],
      'habitat': []
    };

    results.forEach(result => {
      if (grouped[result.tipo]) {
        grouped[result.tipo].push(result);
      }
    });

    return grouped;
  }
}
