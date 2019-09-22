import { Session } from './../../backend/model/session';
import { Credentials } from './../../backend/model/credentials';
import { ScoreboardPrefs } from './../../backend/model/scoreboardPrefs';
import { DefaultService } from './../../backend/api/default.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService, ScoreboardStatus, ScoreboardMessage } from 'src/backend';
import { WebSocketService } from './websocket.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScoreboardService {

  private readonly status = new BehaviorSubject<ScoreboardStatus>({
    home: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
    away: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
    ballOwner: 'none'
  });

  private readonly prefs = new BehaviorSubject<ScoreboardPrefs>(null);

  private readonly session = new BehaviorSubject<Session>(null);

  // Expose the observable$ part
  readonly status$ = this.status.asObservable();
  readonly prefs$ = this.prefs.asObservable();
  readonly session$ = this.session.asObservable();

  getStatus(): ScoreboardStatus {
    return this.status.getValue();
  }

  getPrefs(): ScoreboardPrefs {
    return this.prefs.getValue();
  }

  getSession(): Session {
    return this.session.getValue();
  }

  constructor(private webSocketService: WebSocketService,
              private defaultService: DefaultService,
              private sessionService: SessionService) {
    this.webSocketService.connect().subscribe({
      next: (message: ScoreboardMessage) => {
        if (message.status) {
          this.status.next(message.status);
        }
        if (message.prefs) {
          this.prefs.next(message.prefs);
        }
      },
      error: (err: any) => {
        console.log('WebSocketService error:' + err);
      },
      complete: () => {
        console.log('WebSocketService complete');
      }
    });
  }

  login(credential: Credentials) {
    return this.sessionService.sessionPost(credential).pipe(map(session => {
      // login successful if there's a jwt token in the response
      if (session && session.token) {
          this.session.next(session);
      }

      return session;
    }));
  }

  logout() {
    this.session.next(null);
  }

  newMatch() {
    return this.defaultService.scoreboardStatusPut({
      home: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
      away: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
      ballOwner: 'none'
    });
  }

}
