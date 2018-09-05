import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TimePickerComboSelectComponent } from './combo/timepicker-combo-select.component';
import { ComboSelectModule } from '../combo/combo-select.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComboSelectModule
    ],
    declarations: [
        TimePickerComboSelectComponent
    ],
    exports: [
        ComboSelectModule,
        TimePickerComboSelectComponent
    ]
})
export class TimepickerModule { }
