import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[rd-datepicker-toggle-button]'
})
export class DatepickerToggleButtonDirective {
  elem: any;

  constructor(elementRef?: ElementRef) {
    if (elementRef) {
      this.elem = elementRef.nativeElement;
    }
  }
}