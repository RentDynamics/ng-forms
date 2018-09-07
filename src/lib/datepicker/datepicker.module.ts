import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DatepickerComboSelectComponent } from './combo/datepicker-combo-select.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { RangepickerComponent } from './rangepicker/rangepicker.component';
import { DropdownBuilderComponent } from './shared/dropdown-builder/dropdown-builder.component';
import { DatepickerToggleButtonDirective } from './shared/datepicker-toggle-button.directive';
import { DatepickerQuickAccessButtonDirective } from './shared/datepicker-quick-access-button.directive';
import { ComboSelectModule } from '../combo/combo-select.module';
import {PickmeupModule} from '../shared/pickmeup/pickmeup.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComboSelectModule,
      PickmeupModule,
  ],
  declarations: [
    DatepickerComboSelectComponent,
    DatepickerComponent,
    RangepickerComponent,
    DropdownBuilderComponent,
    DatepickerToggleButtonDirective,
    DatepickerQuickAccessButtonDirective
  ],
  exports: [
    DatepickerComboSelectComponent,
    DatepickerComponent,
    RangepickerComponent,
    DropdownBuilderComponent,
    DatepickerToggleButtonDirective,
    DatepickerQuickAccessButtonDirective,
    ComboSelectModule,
    FormsModule,
      PickmeupModule
  ]
})
export class DatepickerModule { }
