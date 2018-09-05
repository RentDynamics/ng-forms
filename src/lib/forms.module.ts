import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RdAngularCoreModule } from '@rd/core';

import { UiMaskDirective } from './ui-mask.directive';

import { TimepickerModule } from './timepicker/timepicker.module';
import { SelectModule } from './select/select.module';
import { BlurModule } from './blur/blur.module'
import { RecaptchaModule } from './recaptcha/recaptcha.module';
import { BootstrapSelectModule } from './bootstrap-select/bootstrap-select.module';


// import { BootstrapSelectModule } from './bootstrap-select/bootstrap-select.module';
// import { ButtonGroupButtonDirective, ButtonGroupDirective } from './button-group/index';
// import { TextEditorDirective } from './text-editor/index';
// import { ComboSelectModule } from './combo/index';
// import { PickmeupModule } from './shared/pickmeup/index';
// import { SelectBuilderModule } from './shared/select-builder/index';
// import { UiMaskDirective } from './ui-mask.directive';
// import { ColorPickerColorComponent, ColorPickerComponent } from './color-picker/index';
// import { InputModule } from './input/index';
// import { ApiFilterGroupModule } from './api-filter-group/api-filter-group.module';
// import { RecaptchaComponent } from './recaptcha/index';
// import { BlurDirective } from './blur/index';
// import { DatepickerToggleButtonDirective } from './datepicker/shared/datepicker-toggle-button.directive';
// import { DatepickerQuickAccessButtonDirective } from './datepicker/shared/datepicker-quick-access-button.directive';
// import { DatepickerComboSelectComponent } from './datepicker/combo/datepicker-combo-select.component';
// import { DatepickerComponent } from './datepicker/datepicker/datepicker.component';
// import { RangepickerComponent } from './datepicker/rangepicker/rangepicker.component';
// import { DropdownBuilderComponent } from './datepicker/shared/dropdown-builder/dropdown-builder.component';
// import { TimePickerComboSelectComponent } from './timepicker/combo/timepicker-combo-select.component';
// import { SelectModule } from './select/select.module';

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
    BootstrapSelectModule,

  ],
  exports: [
    UiMaskDirective,
    SelectModule,
    TimepickerModule,
    RecaptchaModule,
    BlurModule,
    BootstrapSelectModule,
  ],
  providers: [
  ]
})
export class RdAngularFormsModule { }
