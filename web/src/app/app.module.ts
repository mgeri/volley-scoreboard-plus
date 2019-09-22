import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { NameComponent } from './components/name/name.component';
import { PointsComponent } from './components/points/points.component';
import { SetsComponent } from './components/sets/sets.component';
import { TimeoutsComponent } from './components/timeouts/timeouts.component';

// services
import { WebSocketService } from './services/websocket.service';


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
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    WebSocketService],
  bootstrap: [AppComponent]
})


export class AppModule { }
