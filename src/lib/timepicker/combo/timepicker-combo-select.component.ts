import { Component, OnInit, OnChanges, OnDestroy, SimpleChange, SimpleChanges, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';

import { NgModelInput, NgModelInputValueAccessor } from '../../ng-model-input';
import { ComboSelectComponent } from '../../combo';

declare var moment: any;

@Component({
  selector: 'rd-timepicker-combo-select',
  templateUrl: './timepicker-combo-select.component.html',
  styleUrls: ['./timepicker-combo-select.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [new NgModelInputValueAccessor(TimePickerComboSelectComponent)]
})
export class TimePickerComboSelectComponent extends NgModelInput implements OnInit, OnChanges, OnDestroy {
  @Input() min: any;
  @Input() max: any;
  @Input() divisibleBy: number = 15;
  @Input() disabled: boolean = false;
  @Input() ngModel: string;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  open: boolean = false;
  focus: boolean = false;
  inputNgModel: string = '';
  times: string[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputNgModel = this.ngModel ? this.ngModel : '';

    if (this.min && this.max)
      this.times = this.calculateTimeRange(this.min, this.max);
  }

  ngOnChanges(newVal: SimpleChanges) {
    let min: SimpleChange = newVal['min'];
    let max: SimpleChange = newVal['max'];
    if (this.isValidSimpleChange(min) || this.isValidSimpleChange(max))
      this.times = this.calculateTimeRange(this.min, this.max);
  }

  isValidSimpleChange(change: SimpleChange) {
    return change && !change.isFirstChange() && change.currentValue && change.currentValue != change.previousValue;
  }

  calculateTimeRange(min, max) {
    let self = this;
    let range: any = moment.range(min, max);
    let result = [];
    range.by('m', function (minuteMoment) {
      if (minuteMoment.minute() % self.divisibleBy == 0) {
        result.push(minuteMoment.format('h:mm a'));
      }
    });
    return result;
  }

  isValidInput(newVal) {
    return this.times && this.times.indexOf(newVal) > -1;
  }

  onInputBlur() {
    this.focus = false;
    this.open = false;

    if (this.isValidInput(this.inputNgModel))
      this.setNgModel(this.inputNgModel);
    else
      this.inputNgModel = this.ngModel;
  }

  onTimeSelected(newVal) {
    this.open = false;
    this.setNgModel(newVal);
  }

  setNgModel(newVal: any) {
    this.ngModelChange.emit(newVal);
    super.setNgModel(newVal);
    this.onChange.emit(newVal);
    this.inputNgModel = newVal;
  }

  /* Override writeValue() from NgModelInput */
  writeValue(newVal: string) {
    super.writeValue(newVal);
    this.inputNgModel = newVal;
  }

  ngOnDestroy() {

  }
}
