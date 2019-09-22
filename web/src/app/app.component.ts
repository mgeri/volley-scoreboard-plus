import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'volley-gui';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
