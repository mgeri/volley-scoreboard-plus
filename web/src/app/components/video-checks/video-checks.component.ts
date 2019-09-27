import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-checks',
  templateUrl: './video-checks.component.html',
  styleUrls: ['./video-checks.component.scss']
})
export class VideoChecksComponent implements OnInit {

  @Input() home = 0;
  @Input() away = 0;
  @Input() name = 'Video Checks';
  @Input() bg = '#FF0000';

  constructor() {
  }

  ngOnInit() {
  }

}
