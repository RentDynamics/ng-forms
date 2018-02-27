import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectModule } from '../select/select.module';
import { BootstrapSelectComponent } from './bootstrap-select.component';
import {
  BootstrapToggleBtnComponent, BootstrapActionsBoxComponent,
  BootstrapDropdownMenuComponent, BootstrapFilterComponent
} from './shared/index';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
  ],
  declarations: [
    BootstrapSelectComponent,
    BootstrapToggleBtnComponent,
    BootstrapActionsBoxComponent,
    BootstrapDropdownMenuComponent,
    BootstrapFilterComponent
  ],
  exports: [
    BootstrapSelectComponent,
    BootstrapToggleBtnComponent,
    BootstrapActionsBoxComponent,
    BootstrapDropdownMenuComponent,
    BootstrapFilterComponent
  ]
})
export class BootstrapSelectModule { }
