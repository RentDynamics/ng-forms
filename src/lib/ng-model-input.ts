import { Input, Output, EventEmitter, forwardRef, ContentChildren, Component, FactoryProvider, QueryList, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export function noop() { };

export class NgModelInputValueAccessor {
    provide: any = NG_VALUE_ACCESSOR;
    useExisting = this.component;
    multi = true;
    constructor(public component: any) {

    }
}

export class NgModelInput implements ControlValueAccessor {
    @Input() ngModel: any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

    onNgModelChanged: (_: any) => void = noop;
    onNgModelTouched: (_: any) => void = noop;
    ngModelChange$: EventEmitter<any> = new EventEmitter<any>();

    constructor() {

    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onNgModelChanged = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onNgModelTouched = fn;
    }

    setNgModel(newVal) {
        /* write value internally */
        this.writeValue(newVal);
        /* let dual binding provider know you want to change the dual-bound value */
        this.onNgModelChanged(newVal);
    }

    //From ControlValueAccessor interface
    writeValue(newVal: any) {
        this.ngModel = newVal;
        /* emit to one more avenue which is when a sibling component needs to listen to
            any and all value changes in order to do something, not just the internal ones (i.e. SelectTitleDirective) */
        this.ngModelChange$.emit(newVal);
    }
}
