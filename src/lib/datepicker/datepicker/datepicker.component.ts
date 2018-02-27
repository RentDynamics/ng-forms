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
    selector: 'rd-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.less'],
    providers: [new NgModelInputValueAccessor(DatepickerComponent)]
})
export class DatepickerComponent extends DatepickerHelper implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    @Input() momentFormat: string = 'M/D/Y';
    @Output() change = new EventEmitter();
    @ContentChildren(DatepickerQuickAccessButton) quickAccessBtns: QueryList<DatepickerQuickAccessButton>;

    constructor(elementRef: ElementRef) {
        super();
        this.elem = elementRef.nativeElement;
        /* todo: wire up onNgModelTouched() */
    }

    ngOnInit() { /* todo: validate input types */ }

    ngAfterContentInit() {
        this.quickAccessBtns.forEach(quickAccessBtn => {
            quickAccessBtn.onClick.subscribe(btn => this.onQuickAccessButtonClick(btn));
        });
    }

    ngAfterViewInit() {
        var self = this;
        this.calendarElem = $(this.elem).find('.calendar')[0];

        $(this.calendarElem).pickmeup({
            flat: true,
            mode: 'single',
            first_day: 0,
            change: (formatDate) => {
                self.onPluginValueChange.call(self);
            }
        });

        this.pickmeup = $('.calendar').data('pickmeup-options');
    }

    onPluginValueChange() {
        this.setNgModel(moment($(this.calendarElem).pickmeup('get_date', false)));

        this.updateQuickAccessButtons();

        this.toggle(false);
    }

    isActiveQuickAccessButton(quickAccessBtn: DatepickerQuickAccessButton) {
        let pluginValue = $(this.calendarElem).pickmeup('get_date', false);

        if (!pluginValue)
            return false;

        return moment(pluginValue).format(this.momentFormat) === moment().add(quickAccessBtn.value, 'd').format(this.momentFormat)
    }

    onQuickAccessButtonClick(quickAccessBtn: DatepickerQuickAccessButton) {
        let newVal: any = moment().add(quickAccessBtn.value, 'd');

        this.setNgModel(newVal);
        this.setPluginValue(newVal);

        this.quickAccessBtns.forEach(btn => btn.active = false);
        this.quickAccessBtns.filter(btn => btn.value === quickAccessBtn.value).forEach(btn => btn.active = true);
    }

    updateQuickAccessButtons() {
      this.quickAccessBtns.forEach(btn => btn.active = false);
      this.quickAccessBtns.filter(btn => this.isActiveQuickAccessButton(btn)).forEach(btn => btn.active = true);
    }

    setNgModel(newVal: any) {
        let result: any | string = newVal;

        if (this.outputType === DATE_TYPE_ENUM.STRING)
            result = newVal.format(this.momentFormat);

        this.onNgModelChanged(result);
        this.change.emit(result);
    }

    setPluginValue(newVal: any) {
        return $(this.calendarElem).pickmeup('set_date', newVal);
    }

    /* Override writeValue() from ControlValueAccessor (implemented in DatepickerHelper -> NgModelInput) */
    writeValue(newVal?: any) {
        if (!newVal)
            return $(this.calendarElem).pickmeup('set_date', moment());

        /* only set this.outputType when a non-null write value is passed in, default it to moment */
        this.outputType = DATE_TYPE_ENUM.MOMENT;

        if (!moment.isMoment(newVal)) {
            this.outputType = DATE_TYPE_ENUM.STRING;
            newVal = moment(newVal, this.momentFormat);
        }

        this.setPluginValue(newVal);
        this.updateQuickAccessButtons();
    }

    ngOnDestroy() {
        $(this.calendarElem).pickmeup('destroy');
    }

}
