import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeouts',
  templateUrl: './timeouts.component.html',
  styleUrls: ['./timeouts.component.scss']
})
export class TimeoutsComponent implements OnInit {

  @Input() home = 0;
  @Input() away = 0;
  @Input() name = 'Timeouts';
  @Input() bg = '#FF0000';

  constructor() {
  }

  ngOnInit() {
  }

}
