import { AfterViewInit, Directive, Input, Output, OnChanges, EventEmitter, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { equals } from '@rd/core';

import { Select } from './select';

@Directive({
  selector: '[rdSelectTitle]',
})
export class SelectTitleDirective implements OnInit {
  @Input() select: Select;
  @Input() aggregateAfter: number = 2;
  @Output() title: EventEmitter<string> = new EventEmitter<string>();

  readonly DEBOUNCE_TIME = 100;

  constructor() { }

  ngOnInit() {
    if (!this.select)
      throw Error('Select not provided to SelectTitleDirective');

    this.select.optionChange$.debounceTime(this.DEBOUNCE_TIME).subscribe(newVal => {
      this.setTitle();
    });
    this.select.ngModelChange$.debounceTime(this.DEBOUNCE_TIME).subscribe(newVal => {
      this.setTitle();
    });
  }

  protected getTitle() {
    if(!this.select || !this.select.options || !this.select.ngModel)
      return null;

    let option = this.select.options.filter(option => this.select.ngModel && option.value && equals(option.value, this.select.ngModel))[0];

    return option ? option.title : null;
  }

  protected getTitleMultiple() {
    if(!this.select || !this.select.ngModel || !this.select.options || !this.select.ngModel.length || !this.select.options.length)
      return null;

    let activeOptions = this.select.options.filter(option => this.select.ngModel.indexOf(option.value) > -1);

    if (!activeOptions.length)
      return null;

    if (activeOptions.length <= this.aggregateAfter)
      return activeOptions.map(o => o.title).join(', ');

    return `${activeOptions.length} selected`;
  }

  setTitle() {
    if (this.select.multiple)
      return this.title.emit(this.getTitleMultiple());
    return this.title.emit(this.getTitle());
  }
}