import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() homePointSwipeUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() homePointSwipeDown: EventEmitter<void> = new EventEmitter<void>();
  @Output() awayPointSwipeUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() awayPointSwipeDown: EventEmitter<void> = new EventEmitter<void>();
  @Output() currentSetTap: EventEmitter<void> = new EventEmitter<void>();
  @Output() homeSetSwipeUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() homeSetSwipeDown: EventEmitter<void> = new EventEmitter<void>();
  @Output() awaySetSwipeUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() awaySetSwipeDown: EventEmitter<void> = new EventEmitter<void>();
  @Output() homeTimeoutTap: EventEmitter<void> = new EventEmitter<void>();
  @Output() homeVideoCheckTap: EventEmitter<void> = new EventEmitter<void>();
  @Output() awayTimeoutTap: EventEmitter<void> = new EventEmitter<void>();
  @Output() awayVideoCheckTap: EventEmitter<void> = new EventEmitter<void>();

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

  getLogoUrl(): string {
    return this.scoreboardService.getLogoUrl();
  }

  isHeaderVisible(): boolean {
    return this.showHeader && this.prefs.showHeader;
  }

  getTeamBallOwner(): TeamBallOwner {
    if (this.status == null) { return TeamBallOwner.None; }
    return this.status.ballOwner;
  }

}
