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
    SimpleChange
} from '@angular/core';

declare var moment: any;

import { NgModelInputValueAccessor } from '../../ng-model-input';
import { DatepickerHelper, DatepickerQuickAccessButton, DATE_TYPE_ENUM } from '../shared/index';

@Component({
    selector: 'rd-rangepicker',
    templateUrl: './rangepicker.component.html',
    styleUrls: ['./rangepicker.component.less'],
    providers: [new NgModelInputValueAccessor(RangepickerComponent)]
})
export class RangepickerComponent extends DatepickerHelper implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    @Input() momentFormat: string = 'M/D/Y';
    @Output() change = new EventEmitter();
    @ContentChildren(DatepickerQuickAccessButton) quickAccessBtns: QueryList<DatepickerQuickAccessButton>;

    startInput: string;
    endInput: string;

    constructor(elementRef: ElementRef) {
        super();
        this.elem = elementRef.nativeElement;
        /* todo: wire up onNgModelTouched() */
    }

    ngOnInit() {
        this.ngModel = this.ngModel || [];
    }

    ngAfterContentInit() {
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

        $(this.calendarElem).pickmeup({
            date: this.ngModel ? moment(this.ngModel, this.momentFormat) : moment(),
            flat: true,
            mode: 'range',
            first_day: 0,
            change: (formatDate) => {
                self.onChange.call(self, self.getPluginValueAsFormatStringArray());
            }
        });

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

  isActiveQuickAccessButton(quickAccessBtn: DatepickerQuickAccessButton) {
    let pluginValue = $(this.calendarElem).pickmeup('get_date', false);

    if (!pluginValue)
      return false;

    return moment(pluginValue).format(this.momentFormat) === moment().add(quickAccessBtn.value, 'd').format(this.momentFormat)
  }

    onQuickAccessButtonClick(quickAccessBtn: DatepickerQuickAccessButton) {
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
