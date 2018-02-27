import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observer, Subscription } from 'rxjs/Rx';

import { NgModelInputValueAccessor } from '../../ng-model-input';
import { ComboSelect } from '../shared/combo-select';
import { KEYCODE, SelectOption } from '../../shared/index';

export function providers() {
  return [
    new NgModelInputValueAccessor(ComboSelectComponent)
  ];
}

@Component({
  selector: 'rd-combo-select',
  templateUrl: './combo-select.component.html',
  styleUrls: ['./combo-select.component.less'],
  providers: providers()
})
export class ComboSelectComponent extends ComboSelect implements OnInit, OnDestroy {
  @Input() open: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() lazyload: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { super(); }

  ngOnInit() {
    let initialToggleSubscription: Subscription = this.toggle.subscribe((result: boolean) => {
      if (result) {
        this.lazyload.emit(null);
        initialToggleSubscription.unsubscribe();
      }
    });
  }

  getTitle() {
    return this.options.filter(o => o.value === this.ngModel).map(o => o.title)[0];
  }

  lookupOption(value: any): SelectOption[] {
    return this.options.filter(o => o.value == value);
  }


  setNgModel(value) {
    this.ngModel = value;
    this.onNgModelChanged(value);
    this.change.emit(value);
    this.title = value;
  }

  /* Override writeValue() from ControlValueAccessor */
  writeValue(newVal: any) {
    super.writeValue(newVal);
    this.title = newVal;
  }

  ngOnDestroy() {

  }
}
