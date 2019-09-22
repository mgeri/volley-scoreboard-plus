import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ScoreboardPrefs, ScoreboardStatus } from 'src/backend';
import { Subject } from 'rxjs';
import { ScoreboardService } from 'src/app/services/scoreboard.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})

export class ScoreboardComponent implements OnInit, OnDestroy {

  @Input()
  showHeader = true;

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

}
