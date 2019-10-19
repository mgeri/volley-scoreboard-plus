import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-checks',
  templateUrl: './video-checks.component.html',
  styleUrls: ['./video-checks.component.scss']
})
export class VideoChecksComponent implements OnInit {

  @Output() homeVideoCheckTap: EventEmitter<void> = new EventEmitter<void>();
  @Output() awayVideoCheckTap: EventEmitter<void> = new EventEmitter<void>();

  @Input() home = 0;
  @Input() away = 0;
  @Input() name = 'Video Checks';
  @Input() bg = '#FF0000';

  constructor() {
  }

  ngOnInit() {
  }

}
