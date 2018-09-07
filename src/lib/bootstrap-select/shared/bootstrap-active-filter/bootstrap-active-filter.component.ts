import {Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rd-bootstrap-active-filter',
  templateUrl: './bootstrap-active-filter.component.html',
})
export class BootstrapActiveFilterComponent {
  @Input() showInactiveItems: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onChange(event): void {
    this.change.emit(event);
  }
}