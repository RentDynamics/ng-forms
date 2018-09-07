import { Directive, Input, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: 'button[rd-datepicker-quick-access-button]',
  host: {
    '[class.active]': "active",
    '(click)': 'click($event)'
  }
})
export class DatepickerQuickAccessButtonDirective {
  @Input() value: any;

  active: boolean = false;
  onClick = new EventEmitter();
  elem: any;

  constructor(elementRef?: ElementRef) {
    if (elementRef) {
      this.elem = elementRef.nativeElement;
    }
  }

  click($event) {
    this.onClick.emit(this);
  }
}