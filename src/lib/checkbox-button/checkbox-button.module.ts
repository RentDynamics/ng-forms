import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxButtonComponent } from './checkbox-button.component';
import { CheckboxButtonGroupDirective } from './checkbox-button-group.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    CheckboxButtonGroupDirective,
    CheckboxButtonComponent,
  ],
  exports: [
    CheckboxButtonGroupDirective,
    CheckboxButtonComponent,
  ],
  providers: [
  ]
})
export class CheckboxButtonModule {
}
