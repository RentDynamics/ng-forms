import { Component, ContentChildren, Directive, Input, OnInit, Optional, Output, ElementRef, EventEmitter, AfterViewInit, HostListener, QueryList } from '@angular/core';

import { NgModelInput } from '../../ng-model-input';
import { DropdownBuilderComponent } from './dropdown-builder/index';
import { DATE_TYPE_ENUM } from './date-type.enum';

@Directive({
  selector: '[rd-datepicker-toggle-button]'
})
export class DatepickerToggleButton {
    elem: any;

    constructor(elementRef: ElementRef) {
        this.elem = elementRef.nativeElement;
    }
}

@Directive({
  selector: 'button[rd-datepicker-quick-access-button]',
  host: {
    '[class.active]': "active",
    '(click)': 'click($event)'
  }
})
export class DatepickerQuickAccessButton {
    @Input() value: any;

    active: boolean = false;
    onClick = new EventEmitter();
    elem: any;

    constructor(elementRef: ElementRef) {
      this.elem = elementRef.nativeElement;
    }

    click($event){
      this.onClick.emit(this);
    }
}

export class DatepickerHelper extends NgModelInput {
    calendarElem: HTMLElement;
    elem: HTMLElement;
    open: boolean = false;
    outputType: DATE_TYPE_ENUM;
    pickmeup: any;

    constructor(){
      super();
    }

    toggle(newVal) {
        this.open = newVal;
    }
}
