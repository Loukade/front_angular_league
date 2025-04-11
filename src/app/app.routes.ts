import { Routes } from '@angular/router';
import { ChampionDetailComponent } from './champion-detail/champion-detail.component';
import { ChampionsComponent } from './champions/champions.component';

export const routes: Routes = [
  { path: 'champions', component: ChampionsComponent },
  { path: 'champions/:name/:patch', component: ChampionDetailComponent },
];
