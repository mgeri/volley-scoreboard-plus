import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NameComponent } from './name/name.component';
import { PointsComponent } from './points/points.component';
import { SetsComponent } from './sets/sets.component';
import { TimeoutsComponent } from './timeouts/timeouts.component';

import { ApiModule, BASE_PATH } from '../backend';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NameComponent,
    PointsComponent,
    SetsComponent,
    TimeoutsComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    HttpClientModule
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
  bootstrap: [AppComponent]
})


export class AppModule { }
