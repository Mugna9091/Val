import {Routes} from '@angular/router';

import {HomeComponent} from '../home/home.component';
import {PartiteComponent} from '../partite/partite.component';
import {StatisticheComponent} from "../statistiche/statistiche.component";
import {PartitaComponent} from "../partita/partita.component";
import {ClassificaComponent} from "../classifica/classifica.component";
import {TotwComponent} from "../totw/totw.component";

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'aggiungi-partite', component: PartiteComponent},
  {path: 'partite', component: PartitaComponent},
  {path: 'classifica', component: ClassificaComponent},
  {path: 'statistiche/:name', component: StatisticheComponent},
  {path: 'totw', component: TotwComponent}
];
