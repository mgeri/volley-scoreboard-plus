import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ScoreboardPrefs, ErrorResponse, TeamBallOwner } from 'src/backend';
import { ScoreboardService } from 'src/app/services/scoreboard.service';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild('scoreboard', {static: false}) scoreboard: ScoreboardComponent;

  destroyed$ = new Subject();

  prefs: ScoreboardPrefs;

  loading = true;
  disabled = false;

  constructor(private scoreboardService: ScoreboardService,
              private alertService: AlertService) {
  }

  ngOnInit() {
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

  addHomePoint(points: number): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomePoints(points).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addAwayPoint(points: number): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addAwayPoints(points).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addHomeSet(points: number): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomeSets(points).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addAwaySet(points: number): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addAwaySets(points).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addHomeTimeout() {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomeTimeouts(1).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addAwayTimeout() {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addAwayTimeouts(1).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    )
  }

  addHomeVideoCheck() {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomeVideoChecks(1).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addAwayVideoCheck() {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addAwayVideoChecks(1).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    )
  }

  private setBallOwner(teamBallOwner: TeamBallOwner): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.setBallOwner(teamBallOwner).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  switchBallOwner(): void {
    if (this.scoreboard == null) { return; }
    const teamBallOwner: TeamBallOwner = this.scoreboard.getTeamBallOwner();
    this.setBallOwner(teamBallOwner === TeamBallOwner.Home ? TeamBallOwner.Away : TeamBallOwner.Home);
  }

  newMatch(): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.newMatch().subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

}
