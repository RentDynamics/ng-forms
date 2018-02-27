import { Directive, ElementRef, OnInit, OnDestroy, Input, HostListener } from '@angular/core';

import { SelectOption } from '../../../shared/index';
import { ComboSelectComponent } from '../combo-select.component';

@Directive({
    selector: '[rdComboSelectOption]',
    exportAs: 'option'
})
export class ComboSelectOptionDirective implements OnInit, SelectOption, OnDestroy {
    @Input() value: any;
    @Input() title: any;

    public elem: HTMLElement = null;

    constructor(private comboSelect: ComboSelectComponent, elementRef: ElementRef) {
        this.elem = elementRef.nativeElement;
    }

    ngOnInit() {
        this.comboSelect.addOption(this);
    }

    ngAfterViewInit() {

    }

    isActive() {
        return this.comboSelect.ngModel === this.value;
    }

    setActive() {
        this.comboSelect.setNgModel(this.value);
        this.comboSelect.toggle.emit(false);
    }

    ngOnDestroy() {
        this.comboSelect.removeOption(this.value);
    }
}
