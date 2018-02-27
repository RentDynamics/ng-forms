import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiFilterGroupDirective } from './api-filter-group.directive';
import { ApiFilterDirective } from './api-filter.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ApiFilterGroupDirective, ApiFilterDirective
  ],
  exports: [
    ApiFilterGroupDirective, ApiFilterDirective
  ]
})
export class ApiFilterGroupModule { }
