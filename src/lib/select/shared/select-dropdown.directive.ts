import { AfterViewInit, Directive, Input, Output, OnChanges, EventEmitter, HostBinding, HostDecorator, HostListener, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { Select } from './select';

@Directive({
  selector: '[rdSelectDropdown]',
})
export class SelectDropdownDirective implements OnInit {
  @Input() select: Select;
  @HostBinding('style.display') get isOpen() {
    return this.select.open ? "block" : "none";
  }

  constructor() { }

  ngOnInit() {
    if (!this.select)
      throw Error('Select not provided to SelectDropdownDirective');
  }

}
