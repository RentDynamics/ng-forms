import {
    AfterViewInit,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Provider,
    Query,
    QueryList,
    OnInit,
    Input,
    Optional,
    Output,
    Inject,
    AfterContentInit,
    ContentChild,
    ViewChildren,
    ViewChild,
    OnChanges,
    OnDestroy,
    SimpleChange, InjectionToken
   } from '@angular/core';
  import { NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;
declare var moment: any;

import { DatepickerHelper } from '../shared/datepicker-helper';
import { DatepickerQuickAccessButtonDirective } from '../shared/datepicker-quick-access-button.directive';

@Component({
    selector: 'rd-rangepicker',
    templateUrl: './rangepicker.component.html',
    styleUrls: ['./rangepicker.component.less'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: RangepickerComponent,
        multi: true
    }]
})
export class RangepickerComponent extends DatepickerHelper implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    @Input() momentFormat: string = 'M/D/Y';
    @Input() min: any | string;
    @Input() max: any | string;
    @Output() change = new EventEmitter();
    @ContentChildren(DatepickerQuickAccessButtonDirective) quickAccessBtns: QueryList<DatepickerQuickAccessButtonDirective>;

    startInput: string;
    endInput: string;

    constructor(elementRef: ElementRef) {
        super();
        this.elem = elementRef.nativeElement;
        /* todo: wire up onNgModelTouched() */
    }

    ngOnInit() {
        this.ngModel = this.ngModel || [];
        if (!this.min) {
          this.min = moment('2000-01-01', 'YYYY-MM-DD');
        }
        if (!this.max) {
          this.max = moment('2100-01-01', 'YYYY-MM-DD');
        }
    }

    ngAfterContentInit() {
        if(!this.quickAccessBtns)
            return;
        this.quickAccessBtns.map(quickAccessBtn => {
            quickAccessBtn.active = this.isActiveQuickAccessButton(quickAccessBtn);
            quickAccessBtn.onClick.subscribe(btn => this.onQuickAccessButtonClick(btn));
        });
        this.quickAccessBtns.changes.subscribe(quickAccessBtns =>
            quickAccessBtns.forEach(quickAccessBtn => {
                quickAccessBtn.active = this.isActiveQuickAccessButton(quickAccessBtn);
                quickAccessBtn.onClick.subscribe(btn => this.onQuickAccessButtonClick(btn));
            })
        );
    }

    ngAfterViewInit() {
        var self = this;
        this.calendarElem = $(this.elem).find('.calendar')[0];

      let options = {
        date: this.ngModel ? moment(this.ngModel, this.momentFormat) : moment(),
        flat: true,
        mode: 'range',
        min: moment.isMoment(this.min) ? this.min.toDate() : moment(this.min, this.momentFormat).toDate(),
        max: moment.isMoment(this.max) ? this.max.toDate() : moment(this.max, this.momentFormat).toDate(),
        first_day: 0,
        change: (formatDate) => {
          self.onChange.call(self, self.getPluginValueAsFormatStringArray());
        }
      };
      $(this.calendarElem).pickmeup(options);

        this.pickmeup = $('.calendar').data('pickmeup-options');
    }

    clearMultipleSelection() {
        $(this.calendarElem).pickmeup('clear');
    }

    onStartInputChanged($event) {
        $(this.calendarElem).pickmeup('update');
    }

    onEndInputChanged($event) {
        $(this.calendarElem).pickmeup('update');
    }

    onChange(newVal: string) {
        this.setNgModel(newVal);

        this.quickAccessBtns.forEach(btn => btn.active = false);
        this.quickAccessBtns.filter(btn => this.isActiveQuickAccessButton(btn)).forEach(btn => btn.active = true);
    }

  isActiveQuickAccessButton(quickAccessBtn: DatepickerQuickAccessButtonDirective) {
    let pluginValue = $(this.calendarElem).pickmeup('get_date', false);

    if (!pluginValue)
      return false;

    return moment(pluginValue).format(this.momentFormat) === moment().add(quickAccessBtn.value, 'd').format(this.momentFormat)
  }

    onQuickAccessButtonClick(quickAccessBtn: DatepickerQuickAccessButtonDirective) {
        let quickAccessMomentRange = [moment().add(quickAccessBtn.value[0], 'd'), moment().add(quickAccessBtn.value[1], 'd')];
        let quickAccessFormatString: string[] = this.format(quickAccessMomentRange);
        this.setNgModel(quickAccessFormatString);
        this.setPluginValue(quickAccessMomentRange.map(moment => moment.toDate()));

        this.quickAccessBtns.forEach(btn => btn.active = false);
        this.quickAccessBtns.filter(btn => btn.value === quickAccessBtn.value).forEach(btn => btn.active = true);
    }

    format(newVal: any[]): string[] {
        return [newVal[0].format(this.momentFormat), newVal[1].format(this.momentFormat)];
    }

    getPluginValueAsMomentArray(): any[] {
        let range = $(this.calendarElem).pickmeup('get_date', false);
        return [moment(range[0]), moment(range[1])]; //moment(new Date(newVal)).format(this.format);
    }

    getPluginValueAsFormatStringArray(): string[] {
        return this.format(this.getPluginValueAsMomentArray());
    }

    setNgModel(newVal) {
        this.onNgModelChanged(newVal);
        this.change.emit(newVal);
    }

    setPluginValue(newVal?: Date[]) {
        if (!newVal || !newVal.length)
            return $(this.calendarElem).pickmeup('set_date', [null, null]);

        return $(this.calendarElem).pickmeup('set_date', newVal);
    }

    /* Override writeValue() from ControlValueAccessor */
    writeValue(newVal: any[]) {
        super.writeValue(newVal);

        if (!newVal || !newVal.length)
            return this.setPluginValue(null);

        return this.setPluginValue([moment(newVal[0]).toDate(), moment(newVal[1]).toDate()]);
    }

    ngOnDestroy() {
        $(this.calendarElem).pickmeup('destroy');
    }

}
