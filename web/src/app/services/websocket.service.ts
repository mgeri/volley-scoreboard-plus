import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, retryWhen, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {

  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  public url = 'ws://127.0.0.1:4000/ws/v1';

  connect(): Observable<any> {
    // return this.store.pipe(select(getApiUrl)).pipe(
    return of(this.url).pipe(
      filter(apiUrl => !!apiUrl),
      // https becomes wws, http becomes ws
      map(apiUrl => apiUrl.replace(/^http/, 'ws')),
      switchMap(wsUrl => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
    );
  }

  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }

  send(data: any) {
    // if (this.connection$) {
    //   this.connection$.next(data);
    // } else {
    //   console.error('Did not send data, open a connection first');
    // }
  }

  ngOnDestroy() {
    this.closeConnection();
  }

}
