import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupDirective } from './button-group.directive';
import { ButtonGroupButtonDirective } from './button-group-button/button-group-button.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonGroupButtonDirective,
    ButtonGroupDirective
  ],
  exports: [
    ButtonGroupButtonDirective,
    ButtonGroupDirective
  ]
})
export class ButtonGroupModule { }
