import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerColorComponent } from './shared/color-picker-color/color-picker-color.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ColorPickerComponent,
    ColorPickerColorComponent
  ],
  exports: [
    ColorPickerComponent,
    ColorPickerColorComponent
  ]
})
export class ColorPickerModule { }
