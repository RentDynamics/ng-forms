import { AfterViewInit, Directive, ElementRef, Input, Output, OnChanges, OnDestroy, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';

declare var moment: any;

import { extend } from '@rd/core';
import { NgModelInput, NgModelInputValueAccessor } from '../../ng-model-input';

@Directive({
  selector: '[rdPickmeup]'
})
export class PickmeupDirective implements AfterViewInit, OnDestroy {
  @Input() moment: any;
  @Input() mode: string = 'single';
  @Input() options: any = {};
  @Output() onPickmeupChange: EventEmitter<any> = new EventEmitter<any>();

  private elem: HTMLElement;
  private pickmeup: any;

  /* https://github.com/nazar-pc/PickMeUp */
  constructor(elementRef: ElementRef) {
    this.elem = elementRef.nativeElement;
  }

  ngAfterViewInit() {
    let self = this;
    let now = new Date();

    $(this.elem).pickmeup(extend({
      flat: true,
      mode: this.mode,
      date: this.moment,
      first_day: 0,
      change: (formatDate) => {
        self.onPickmeupChange.emit(self.getPluginValue());
      }
    }, this.options));
    /* store pickmeup view model for later */
    this.pickmeup = $(this.elem).data('pickmeup-options');
  }

  getPluginValue(): any | any[] {
    return this.mode === 'single' ? moment($(this.elem).pickmeup('get_date', false)) : this.getRange()
  }

  setPluginValue(newVal: any | any[]) {
    if (!newVal)
      return;
    $(this.elem).pickmeup('set_date', newVal);
  }

  private getRange(): any[] {
    let range = $(this.elem).pickmeup('get_date', false);
    return [moment(range[0]), moment(range[1])];
  }

  ngOnDestroy() {
    $(this.elem).pickmeup('destroy');
  }
}
