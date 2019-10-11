import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { ScoreboardService } from '../../services/scoreboard.service';
import { ScoreboardPrefs } from 'src/backend';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Input() error: string | null;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  destroyed$ = new Subject();

  prefs: ScoreboardPrefs;

  loading = true;
  waitingLoginRes = false;


  constructor( private router: Router,
               private scoreboardService: ScoreboardService,
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

  getLogoUrl(): string {
    return this.scoreboardService.getLogoUrl();
  }

  submit() {
    if (this.form.valid) {
      this.scoreboardService.login(this.form.value)
      .pipe(first())
      .subscribe(
        session => {
          console.log('success', session),
          this.router.navigate(['/admin']);
          this.waitingLoginRes = false;
        },
        error => {
          this.alertService.showError(error);
          this.waitingLoginRes = false;
        }
      );
    }
  }
}
