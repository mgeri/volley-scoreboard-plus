import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Input() name = 'Name';
  @Input() bg = '#000000';
  @Input() fg = '#FFFFFF';

  constructor() {
  }

  ngOnInit() {
  }

}
