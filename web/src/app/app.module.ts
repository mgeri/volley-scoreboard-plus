import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NameComponent } from './name/name.component';
import { PointsComponent } from './points/points.component';
import { SetsComponent } from './sets/sets.component';
import { TimeoutsComponent } from './timeouts/timeouts.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
