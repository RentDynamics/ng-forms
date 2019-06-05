
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
  readonly DEBOUNCE_TIME = 100;

  constructor() { }

  ngOnInit() {
    if (!this.select) {
      throw Error('Select not provided to SelectTitleDirective');
    }

    this.select.optionChange$.pipe(
      // debounceTime(this.DEBOUNCE_TIME), 
      takeWhile(e => this.alive)
      ).subscribe(newVal => {
      this.setTitle();
    });

    this.select.ngModelChange$.pipe(
      // debounceTime(this.DEBOUNCE_TIME), 
      takeWhile(e => this.alive)
      ).subscribe(newVal => {
      this.setTitle();
    });
  }

  ngAfterViewInit(){
    this.setTitle();
  }

  isEqual(a, b): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  getTitle() {
    if (!this.select || !this.select.options || !this.select.ngModel) {
      return null;
    }

    let option = this.select.options.filter(option =>
      this.select.ngModel && option.value && this.isEqual(option.value, this.select.ngModel))[0];

    return option ? option.title : null; 
  }

  getTitleMultiple() {
    if (!this.select || !this.select.ngModel || !this.select.options
      || !this.select.ngModel.length || !this.select.options.length) {
      return null;
    }

    let activeOptions = this.select.options.filter(option => {
      return this.select.ngModel.some(val => {
        return this.isEqual(option.value, val);
      });
      // console.log('** option.value', option.value);
      // console.log('** select.ngModel', this.select.ngModel);
      // const result: boolean = this.isEqual(option.value, this.select.ngModel);
      // console.log('** result', result);
      // return result;
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