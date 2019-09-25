import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ScoreboardPrefs, ErrorResponse } from 'src/backend';
import { ScoreboardService } from 'src/app/services/scoreboard.service';
import { takeUntil } from 'rxjs/operators';
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
    this.scoreboardService.addHomePoints(1).subscribe(
      _ => { },
      error => {
        this.alertService.showError(error);
      }
    );
  }

  addAwayPoint(): void {
    this.scoreboardService.addAwayPoints(1).subscribe(
      _ => { },
      error => {
        this.alertService.showError(error);
      }
    );
  }

  newMatch(): void {
    this.scoreboardService.newMatch().subscribe(
      _ => { },
      error => {
        this.alertService.showError(error);
      }
    );
  }

}
