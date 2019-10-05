import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ScoreboardPrefs, ScoreboardStatus, TeamBallOwner } from '../../../backend';
import { ScoreboardService } from '../../services/scoreboard.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})

export class ScoreboardComponent implements OnInit, OnDestroy {
  readonly TeamBallOwner = TeamBallOwner;

  @Input() showHeader = true;

  destroyed$ = new Subject();

  status: ScoreboardStatus;
  prefs: ScoreboardPrefs;

  loading = true;

  constructor(private scoreboardService: ScoreboardService) { }

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

  getTeamBallOwner(): TeamBallOwner {
    if (this.status == null) { return TeamBallOwner.None; }
    return this.status.ballOwner;
  }
}
