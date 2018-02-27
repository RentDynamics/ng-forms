import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputKeyupDirective } from './input-keyup.directive';
import { InputThrottleDirective } from './input-throttle.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  declarations: [
    InputKeyupDirective,
    InputThrottleDirective,
  ],
  exports: [
    InputKeyupDirective,
    InputThrottleDirective,

    FormsModule,
    CommonModule,
  ],
  providers: [
  ]
})
export class InputModule { }
