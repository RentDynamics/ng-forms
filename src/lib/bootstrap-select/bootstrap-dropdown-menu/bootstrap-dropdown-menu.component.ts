import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';

import { equals, isArray } from '@rd/core';

import { KENDO_DROPDOWN_ANIMATION } from '../../shared/kendo-dropdown.animation';
import { Select } from '../../select/select';
import { Option } from '../../select/option';

@Component({
  selector: 'rd-bootstrap-dropdown-menu',
  templateUrl: './bootstrap-dropdown-menu.component.html',
  styleUrls: ['./bootstrap-dropdown-menu.component.less'],
  animations: [
    KENDO_DROPDOWN_ANIMATION
  ]
})
export class BootstrapDropdownMenuComponent implements OnChanges {
  @Input() select: Select;
  @Input() list: any[] = [];
  @Input() filterBy: string;

  // START: These 4 inputs are used for hiding/showing inactive items
  @Input() showInactiveToggle: boolean = false;
  @Input() idFieldName: string = 'id';
  @Input() activeFieldName: string = 'active';
  @Input() showInactiveItems: boolean = false; // By default, inactive items are hidden
  // END: These 4 inputs are used for hiding/showing inactive items

  constructor() {
  }

  ngOnChanges(newVal: SimpleChanges) {
    let listChange: SimpleChange = newVal['list'];

    if (this.showInactiveToggle && !this.showInactiveItems && listChange) {
      // I tried hard to not use a timeout here. I found other solutions but
      // it required that the 'caller' implement a solution and I didn't want
      // the 'caller' to have to do anything more than set the @Input's
      setTimeout(() => {
        this.hideInactiveItemsOnInit();
      }, 2000);
    }
  }

  updateList(newVal: { array: any[] }) {
    if (isArray(newVal.array) && newVal.array.length) {
      this.select.options.forEach((option: Option) => {
        for (let i = 0; i < newVal.array.length; i++) {
          if (equals(newVal.array[i], option.value)) {
            option.hidden = false;
            break;
          }
          else {
            option.hidden = true;
          }
        }
      });
    } else {
      this.select.options.forEach((option: Option) => option.hidden = true);
    }
  }

  hideInactiveItemsOnInit() {
    if (isArray(this.list) && this.list.length) {
      this.select.options.forEach((option: Option) => {
        for (let i = 0; i < this.list.length; i++) {
          if (equals(this.list[i][this.idFieldName], option.value)) {
            option.hidden = !this.list[i][this.activeFieldName];
            break;
          }
        }
      });
    }
  }

  activeSwitchOnChange(event) {
    if (this.showInactiveToggle) {
      this.showInactiveItems = !this.showInactiveItems;
      if (isArray(this.list) && this.list.length) {
        this.select.options.forEach((option: Option) => {
          for (let i = 0; i < this.list.length; i++) {
            if (equals(this.list[i][this.idFieldName], option.value)) {
              if (this.showInactiveItems) {
                option.hidden = false;
              } else {
                option.hidden = !this.list[i][this.activeFieldName];
              }
              break;
            }
          }
        });
      }
    }
  }

}
