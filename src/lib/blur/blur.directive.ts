import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

import { isBlur } from '../helpers';

@Directive({
  selector: '[rdBlur]',
  host: {
    '(window:click)': 'onWindowClick($event)'
  }
})
export class BlurDirective {
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  private elem: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.elem = elementRef.nativeElement;
  }

  onWindowClick($event) {
    if (isBlur($event, this.elem))
      return this.blur.emit($event);
  }

}
