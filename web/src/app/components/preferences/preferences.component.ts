import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ScoreboardPrefs } from '../../../backend';
import { ScoreboardService } from '../../services/scoreboard.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements AfterViewChecked, AfterViewInit, OnInit {

  @Input() formData: ScoreboardPrefs;
  @Input() newMatch = false;

  formGroup: FormGroup;

  disabled = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private alertService: AlertService,
              private scoreboardService: ScoreboardService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      bg: new FormControl(null, Validators.required),
      fg: new FormControl(null, Validators.required),
      setName: new FormControl(null, Validators.required),
      setBg: new FormControl(null, Validators.required),
      setFg: new FormControl(null, Validators.required),
      timeoutName: new FormControl(null, Validators.required),
      timeoutBg: new FormControl(null, Validators.required),
      videoCheckName: new FormControl(null, Validators.required),
      videoCheckBg: new FormControl(null, Validators.required),
      pointBg: new FormControl(null, Validators.required),
      pointFg: new FormControl(null, Validators.required),
      homeName: new FormControl(null, Validators.required),
      homeBg: new FormControl(null, Validators.required),
      homeFg: new FormControl(null, Validators.required),
      awayName: new FormControl(null, Validators.required),
      awayBg: new FormControl(null, Validators.required),
      awayFg: new FormControl(null, Validators.required)
    });

    this.formGroup.valueChanges.subscribe((formValue: any) => {
      this.formData.bg = formValue.bg;
      this.formData.fg = formValue.fg;
      this.formData.setName = formValue.setName;
      this.formData.setBg = formValue.setBg;
      this.formData.setFg = formValue.setFg;
      this.formData.timeoutName = formValue.timeoutName;
      this.formData.timeoutBg = formValue.timeoutBg;
      this.formData.videoCheckName = formValue.videoCheckName;
      this.formData.videoCheckBg = formValue.videoCheckBg;
      this.formData.pointBg = formValue.pointBg;
      this.formData.pointFg = formValue.pointFg;
      this.formData.homeName = formValue.homeName;
      this.formData.homeBg = formValue.homeBg;
      this.formData.homeFg = formValue.homeFg;
      this.formData.awayName = formValue.awayName;
      this.formData.awayBg = formValue.awayBg;
      this.formData.awayFg = formValue.awayFg;
    });
  }

  ngAfterViewInit(): void {
    this.formGroup.patchValue({
      bg: this.formData.bg,
      fg: this.formData.fg,
      setName: this.formData.setName,
      setBg: this.formData.setBg,
      setFg: this.formData.setFg,
      timeoutName: this.formData.timeoutName,
      timeoutBg: this.formData.timeoutBg,
      videoCheckName: this.formData.videoCheckName,
      videoCheckBg: this.formData.videoCheckBg,
      pointBg: this.formData.pointBg,
      pointFg: this.formData.pointFg,
      homeName: this.formData.homeName,
      homeBg: this.formData.homeBg,
      homeFg: this.formData.homeFg,
      awayName: this.formData.awayName,
      awayBg: this.formData.awayBg,
      awayFg: this.formData.awayFg,
    });
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  updatePrefs(): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.updatePrefs(this.formData).subscribe(
      _ => {
        if (this.newMatch) {
          this.scoreboardService.newMatch().subscribe(
            _ => {
              this.disabled = false;
              this.activeModal.close(0);
            },
            error => {
              this.disabled = false;
              this.alertService.showError(error);
            }
          );
        } else {
          this.disabled = false;
          this.activeModal.close(0);
        }
      },
      error => {
        this.disabled = false;
        this.alertService.showError(error);
      }
    );
  }

  dismissModal(): void {
    this.activeModal.dismiss(1);
  }
}
