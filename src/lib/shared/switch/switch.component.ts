import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "rd-switch",
  templateUrl: "./switch.component.html"
})
export class SwitchComponent {
  @Input() checked: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  onChange(event) {
    this.change.emit(event);
  }
}
