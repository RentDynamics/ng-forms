
import { debounceTime, takeWhile } from 'rxjs/operators';
import {
  AfterViewInit, Directive, Input, Output, OnChanges,
  EventEmitter, OnInit, SimpleChange, SimpleChanges, OnDestroy
} from '@angular/core';

import { equals } from '@rd/core';

import { Select } from './select';

@Directive({
  selector: '[rdSelectTitle]',
})
export class SelectTitleDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() select: Select;
  @Input() aggregateAfter: number = 2;
  @Output() title: EventEmitter<string> = new EventEmitter<string>();

  protected alive: boolean = true;

  constructor() { }

  ngOnInit() {
    if (!this.select) {
      throw Error('Select not provided to SelectTitleDirective');
    }

    this.select.optionChange$.pipe(
      takeWhile(e => this.alive)
    ).subscribe(newVal => {
      this.setTitle();
    });

    this.select.ngModelChange$.pipe(
      takeWhile(e => this.alive)
    ).subscribe(newVal => {
      this.setTitle();
    });
  }

  ngAfterViewInit() {
    this.setTitle();
  }

  getTitle() {
    if (!this.select || !this.select.options || !this.select.ngModel) {
      return null;
    }

    let option = this.select.options.filter(option =>
      this.select.ngModel && option.value && equals(option.value, this.select.ngModel))[0];

    return option ? option.title : null;
  }

  getTitleMultiple() {
    if (!this.select || !this.select.ngModel || !this.select.options
      || !this.select.ngModel.length || !this.select.options.length) {
      return null;
    }

    let activeOptions = this.select.options.filter(option => {
      return this.select.ngModel.some(val => {
        return equals(option.value, val);
      });
    });

    if (!activeOptions.length) {
      return null;
    }

    if (activeOptions.length <= this.aggregateAfter) {
      return activeOptions.map(o => o.title).join(', ');
    }

    return `${activeOptions.length} selected`;
  }

  setTitle() {
    if (this.select.multiple) {
      return this.title.emit(this.getTitleMultiple());
    }
    return this.title.emit(this.getTitle());
  }

  ngOnDestroy() {
    this.alive = false;
  }
}