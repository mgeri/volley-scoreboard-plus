import { Component, OnInit } from '@angular/core';

import * as FireworksCanvas from 'fireworks-canvas';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  fireworks: FireworksCanvas;

  constructor() { }

  ngOnInit() {
    const container = document.getElementById('winner-fireworks-container');
    const options = {
      maxRockets: 99999,            // max # of rockets to spawn
      rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
      numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
      explosionMinHeight: 0.6,  // percentage. min height at which rockets can explode
      explosionMaxHeight: 0.9,  // percentage. max height before a particle is exploded
      explosionChance: 0.08      // chance in each tick the rocket will explode
    };

    // instantiate the class and call start
    // this returns a disposable - calling it will stop fireworks.
    this.fireworks = new FireworksCanvas(container, options);
    this.fireworks.start();
  }

}
