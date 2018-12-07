import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwitchModule } from '../shared/switch/switch.module';
import { SelectModule } from '../select/select.module';

import { BootstrapSelectComponent } from './bootstrap-select.component';
import { BootstrapToggleBtnComponent } from './bootstrap-toggle-btn/index';
import { BootstrapActionsBoxComponent } from './bootstrap-actions-box/index';
import { BootstrapDropdownMenuComponent } from './bootstrap-dropdown-menu/index';
import { BootstrapFilterComponent } from './bootstrap-filter/index';
import { BootstrapActiveFilterComponent } from './bootstrap-active-filter/index';

@NgModule({
  imports: [CommonModule, SelectModule, SwitchModule],
  declarations: [
    BootstrapSelectComponent,
    BootstrapToggleBtnComponent,
    BootstrapActionsBoxComponent,
    BootstrapDropdownMenuComponent,
    BootstrapFilterComponent,
    BootstrapActiveFilterComponent
  ],
  exports: [
    BootstrapSelectComponent,
    BootstrapToggleBtnComponent,
    BootstrapActionsBoxComponent,
    BootstrapDropdownMenuComponent,
    BootstrapFilterComponent,
    SelectModule,
    BootstrapActiveFilterComponent
  ]
})
export class BootstrapSelectModule {}
