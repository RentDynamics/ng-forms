import { AfterContentInit, Component, ContentChildren, Directive, EventEmitter, forwardRef, HostBinding, OnInit, Output, Provider, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgModelInput, NgModelInputValueAccessor } from '../ng-model-input';
import { ButtonGroupButtonDirective } from './button-group-button/button-group-button.directive';

export function providers() {
  return [
    new NgModelInputValueAccessor(ButtonGroupDirective)
  ];
}

@Directive({
    selector: 'rd-button-group',
    providers: providers()
})
export class ButtonGroupDirective extends NgModelInput implements OnInit, AfterContentInit {
    @ContentChildren(ButtonGroupButtonDirective) buttons: QueryList<ButtonGroupButtonDirective>;
    @HostBinding('class.btn-group') btnGroupClass = true;
    @Output() change = new EventEmitter();

    constructor() {
        super();
        /* todo: wire up onNgModelTouched() on blur event */
    }

    ngOnInit() {

    }

    ngAfterContentInit() {
      this.syncNgModel(this.ngModel);
      this.buttons.forEach((button) => {
        button.onClick.subscribe(newVal => this.setNgModel(newVal))
      });
    }

    setNgModel(newVal: any){
      this.buttons.forEach(b => b.active = false);

      let buttonQuery = this.buttons.filter(b => b.value === newVal);
      buttonQuery.forEach(b => b.active = true);

      this.onNgModelChanged(newVal);
      this.change.emit(newVal);
    }

    syncNgModel(newVal: any) {
        this.buttons.forEach(o => o.active = false);

        let buttonQuery = this.buttons.filter(b => b.value == newVal);
        buttonQuery.forEach(b => b.active = true);
    }

    /* Override writeValue() of NgModelInput class */
    writeValue(newVal: any) {
        super.writeValue(newVal);
        if(this.buttons)
          this.syncNgModel(newVal);
    }
}
