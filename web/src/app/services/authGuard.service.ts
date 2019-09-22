import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ScoreboardService } from './scoreboard.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(private scoreboardService: ScoreboardService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (!this.scoreboardService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
