import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ScoreboardService } from 'src/app/services/scoreboard.service';

@Component({
  selector: 'app-up-down',
  templateUrl: './up-down.component.html',
  styleUrls: ['./up-down.component.scss']
})
export class UpDownComponent implements OnInit {

  @Output() up: EventEmitter<void> = new EventEmitter<void>();
  @Output() down: EventEmitter<void> = new EventEmitter<void>();

  @Input() upShortcut = '';
  @Input() downShortcut = '';

  test = '';
  constructor(private scoreboardService: ScoreboardService) {

  }

  ngOnInit() {
    this.scoreboardService.addShortcutNoCase(this.upShortcut, (event: KeyboardEvent): boolean => {
        this.up.emit();
        return false; // Prevent bubbling
    });

    this.scoreboardService.addShortcutNoCase(this.downShortcut, (event: KeyboardEvent): boolean => {
      this.down.emit();
      return false; // Prevent bubbling
    });
  }

}
