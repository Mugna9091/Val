import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from '../home/home.component';
import {PartiteComponent} from '../partite/partite.component';

import {AppRoutes} from './app.routes';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatisticheComponent} from '../statistiche/statistiche.component';
import {PartitaComponent} from '../partita/partita.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClassificaComponent } from '../classifica/classifica.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartiteComponent,
    StatisticheComponent,
    PartitaComponent,
    ClassificaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
