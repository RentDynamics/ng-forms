import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickmeupDirective } from './pickmeup.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PickmeupDirective
  ],
  exports: [
    PickmeupDirective
  ]
})
export class PickmeupModule { }
