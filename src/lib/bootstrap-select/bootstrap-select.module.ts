import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SelectModule } from "../select/select.module";
import { SwitchModule } from "../shared/switch/switch.module";
import { BootstrapSelectComponent } from "./bootstrap-select.component";
import {
  BootstrapToggleBtnComponent,
  BootstrapActionsBoxComponent,
  BootstrapDropdownMenuComponent,
  BootstrapFilterComponent,
  BootstrapActiveFilterComponent
} from "./shared/index";

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
    BootstrapFilterComponent
  ]
})
export class BootstrapSelectModule {}
