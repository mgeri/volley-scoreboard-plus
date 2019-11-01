import { Component, OnInit, OnDestroy } from '@angular/core';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'Volley Scoreboard Plus';
  public version: string = version;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
