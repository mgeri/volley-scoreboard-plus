import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ScoreboardPrefs, ErrorResponse } from 'src/backend';
import { ScoreboardService } from 'src/app/services/scoreboard.service';
import { takeUntil, debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

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

  addHomePoint(): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomePoints(1).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addAwayPoint(): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addAwayPoints(1).subscribe(
      _ => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
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
