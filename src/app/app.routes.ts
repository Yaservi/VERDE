import { Routes } from '@angular/router';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';
import { PlantaDetailComponent } from './components/planta-detail/planta-detail.component';
import { HabitatDetailComponent } from './components/habitat-detail/habitat-detail.component';

export const routes: Routes = [
  { path: 'detalle/animal/:id', component: AnimalDetailComponent },
  { path: 'detalle/plant/:id', component: PlantaDetailComponent },
  { path: 'detalle/habitat/:id', component: HabitatDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AnimalDetailComponent }
];
