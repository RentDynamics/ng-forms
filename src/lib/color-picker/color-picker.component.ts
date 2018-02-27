import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgModelInput, NgModelInputValueAccessor } from '../ng-model-input';
import { Color } from './shared';

export function providers() {
  return [
    new NgModelInputValueAccessor(ColorPickerComponent)
  ];
}

@Component({
    selector: 'rd-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.less'],
    providers: providers()
})
export class ColorPickerComponent extends NgModelInput implements OnInit {
    @Input() open: boolean = false;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

    private elem: HTMLElement;

    constructor(elementRef: ElementRef) {
        super();
        this.elem = elementRef.nativeElement;
    }

    ngOnInit() {

    }

    onClick($event: UIEvent) {
        $event.preventDefault();
        $event.stopImmediatePropagation();
        this.toggle.emit(!this.open);
    }

    setNgModel(newVal: Color) {
        this.ngModel = newVal;
        this.onNgModelChanged(newVal);
        this.change.emit(newVal);
        this.toggle.emit(false);
    }

    writeValue(newVal: Color) {
        super.writeValue(newVal);
    }
}
