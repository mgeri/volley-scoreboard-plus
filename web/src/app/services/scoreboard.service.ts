import { TeamBallOwner } from './../../backend/model/teamBallOwner';
import { Session } from './../../backend/model/session';
import { Credentials } from './../../backend/model/credentials';
import { ScoreboardPrefs } from './../../backend/model/scoreboardPrefs';
import { DefaultService } from './../../backend/api/default.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SessionService, ScoreboardStatus, ScoreboardMessage, ScoreboardCommand } from 'src/backend';
import { WebSocketService } from './websocket.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Injectable({ providedIn: 'root' })
export class ScoreboardService {

  public readonly ANIM_SPIDER = '#SPIDER#';

  private readonly status = new BehaviorSubject<ScoreboardStatus>({
    home: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
    away: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
    ballOwner: TeamBallOwner.None,
    showWinner: false,
  });

  private readonly prefs = new BehaviorSubject<ScoreboardPrefs>(null);

  private readonly session = new BehaviorSubject<Session>(null);

  private readonly command = new Subject<ScoreboardCommand>();

  // Expose the observable$ part
  readonly status$ = this.status.asObservable();
  readonly prefs$ = this.prefs.asObservable();
  readonly session$ = this.session.asObservable();
  readonly command$ = this.command.asObservable();

  getStatus(): ScoreboardStatus {
    return JSON.parse(JSON.stringify(this.status.getValue()));
  }

  getPrefs(): ScoreboardPrefs {
    return JSON.parse(JSON.stringify(this.prefs.getValue()));
  }

  getSession(): Session {
    return JSON.parse(JSON.stringify(this.session.getValue()));
  }

  constructor(private webSocketService: WebSocketService,
              private defaultService: DefaultService,
              private sessionService: SessionService,
              private hotkeysService: HotkeysService) {

    let basePath = environment.API_BASE_PATH;
    if (!basePath) {
      basePath = window.location.protocol + '//' + window.location.host + '/api/v1';
      this.sessionService.configuration.basePath = basePath;
      this.defaultService.configuration.basePath = basePath;
    }
    this.webSocketService.url = basePath.replace('/api/', '/ws/');


    this.webSocketService.connect().subscribe({
      next: (message: ScoreboardMessage) => {
        if (message.status) {
          this.status.next(message.status);
        }
        if (message.prefs) {
          this.prefs.next(message.prefs);
        }
        if (message.command) {
          this.command.next(message.command);
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

  isAuthenticated(): boolean {
    const session = this.session.getValue();
    return (session != null && session.token != null && session.token.length > 0);
  }


  login(credential: Credentials) {
    return this.sessionService.sessionPost(credential).pipe(map(session => {
      // login successful if there's a jwt token in the response
      if (session && session.token) {
        this.defaultService.configuration.accessToken = session.token;
        this.session.next(session);
      }

      return session;
    }));
  }

  logout() {
    this.session.next(null);
  }

  getLogoUrl(): string {
    return `${this.defaultService.configuration.basePath}/logo`;
  }

  newMatch(): Observable<ScoreboardStatus> {
    return this.defaultService.scoreboardStatusPut({
      home: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
      away: { points: 0, sets: 0, timeouts: 0, videoChecks: 0 },
      ballOwner: TeamBallOwner.None,
      showWinner: false,
    });
  }

  newSet(showWinner: boolean = false): Observable<ScoreboardStatus> {
    const status = this.getStatus();

    if (status.home.points > status.away.points) {
      status.home.sets++;
    } else if (status.away.points > status.home.points) {
      status.away.sets++;
    }
    status.home.points = 0;
    status.away.points = 0;
    status.home.timeouts = 0;
    status.away.timeouts = 0;
    status.home.videoChecks = 0;
    status.away.videoChecks = 0;
    status.ballOwner = TeamBallOwner.None;
    status.showWinner = showWinner;

    return this.defaultService.scoreboardStatusPut(status);
  }

  addHomePoints(points = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.home.points += points;
    if (status.home.points < 0) { status.home.points = 0; }
    if (points > 0) { status.ballOwner = TeamBallOwner.Home; }
    return this.defaultService.scoreboardStatusPut(status);
  }

  addAwayPoints(points = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.away.points += points;
    if (status.away.points < 0) { status.away.points = 0; }
    if (points > 0) { status.ballOwner = TeamBallOwner.Away; }
    return this.defaultService.scoreboardStatusPut(status);
  }

  addHomeSets(sets = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.home.sets += sets;
    if (status.home.sets < 0) { status.home.sets = 0; }
    if (status.home.sets > 9) { status.home.sets = 9; }
    return this.defaultService.scoreboardStatusPut(status);
  }

  addAwaySets(sets = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.away.sets += sets;
    if (status.away.sets < 0) { status.away.sets = 0; }
    if (status.away.sets > 9) { status.away.sets = 9; }
    return this.defaultService.scoreboardStatusPut(status);
  }

  addHomeTimeouts(timeouts = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.home.timeouts += timeouts;
    if (status.home.timeouts < 0) { status.home.timeouts = 0; }
    status.home.timeouts = status.home.timeouts % 3;
    return this.defaultService.scoreboardStatusPut(status);
  }

  addAwayTimeouts(timeouts = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.away.timeouts += timeouts;
    if (status.away.timeouts < 0) { status.away.timeouts = 0; }
    status.away.timeouts = status.away.timeouts % 3;
    return this.defaultService.scoreboardStatusPut(status);
  }

  addHomeVideoChecks(videoChecks = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.home.videoChecks += videoChecks;
    if (status.home.videoChecks < 0) { status.home.videoChecks = 0; }
    status.home.videoChecks = status.home.videoChecks % 3;
    return this.defaultService.scoreboardStatusPut(status);
  }

  addAwayVideoChecks(videoChecks = 1): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.away.videoChecks += videoChecks;
    if (status.away.videoChecks < 0) { status.away.videoChecks = 0; }
    status.away.videoChecks = status.away.videoChecks % 3;
    return this.defaultService.scoreboardStatusPut(status);
  }

  setBallOwner(ballOwner = TeamBallOwner.None): Observable<ScoreboardStatus> {
    const status = this.getStatus();
    status.ballOwner = ballOwner;
    return this.defaultService.scoreboardStatusPut(status);
  }

  resetPrefs(): Observable<ScoreboardPrefs> {
    return this.defaultService.scoreboardPrefsDelete();
  }

  loadDefaultPrefs(): Observable<ScoreboardPrefs> {
    return this.defaultService.scoreboardPrefsDefaultGet();
  }

  updatePrefs(prefs: ScoreboardPrefs): Observable<ScoreboardPrefs> {
    return this.defaultService.scoreboardPrefsPut(prefs);
  }

  sendCommand(cmd: ScoreboardCommand): Observable<ScoreboardCommand> {
    return this.defaultService.scoreboardCommandPost(cmd);
  }

  resetShortcuts(): void {
    this.hotkeysService.reset();
  }

  addShortcutNoCase(key: string,
                    callback: (event: KeyboardEvent, combo: string) => ExtendedKeyboardEvent | boolean): void {
    if (key && key !== '') {
      this.hotkeysService.add(new Hotkey(key.toUpperCase() , callback));
      this.hotkeysService.add(new Hotkey(key.toLowerCase() , callback));
    }
  }

  addShortcut(key: string,
              callback: (event: KeyboardEvent, combo: string) => ExtendedKeyboardEvent | boolean): void {
    if (key && key !== '') {
      this.hotkeysService.add(new Hotkey(key , callback));
    }
  }

}
