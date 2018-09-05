import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectModule } from '../select/select.module';
import { BootstrapSelectComponent } from './bootstrap-select.component';
import { BootstrapToggleBtnComponent } from './bootstrap-toggle-btn';
import { BootstrapActionsBoxComponent } from './bootstrap-actions-box';
import { BootstrapDropdownMenuComponent } from './bootstrap-dropdown-menu';
import { BootstrapFilterComponent } from './bootstrap-filter';

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
    CommonModule,
    BootstrapSelectComponent,
    BootstrapToggleBtnComponent,
    BootstrapActionsBoxComponent,
    BootstrapDropdownMenuComponent,
    BootstrapFilterComponent,
    SelectModule
  ]
})
export class BootstrapSelectModule { }
