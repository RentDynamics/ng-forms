import { Component, OnInit, forwardRef, Host, Inject, Input, ElementRef } from '@angular/core';

import { Select } from '../../../select/shared/select';

@Component({
  selector: 'rd-bootstrap-actions-box',
  templateUrl: './bootstrap-actions-box.component.html',
  styleUrls: ['./bootstrap-actions-box.component.less'],
})
export class BootstrapActionsBoxComponent implements OnInit {
  @Input() select: Select;

  constructor() {

  }

  ngOnInit() {
  }

  selectAll() {
    let newVal = this.select.options.map(o => o.value);
    this.select.setNgModel(newVal);
  }

  unselectAll() {
    let newVal = [];
    this.select.setNgModel(newVal);
  }
}
