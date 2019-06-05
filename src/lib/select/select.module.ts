import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RdAngularCoreModule } from '@rd/core';
import { SelectDirective } from './select.directive';
import { SelectToggleBtnDirective } from './select-toggle-btn.directive';
import { OptionDirective } from './option.directive';
import { SelectTitleDirective } from './select-title.directive';
import { SelectDropdownDirective } from './select-dropdown.directive';
import { BlurModule } from '../blur/blur.module';

@NgModule({
  imports: [
    RdAngularCoreModule,
    FormsModule,
    CommonModule,
    BlurModule,
  ],
  declarations: [
    SelectDirective,
    SelectToggleBtnDirective,
    OptionDirective,
    SelectTitleDirective,
    SelectDropdownDirective,
  ],
  exports: [
    SelectDirective,
    SelectToggleBtnDirective,
    OptionDirective,
    SelectTitleDirective,
    SelectDropdownDirective,

    FormsModule,
    CommonModule,
    RdAngularCoreModule,
    BlurModule,
  ],
  providers: [
  ]
})
export class SelectModule { }
