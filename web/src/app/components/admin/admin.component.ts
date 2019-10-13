import { KeyboardShortcuts } from '../../models/keyboardShortcuts.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ScoreboardPrefs, TeamBallOwner } from '../../../backend';
import { AlertService } from '../../services/alert.service';
import { ScoreboardService } from '../../services/scoreboard.service';
import { PreferencesComponent } from '../preferences/preferences.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { NzModalService } from 'ng-zorro-antd';
import Swal from 'sweetalert2';


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

  keyboardShortcuts = new KeyboardShortcuts();


  constructor(private scoreboardService: ScoreboardService,
              private alertService: AlertService,
              private ngbModalService: NgbModal,
              private hotkeysService: HotkeysService,
              private modalService: NzModalService) {
                this.registerKeyboardShortcuts();
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

  registerKeyboardShortcuts() {
    this.hotkeysService.reset();
    if (this.keyboardShortcuts.newMatch && this.keyboardShortcuts.newMatch !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.newMatch , (event: KeyboardEvent): boolean => {
        this.newMatch();
        return false; // Prevent bubbling
      }));
    }
    if (this.keyboardShortcuts.newSet && this.keyboardShortcuts.newSet !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.newSet , (event: KeyboardEvent): boolean => {
        this.newSet();
        return false; // Prevent bubbling
      }));
    }
    if (this.keyboardShortcuts.homeTimeout && this.keyboardShortcuts.homeTimeout !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.homeTimeout , (event: KeyboardEvent): boolean => {
        this.addHomeTimeout();
        return false; // Prevent bubbling
      }));
    }
    if (this.keyboardShortcuts.homeVideoCheck && this.keyboardShortcuts.homeVideoCheck !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.homeVideoCheck , (event: KeyboardEvent): boolean => {
        this.addHomeVideoCheck();
        return false; // Prevent bubbling
      }));
    }
    if (this.keyboardShortcuts.awayTimeout && this.keyboardShortcuts.awayTimeout !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.awayTimeout , (event: KeyboardEvent): boolean => {
        this.addAwayTimeout();
        return false; // Prevent bubbling
      }));
    }
    if (this.keyboardShortcuts.awayVideoCheck && this.keyboardShortcuts.awayVideoCheck !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.awayVideoCheck , (event: KeyboardEvent): boolean => {
        this.addAwayVideoCheck();
        return false; // Prevent bubbling
      }));
    }
    if (this.keyboardShortcuts.ballOwnerSwitch && this.keyboardShortcuts.ballOwnerSwitch !== '') {
      this.hotkeysService.add(new Hotkey(this.keyboardShortcuts.ballOwnerSwitch , (event: KeyboardEvent): boolean => {
        this.switchBallOwner();
        return false; // Prevent bubbling
      }));
    }
  }

  addHomePoint(points: number): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomePoints(points).subscribe(
      ignored => {
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
      ignored => {
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
      ignored => {
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
      ignored => {
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
      ignored => {
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
      ignored => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  addHomeVideoCheck() {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.addHomeVideoChecks(1).subscribe(
      ignored => {
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
      ignored => {
        this.disabled = false;
      },
      error => {
        this.alertService.showError(error);
        this.disabled = false;
      }
    );
  }

  private setBallOwner(teamBallOwner: TeamBallOwner): void {
    if (this.disabled) { return; }
    this.disabled = true;
    this.scoreboardService.setBallOwner(teamBallOwner).subscribe(
      ignored => {
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
    const ngbModalRef = this.ngbModalService.open(PreferencesComponent, {
      backdrop : 'static',
      centered: true,
      keyboard : true,
      size: 'lg'
    });
    ngbModalRef.componentInstance.formData = JSON.parse(JSON.stringify(this.prefs));
    ngbModalRef.componentInstance.newMatch = true;
    ngbModalRef.result.then((ignored: any) => {
      this.disabled = false;
    }, (ignored: any) => {
      this.disabled = false;
    });
  }

  newSet(): void {
    if (this.disabled) { return; }

    Swal.fire({
      title: 'Are you sure to start New Set?',
      type: 'question',
      showCancelButton: true,
//      confirmButtonColor: '#3085d6',
//      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Start New Set!'
    }).then((result) => {
      if (result.value) {
        this.disabled = true;
        this.scoreboardService.newSet().subscribe(
          ignored => {
            this.disabled = false;
          },
          error => {
            this.alertService.showError(error);
            this.disabled = false;
          }
        );
      }
    });
  }

  openSettings(): void {
    const ngbModalRef = this.ngbModalService.open(PreferencesComponent, {
      backdrop : 'static',
      centered: true,
      keyboard : true,
      size: 'lg'
    });
    ngbModalRef.componentInstance.formData = JSON.parse(JSON.stringify(this.prefs));
  }

}
