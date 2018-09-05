import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'angular2-ui-switch';

import { SelectModule } from '../select/select.module';
import { BootstrapSelectComponent } from './bootstrap-select.component';
import {
  BootstrapToggleBtnComponent, BootstrapActionsBoxComponent,
  BootstrapDropdownMenuComponent, BootstrapFilterComponent, BootstrapActiveFilterComponent
} from './shared/index';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    UiSwitchModule
  ],
  declarations: [
    BootstrapSelectComponent,
    BootstrapToggleBtnComponent,
    BootstrapActionsBoxComponent,
    BootstrapDropdownMenuComponent,
    BootstrapFilterComponent,
    BootstrapActiveFilterComponent,
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
