import { Component, OnInit, OnDestroy } from '@angular/core';

import Fireworks from '../../../fireworks/fireworks';
import { ScoreboardPrefs, ScoreboardStatus } from 'src/backend';
import { Subject } from 'rxjs';
import { ScoreboardService } from 'src/app/services/scoreboard.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit, OnDestroy {

  fireworks: Fireworks;

  destroyed$ = new Subject();

  status: ScoreboardStatus;
  prefs: ScoreboardPrefs;

  loading = true;

  winnerTeam = '';
  loserTeam = '';
  winnerSets = 0;
  loserSets = 0;

  constructor(private scoreboardService: ScoreboardService) { }

  ngOnInit() {
    this.scoreboardService.status$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((status: ScoreboardStatus) => {
      this.status = status;
      this.onStatusUpdate();
    });

    this.scoreboardService.prefs$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((prefs: ScoreboardPrefs) => {
      this.prefs = prefs;
      this.loading = (prefs == null);
      this.onStatusUpdate();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onResize(_) {
    if (this.fireworks) {
      this.stopFireworks();
      this.startFireworks();
    }
  }

  onStatusUpdate() {
    if (!this.status || !this.prefs) {
      return;
    }
    if (this.status.showWinner) {
      if (this.status.away.sets > this.status.home.sets) {
        this.winnerTeam = this.prefs.awayName;
        this.loserTeam = this.prefs.homeName;
        this.winnerSets = this.status.away.sets;
        this.loserSets = this.status.home.sets;
        this.stopFireworks();
      } else if (this.status.away.sets < this.status.home.sets) {
        this.winnerTeam = this.prefs.homeName;
        this.loserTeam = this.prefs.awayName;
        this.winnerSets = this.status.home.sets;
        this.loserSets = this.status.away.sets;
        this.startFireworks();
      } else {
        // pair?
        this.winnerTeam = this.prefs.homeName;
        this.loserTeam = this.prefs.awayName;
        this.winnerSets = this.status.home.sets;
        this.loserSets = this.status.away.sets;
        this.stopFireworks();
      }
    } else {
      this.winnerTeam = '';
      this.stopFireworks();
    }
  }

  stopFireworks() {
    if (this.fireworks) {
      this.fireworks.destroy();
      this.fireworks = null;
    }
  }

  startFireworks() {
    if (this.fireworks) {
      return;
    }
    const container = document.getElementById('winner-container');
    if (container) {
      const options = {
        maxRockets: 15,          // max # of rockets to spawn
        rocketSpawnInterval: 150,   // millisends to check if new rockets should spawn
        numParticles: 100,          // number of particles to spawn when rocket explodes (+0-10)
        explosionMinHeight: 0.4,    // percentage. min height at which rockets can explode
        explosionMaxHeight: 0.85,   // percentage. max height before a particle is exploded
        explosionChance: 0.01,       // chance in each tick the rocket will explode
      };

      // instantiate the class and call start
      // this returns a disposable - calling it will stop fireworks.
      this.fireworks = new Fireworks(container, options);
      this.fireworks.start();
    }
  }
}
