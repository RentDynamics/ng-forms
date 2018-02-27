import { Component, Input, OnInit, Output, OnChanges, SimpleChange, SimpleChanges, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';

declare var moment: any;

import { NgModelInput, NgModelInputValueAccessor } from '../../ng-model-input';
import { ComboSelectComponent } from '../../combo/index';
import { PickmeupDirective } from '../../shared/index';
import { DatepickerToggleButton } from "../shared/datepicker-helper";
import { DATE_TYPE_ENUM } from "../shared/date-type.enum";

@Component({
  selector: 'rd-datepicker-combo-select',
  templateUrl: './datepicker-combo-select.component.html',
  styleUrls: ['./datepicker-combo-select.component.less'],
  providers: [new NgModelInputValueAccessor(DatepickerComboSelectComponent)],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DatepickerComboSelectComponent extends NgModelInput implements OnInit, OnChanges {
  @Input() ngModel: any;
  @Input() pickmeupOptions: any = {
    default_date: false
  };
  @Input() min: any | string;
  @Input() max: any | string;
  @Input() buttonIconClass: any = 'fa fa-calendar';
  @Input() buttonClass: any = 'btn btn-default';
  @Input() ngValidateClass: any;
  @Input() momentFormat: string = 'MM/DD/YYYY';
  @Input() outputType: any;
  @Output() ngModelChange = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ComboSelectComponent) comboselect: ComboSelectComponent;
  @ViewChild(PickmeupDirective) pickmeup: PickmeupDirective;

  open: boolean = false;
  focus: boolean = false;
  inputNgModel: string = '';

  get ngModelMoment() {
    return moment.isMoment(this.ngModel) ? this.ngModel :
      this.isValidInput(this.ngModel) ? moment(this.ngModel, this.momentFormat) : moment()
  }

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.min)
      this.setMin(this.min);

    if (this.max)
      this.setMax(this.max);

    this.inputNgModel = moment.isMoment(this.ngModel) ? this.ngModel.format(this.momentFormat) :
      this.isValidInput(this.ngModel) ? this.ngModel : null;
  }

  isValidInput(newVal: string) {
    let result: any;
    try {
      result = moment(newVal, this.momentFormat);
    } catch (e) {
      return false;
    }

    if (!result.isValid())
      return false;

    if (this.pickmeupOptions.min && result.isBefore(this.pickmeupOptions.min))
      return false;

    if (this.pickmeupOptions.max && result.isAfter(this.pickmeupOptions.max))
      return false;

    return true;
  }

  onInputBlur() {
    this.focus = false;
    this.open = false;

    if (this.isValidInput(this.inputNgModel)) {
      this.setNgModel(moment(this.inputNgModel, this.momentFormat));
    }
    else {
      this.inputNgModel = moment.isMoment(this.ngModel) ? this.ngModel.format(this.momentFormat) :
        this.isValidInput(this.ngModel) ? this.ngModel : null;
    }
  }

  onEnterKeyup(event) {
    event.target.blur();
  }

  onPickmeupChange(newVal: any) {
    this.setNgModel(newVal);
    this.open = false;
  }

  setNgModel(newVal: any) {
    let result: any = newVal;

    if (this.outputType === DATE_TYPE_ENUM.STRING) {
      result = newVal.format(this.momentFormat);
    }

    this.ngModelChange.emit(result);
    super.setNgModel(result);
    this.onChange.emit(result);
    this.inputNgModel = newVal.format(this.momentFormat);
  }

  ngOnChanges(newVal: SimpleChanges) {
    let minChanges: SimpleChange = newVal['min'];
    let maxChanges: SimpleChange = newVal['max'];

    if (minChanges && minChanges.currentValue && minChanges.currentValue != minChanges.previousValue)
      this.setMin(minChanges.currentValue);

    if (maxChanges && maxChanges.currentValue && maxChanges.currentValue != maxChanges.previousValue)
      this.setMax(maxChanges.currentValue);
  }

  setMin(newVal: any) {
    let result: Date;

    if (moment.isMoment(newVal)) {
      result = newVal.toDate();
    } else {
      result = moment(newVal, this.momentFormat).toDate();
    }

    this.pickmeupOptions.min = result;
  }

  setMax(newVal: any) {
    let result: Date;

    if (moment.isMoment(newVal)) {
      result = newVal.toDate();
    } else {
      result = moment(newVal, this.momentFormat).toDate();
    }

    this.pickmeupOptions.max = result;
  }

  /* Override writeValue() from NgModelInput */
  writeValue(newVal?: any) {
    if (!newVal)
      return this.inputNgModel = null;

    /* only set this.outputType when a non-null write value is passed in, default it to moment */
    this.outputType = this.outputType ? this.outputType :
      !moment.isMoment(newVal) ? DATE_TYPE_ENUM.STRING :
        DATE_TYPE_ENUM.MOMENT;

    if (!moment.isMoment(newVal))
      newVal = moment(newVal, this.momentFormat);

    super.writeValue(newVal);
    this.inputNgModel = newVal.format(this.momentFormat);
  }
}
