import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'volley-gui';

  setName = 'Set';
  timeoutName = 'Timeout';
  homeName = 'HOME';
  awayName = 'AWAY';

  bg = '#102030';
  fg = '#FFFFFF';

  homeBg = '#10B090';
  homeFg = '#FFFFFF';

  awayBg = '#20C0F0';
  awayFg = '#EEFF88';

  pointsBg = '#0B3060';
  pointsFg = '#FFFFFF';

  setsBg = '#0B3060';
  setsFg = '#FFFFFF';

  timeoutsBg = '#FF0000';

  homePoints = 13;
  awayPoints = 8;

  homeSets = 1;
  awaySets = 0;

  homeTimeouts = 1;
  awayTimeouts = 0;

  ballOwner = 1;

  interval: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
/*
    this.interval = setInterval(() => {
      this.httpClient.get('http://localhost/status').subscribe((data: any) => {
        console.log('Ok');
      }, (error: any) => {
        console.log('Error');
      });
    },5000)
*/
  }

}
