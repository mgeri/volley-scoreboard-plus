import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// components
import { AppComponent } from './app.component';
import { NameComponent } from './components/name/name.component';
import { PointsComponent } from './components/points/points.component';
import { SetsComponent } from './components/sets/sets.component';
import { TimeoutsComponent } from './components/timeouts/timeouts.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
} from '@angular/material';

// services

// api
import { ApiModule, BASE_PATH } from '../backend';

// environment
import { environment } from '../environments/environment';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NameComponent,
    PointsComponent,
    SetsComponent,
    TimeoutsComponent,
    LoginComponent,
    ScoreboardComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ApiModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
