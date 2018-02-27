import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectBuilderModule } from '../shared/select-builder/select-builder.module';
import { ComboSelectOptionDirective } from './select/shared/combo-select-option.directive';
import { ComboSelectInputDirective } from './select/shared/combo-select-input.directive';
import { ComboSelectToggleBtnDirective } from './select/shared/combo-select-toggle-btn.directive';
import { ComboSelectComponent } from './select/combo-select.component';
import { ComboMultiSelectComponent } from './multi-select/combo-multi-select.component';

@NgModule({
  imports: [
    CommonModule,
    SelectBuilderModule,
  ],
  declarations: [
    ComboSelectComponent,
    ComboMultiSelectComponent,
    ComboSelectOptionDirective, 
    ComboSelectInputDirective, 
    ComboSelectToggleBtnDirective,
  ],
  exports: [
    ComboSelectComponent,
    ComboMultiSelectComponent,
    ComboSelectOptionDirective, 
    ComboSelectInputDirective, 
    ComboSelectToggleBtnDirective,
    SelectBuilderModule,
  ]
})
export class ComboSelectModule { }
