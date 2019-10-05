import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { ScoreboardService } from '../../services/scoreboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() error: string | null;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loading = false;

  constructor( private router: Router,
               private scoreboardService: ScoreboardService,
               private alertService: AlertService) {

  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.scoreboardService.login(this.form.value)
      .pipe(first())
      .subscribe(
        session => {
          console.log('success', session),
          this.router.navigate(['/admin']);
          this.loading = false;
        },
        error => {
          this.alertService.showError(error);
          this.loading = false;
        }
      );
    }
  }
}
