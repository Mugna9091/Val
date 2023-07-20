import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';

import {AppComponent} from './app.component';
import {HomeComponent} from '../home/home.component';
import {PartiteComponent} from '../partite/partite.component';
import {environment} from "../environments/environments.prod";

import {AppRoutes} from './app.routes';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatisticheComponent} from '../statistiche/statistiche.component';
import {PartitaComponent} from '../partita/partita.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ClassificaComponent} from '../classifica/classifica.component';
import {getDatabase, provideDatabase} from "@angular/fire/database";
import { TotwComponent } from '../totw/totw.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartiteComponent,
    StatisticheComponent,
    PartitaComponent,
    ClassificaComponent,
    TotwComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
