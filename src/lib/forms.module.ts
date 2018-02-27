import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RdAngularCoreModule } from '@rd/core';
import { BootstrapSelectModule } from './bootstrap-select/index';
import { ButtonGroupButtonDirective, ButtonGroupDirective } from './button-group/index';
import { DatepickerComponent, RangepickerComponent, DatepickerToggleButton, 
  DatepickerQuickAccessButton, DropdownBuilderComponent, DatepickerComboSelectComponent } from './datepicker/index';
import { TextEditorDirective } from './text-editor/index';
import { ComboSelectModule } from './combo/index';
import { TimePickerComboSelectComponent } from './timepicker/index';
import { PickmeupModule } from './shared/pickmeup/index';
import { SelectBuilderModule } from './shared/select-builder/index';
import { SelectModule } from './select/index';
import { UiMaskDirective } from './ui-mask.directive';
import { ColorPickerColorComponent, ColorPickerComponent } from './color-picker/index';
import { InputModule } from './input/index';
import { ApiFilterGroupModule } from './api-filter-group/api-filter-group.module';
import { RecaptchaComponent } from './recaptcha/index';
import { BlurDirective } from './blur/index';

@NgModule({
  declarations: [
    BlurDirective,
    ButtonGroupButtonDirective, ButtonGroupDirective,
    ColorPickerColorComponent,
    ColorPickerComponent,
    DatepickerComboSelectComponent,
    DatepickerComponent, RangepickerComponent, DatepickerToggleButton, DatepickerQuickAccessButton,
    DropdownBuilderComponent,
    TextEditorDirective,
    TimePickerComboSelectComponent,
    UiMaskDirective,
    RecaptchaComponent,
  ],
  imports: [
    CommonModule,
    ComboSelectModule,
    RdAngularCoreModule,
    FormsModule,
    SelectModule,
    BootstrapSelectModule,
    InputModule,
    ApiFilterGroupModule,
    PickmeupModule,
    SelectBuilderModule,
  ],
  exports: [
    BlurDirective,
    ButtonGroupButtonDirective, ButtonGroupDirective,
    ColorPickerColorComponent,
    ColorPickerComponent,
    ComboSelectModule,
    DatepickerComboSelectComponent,
    DatepickerComponent, RangepickerComponent, DatepickerToggleButton, DatepickerQuickAccessButton,
    DropdownBuilderComponent,
    TextEditorDirective,
    PickmeupModule,
    SelectBuilderModule,
    TimePickerComboSelectComponent,
    RecaptchaComponent,
    SelectModule,
    BootstrapSelectModule,
    UiMaskDirective,
    InputModule,
    ApiFilterGroupModule,
  ],
  providers: [
  ]
})
export class RdAngularFormsModule { }
