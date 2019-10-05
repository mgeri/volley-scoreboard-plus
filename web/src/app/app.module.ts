import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

// services

// api
import { ApiModule, BASE_PATH } from '../backend';

// environment
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { UpDownComponent } from './components/up-down/up-down.component';
import { VideoChecksComponent } from './components/video-checks/video-checks.component';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    LoginComponent,
    NameComponent,
    PointsComponent,
    PreferencesComponent,
    ScoreboardComponent,
    SetsComponent,
    TimeoutsComponent,
    UpDownComponent,
    VideoChecksComponent
  ],
  imports: [
    ApiModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    NgbModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    MatSelectModule
  ],
  entryComponents: [
    PreferencesComponent
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
