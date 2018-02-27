import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { KEYCODE } from '../shared/keycode.enum';

@Directive({
  selector: '[rdInputKeyup]'
})
export class InputKeyupDirective {
  @Output() onEnter: EventEmitter<any> = new EventEmitter();
  @HostListener('keyup', ['$event']) keyup(event) {
    this.onKeyup(event)
  }

  constructor() { }

  onKeyup(event: KeyboardEvent) {
    if (event.keyCode === KEYCODE.ENTER)
      this.onEnter.emit(event);
  }
}
