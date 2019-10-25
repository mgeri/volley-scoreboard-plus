export class KeyboardShortcuts {
  homePointUp: string;
  homePointDown: string;
  homeSetUp: string;
  homeSetDown: string;
  homeTimeout: string;
  homeVideoCheck: string;
  awayPointUp: string;
  awayPointDown: string;
  awaySetUp: string;
  awaySetDown: string;
  awayTimeout: string;
  awayVideoCheck: string;
  ballOwnerSwitch: string;
  newMatch: string;
  newSet: string;

  constructor() {
    this.homePointUp = '1';
    this.homePointDown = '2';
    this.homeSetUp = '3';
    this.homeSetDown = '4';
    this.homeTimeout = 'Q';
    this.homeVideoCheck = 'W';

    this.awayPointUp = '9';
    this.awayPointDown = '0';
    this.awaySetUp = '7';
    this.awaySetDown = '8';
    this.awayTimeout = 'P';
    this.awayVideoCheck = 'O';

    this.ballOwnerSwitch = 'B';
    this.newMatch = 'M';
    this.newSet = 'S';

  }
}
