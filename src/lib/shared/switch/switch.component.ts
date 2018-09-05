import {
  Component,
  OnInit,
  Input,
  Output,
  ContentChild,
  ElementRef,
  EventEmitter,
  Renderer
} from "@angular/core";

import { SelectOption } from "../select-option";
import { NgModelInput } from "../../ng-model-input";

@Component({
  selector: "rd-switch",
  templateUrl: "./switch.component.html"
})
export class SwitchComponent implements OnInit {
  @Input()
  checked: boolean = false;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  clicked(event) {
    this.change.emit(event);
  }
}
