import { ScoreboardStatus } from './../backend/model/scoreboardStatus';
import { ScoreboardPrefs } from './../backend/model/scoreboardPrefs';
import { DefaultService } from './../backend/api/default.service';
import { Component, OnInit } from '@angular/core';

import { Subject, interval } from 'rxjs';
import { WebSocketService } from './services/WebSocketService';

import { takeUntil } from 'rxjs/operators';
import { ScoreboardMessage } from 'src/backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  destroyed$ = new Subject();

  title = 'volley-gui';

  loading = true;

  status: ScoreboardStatus = {
    home: { points: 0, sets: 0, timeouts: 0, videoChecks: 0},
    away: { points: 0, sets: 0, timeouts: 0, videoChecks: 0},
    ballOwner: 'none',
  };

  prefs: ScoreboardPrefs;

  // setName = 'Set';
  // timeoutName = 'Timeout';
  // homeName = 'HOME';
  // awayName = 'AWAY';

  // bg = '#102030';
  // fg = '#FFFFFF';

  // homeBg = '#10B090';
  // homeFg = '#FFFFFF';

  // awayBg = '#20C0F0';
  // awayFg = '#EEFF88';

  // pointsBg = '#0B3060';
  // pointsFg = '#FFFFFF';

  // setsBg = '#0B3060';
  // setsFg = '#FFFFFF';

  // timeoutsBg = '#FF0000';

  // homePoints = 13;
  // awayPoints = 8;

  // homeSets = 1;
  // awaySets = 0;

  // homeTimeouts = 1;
  // awayTimeouts = 0;

  // ballOwner = 1;

  constructor(private webSocketService: WebSocketService,
              private defaultService: DefaultService) {
  }

  ngOnInit(): void {

    this.webSocketService.connect().pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (message: ScoreboardMessage) => {
        if (message.status) {
          this.status = message.status;
        }
        if (message.prefs) {
          this.prefs = message.prefs;
          if (this.loading) {
            this.loading = false;
          }
        }
      },
      error: (err: any) => {
        console.log('WebSocketService error:' +  err);
      },
      complete: () => {
        console.log('WebSocketService complete');
      }
    });

// //    const prefsReq = interval(1000).subscribe((_) => {
//     this.defaultService.scoreboardPrefsGet().subscribe((prefs: ScoreboardPrefs) => {
//         this.prefs = prefs;
//         this.loading = false;
// //        prefsReq.unsubscribe();
//       });
//  //   });

//       const statusReq = interval(5000).subscribe((_) => {
//         this.defaultService.scoreboardStatusGet().subscribe((status: ScoreboardStatus) => {
//           this.status = status;
// //          statusReq.unsubscribe();
//         });
//       });
  }

}
