import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RdAngularCoreModule } from '@rd/core';
import { SelectDirective } from './select.directive';
import {
  SelectToggleBtnDirective,
  OptionDirective, SelectTitleDirective,
  SelectDropdownDirective
} from './shared/index';

@NgModule({
  imports: [
    RdAngularCoreModule,
    FormsModule,
    CommonModule,
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
  ],
  providers: [
  ]
})
export class SelectModule { }
