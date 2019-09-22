import { ScoreboardService } from './services/scoreboard.service';
import { ScoreboardStatus } from './../backend/model/scoreboardStatus';
import { ScoreboardPrefs } from './../backend/model/scoreboardPrefs';
import { DefaultService } from './../backend/api/default.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, interval } from 'rxjs';
import { WebSocketService } from './services/websocket.service';

import { takeUntil } from 'rxjs/operators';
import { ScoreboardMessage } from 'src/backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  title = 'volley-gui';

  status: ScoreboardStatus;
  prefs: ScoreboardPrefs;

  loading = true;

  constructor(private scoreboardService: ScoreboardService) {
  }

  ngOnInit(): void {
    this.scoreboardService.status$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((status: ScoreboardStatus) => {
      this.status = status;
    });

    this.scoreboardService.prefs$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((prefs: ScoreboardPrefs) => {
      this.prefs = prefs;
      this.loading = (prefs == null);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
