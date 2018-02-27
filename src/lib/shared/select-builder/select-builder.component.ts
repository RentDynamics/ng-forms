import { Component, OnInit, Input, Output, ContentChild, ElementRef, EventEmitter, Renderer } from '@angular/core';

import { SelectOption } from '../select-option';
import { NgModelInput } from '../../ng-model-input';

@Component({
    selector: 'rd-select-builder',
    templateUrl: './select-builder.component.html',
    styleUrls: ['./select-builder.component.less'],
    host: {
        '(window:click)': 'onWindowClick($event)',
        //'[window:height]': 'windowHeight'
    },
})
export class SelectBuilderComponent implements OnInit {
    @Output() blur = new EventEmitter();

    private elem = null;

    constructor(private renderer: Renderer, elemRef: ElementRef) {
        this.elem = elemRef.nativeElement;
    }

    ngOnInit() {
    }

    isBlur($event) {
        return this.elem !== $event.target && !this.elem.contains($event.target);
    }

    isDropup() {
        //this.elem.getBoundingClientRect()
        return false;
    }

    onWindowClick($event) {
        if (this.isBlur($event))
            this.blur.emit(null);
    }
}
