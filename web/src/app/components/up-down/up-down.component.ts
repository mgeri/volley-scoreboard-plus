import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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
  constructor(private hotkeysService: HotkeysService) {

  }

  ngOnInit() {
    if (this.upShortcut !== '') {
      this.hotkeysService.add(new Hotkey(this.upShortcut, (event: KeyboardEvent): boolean => {
        this.up.emit();
        return false; // Prevent bubbling
      }));
    }
    if (this.downShortcut !== '') {
      this.hotkeysService.add(new Hotkey(this.downShortcut, (event: KeyboardEvent): boolean => {
        this.down.emit();
        return false; // Prevent bubbling
      }));
    }
  }


}
