import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-up-down',
  templateUrl: './up-down.component.html',
  styleUrls: ['./up-down.component.scss']
})
export class UpDownComponent implements OnInit {

  @Output() up: EventEmitter<void> = new EventEmitter<void>();
  @Output() down: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
