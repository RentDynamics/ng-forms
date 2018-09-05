import { Directive, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

import { Select } from './select';

@Directive({
  selector: '[rdSelectToggleBtn]',
})
export class SelectToggleBtnDirective implements OnInit {
  @Input() select: Select;
  @HostListener('click', ['$event']) click() {
    this.select.open = !this.select.open;
  }

  constructor() { }

  ngOnInit() {
    if (!this.select)
      throw Error('Select not provided to SelectToggleBtnDirective');
  }
}
