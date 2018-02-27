import { Component, Directive, Input, OnInit, Output, ElementRef, EventEmitter, AfterViewInit, HostListener } from '@angular/core';

@Component({
    selector: 'rd-dropdown-builder',
    templateUrl: './dropdown-builder.component.html',
    styleUrls: ['./dropdown-builder.component.less'],
    host: { '(window:click)': 'onWindowClick($event)' },
})
export class DropdownBuilderComponent implements OnInit {
    @Input() open: boolean = false;
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    elem: any;
    pickmeup: any;

    constructor(elementRef: ElementRef) {
        this.elem = elementRef.nativeElement;
    }

    ngOnInit() {

    }

    isBlur($event) {
        return this.elem !== $event.target && !this.elem.contains($event.target);
    }

    onWindowClick($event) {
        if (this.isBlur($event))
            this.toggle.emit(false);
    }

    onToggleClick(newVal: boolean) {
        this.toggle.emit(newVal);
    }
}
