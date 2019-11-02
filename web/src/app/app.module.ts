import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// touch gesture
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// components
import { AppComponent } from './app.component';
import { NameComponent } from './components/name/name.component';
import { PointsComponent } from './components/points/points.component';
import { SetsComponent } from './components/sets/sets.component';
import { TimeoutsComponent } from './components/timeouts/timeouts.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { ColorPickerModule } from 'ngx-color-picker';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

// hotkey hosrtcut
import {HotkeyModule} from 'angular2-hotkeys';

// config angular i18n
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ServiceWorkerModule } from '@angular/service-worker';
registerLocaleData(en);

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL }
  } as any;
}


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
    ColorPickerModule,
    FormsModule,
    HttpClientModule,
    HotkeyModule.forRoot(),
    NgbModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    PreferencesComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
