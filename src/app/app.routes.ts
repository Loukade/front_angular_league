import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChampionDetailComponent } from './champion-detail/champion-detail.component';
import { ChampionsComponent } from './champions/champions.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'champions', component: ChampionsComponent },
  { path: 'champions/:name/:patch', component: ChampionDetailComponent },
  { path: 'account/:gameName/:tagLine', component: AccountComponent },
];
