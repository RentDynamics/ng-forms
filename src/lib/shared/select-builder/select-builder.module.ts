import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectBuilderComponent } from './select-builder.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SelectBuilderComponent
  ],
  exports: [
    SelectBuilderComponent
  ]
})
export class SelectBuilderModule { }
