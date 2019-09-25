import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ScoreboardService } from './../../services/scoreboard.service';
import { first } from 'rxjs/operators';
import { ErrorResponse } from 'src/backend';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() error: string | null;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loading = false;
  submitted = false;

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
