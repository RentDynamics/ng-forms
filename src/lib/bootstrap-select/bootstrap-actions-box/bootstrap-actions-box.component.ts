import { Component, OnInit, Input } from '@angular/core';

import { Select } from '../../select/select';

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
    let newVal = this.select.options.filter(o => o.hidden == false).map(o => o.value);
    this.select.setNgModel(newVal);
  }

  unselectAll() {
    let newVal = [];
    this.select.setNgModel(newVal);
  }
}
