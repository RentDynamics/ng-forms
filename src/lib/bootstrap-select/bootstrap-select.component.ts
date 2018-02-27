import { Component, OnInit, Input } from '@angular/core';

import { Select } from '../select';

@Component({
  selector: 'rd-bootstrap-select',
  templateUrl: './bootstrap-select.component.html',
  styleUrls: ['./bootstrap-select.component.less'],
})
export class BootstrapSelectComponent implements OnInit {
  @Input() btnClass: string = 'btn-default';
  @Input() defaultTitle: string;
  @Input() disabled: boolean = false;
  @Input() select: Select;
  @Input() aggregateAfter: number = 2;

  title: string = null;

  constructor() {

  }

  ngOnInit() {

  }
}
