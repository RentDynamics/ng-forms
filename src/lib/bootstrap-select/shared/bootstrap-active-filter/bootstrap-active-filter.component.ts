import {Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rd-bootstrap-active-filter',
  templateUrl: './bootstrap-active-filter.component.html',
})
export class BootstrapActiveFilterComponent {
  @Input() showInactiveItems: boolean = false;
  @Output() activeSwitchChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  activeSwitchChangeHandler(event): void {
    this.activeSwitchChange.emit(event);
  }
}