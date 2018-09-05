import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlurDirective } from './blur.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    BlurDirective
  ],
  exports: [
    BlurDirective
  ]
})
export class BlurModule { }
