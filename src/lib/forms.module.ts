import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RdAngularCoreModule } from '@rd/core';

import { UiMaskDirective } from './ui-mask.directive';

import { TimepickerModule } from './timepicker/timepicker.module';
import { SelectModule } from './select/select.module';
import { BlurModule } from './blur/blur.module';
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import { BootstrapSelectModule } from './bootstrap-select/bootstrap-select.module';
import { ButtonGroupModule } from './button-group/button-group.module';
import { TextEditorModule } from './text-editor/text-editor.module';
import { ComboSelectModule } from './combo/combo-select.module';
import { PickmeupModule } from './shared/pickmeup/pickmeup.module';
import { SelectBuilderModule } from './shared/select-builder/select-builder.module';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { InputModule } from './input/input.module';
import { ApiFilterGroupModule } from './api-filter-group/api-filter-group.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { SwitchModule } from './shared/switch/switch.module';

@NgModule({
  declarations: [
    UiMaskDirective
  ],
  imports: [
    CommonModule,
    RdAngularCoreModule,
    FormsModule,
    SelectModule,
    TimepickerModule,
    RecaptchaModule,
    BlurModule,
    SwitchModule,
    BootstrapSelectModule,
    ButtonGroupModule,
    TextEditorModule,
    ComboSelectModule,
    PickmeupModule,
    SelectBuilderModule,
    ColorPickerModule,
    InputModule,
    ApiFilterGroupModule,
    DatepickerModule,
  ],
  exports: [
    UiMaskDirective,
    SelectModule,
    TimepickerModule,
    RecaptchaModule,
    BlurModule,
    BootstrapSelectModule,
    ButtonGroupModule,
    TextEditorModule,
    ComboSelectModule,
    PickmeupModule,
    SelectBuilderModule,
    ColorPickerModule,
    InputModule,
    ApiFilterGroupModule,
    DatepickerModule,
  ],
  providers: []
})
export class RdAngularFormsModule {}
