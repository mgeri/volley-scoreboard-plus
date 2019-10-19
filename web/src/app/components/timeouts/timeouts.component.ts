import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeouts',
  templateUrl: './timeouts.component.html',
  styleUrls: ['./timeouts.component.scss']
})
export class TimeoutsComponent implements OnInit {

  @Output() homeTimeoutTap: EventEmitter<void> = new EventEmitter<void>();
  @Output() awayTimeoutTap: EventEmitter<void> = new EventEmitter<void>();

  @Input() home = 0;
  @Input() away = 0;
  @Input() name = 'Timeouts';
  @Input() bg = '#FF0000';

  constructor() {
  }

  ngOnInit() {
  }

}
