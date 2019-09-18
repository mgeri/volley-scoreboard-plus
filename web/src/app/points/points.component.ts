import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  @Input() points = 0;
  @Input() bg = '#000000';
  @Input() fg = '#FFFFFF';

  constructor() {
  }

  ngOnInit() {
  }

}
