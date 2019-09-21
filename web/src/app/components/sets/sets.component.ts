import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {

  @Input() sets = 0;
  @Input() bg = '#000000';
  @Input() fg = '#FFFFFF';

  constructor() {
  }

  ngOnInit() {
  }

}
