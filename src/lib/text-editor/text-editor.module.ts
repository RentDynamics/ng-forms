import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TextEditorDirective } from './text-editor.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TextEditorDirective
  ],
  exports: [
    TextEditorDirective
  ]
})
export class TextEditorModule { }
