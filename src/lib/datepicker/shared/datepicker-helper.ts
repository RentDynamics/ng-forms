import { Component, ContentChildren, Directive, Input, OnInit, Optional, Output, ElementRef, EventEmitter, AfterViewInit, HostListener, QueryList } from '@angular/core';

import { NgModelInput } from '../../ng-model-input';
import { DATE_TYPE_ENUM } from './date-type.enum';


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
