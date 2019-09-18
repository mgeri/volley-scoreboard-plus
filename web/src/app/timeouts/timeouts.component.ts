import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeouts',
  templateUrl: './timeouts.component.html',
  styleUrls: ['./timeouts.component.scss']
})
export class TimeoutsComponent implements OnInit {

  @Input() timeouts = 0;
  @Input() name = 'Timeouts';
  @Input() bg = '#FF0000';

  constructor() {
  }

  ngOnInit() {
  }

}
