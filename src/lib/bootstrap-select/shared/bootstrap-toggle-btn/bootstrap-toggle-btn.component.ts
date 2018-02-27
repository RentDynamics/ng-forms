import { Component, OnInit, Input } from '@angular/core';

import { Select } from '../../../select/shared/select';

@Component({
  selector: 'rd-bootstrap-toggle-btn',
  templateUrl: './bootstrap-toggle-btn.component.html',
  styleUrls: ['./bootstrap-toggle-btn.component.less'],
})
export class BootstrapToggleBtnComponent implements OnInit {
  @Input() select: Select;

  protected title: string;

  constructor() { }

  ngOnInit() {
  }

}
