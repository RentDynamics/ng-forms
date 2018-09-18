import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rd-checkbox-button',
  templateUrl: './checkbox-button.component.html',
  styleUrls: ['./checkbox-button.component.less']
})
export class CheckboxButtonComponent implements OnInit {
  @Input() name: string = '';
  @Input() value: string = '';
  @Output() update = new EventEmitter();

  id: string;

  selected: boolean = false;
  style: string = null;
  constructor() { }

  ngOnInit() {
    this.id = this.name;
    this.id = this.id.replace(" ", "").toLowerCase();
  }

  toggleSelected(){
    this.selected = !this.selected;
    let newVal = {};
    if(this.selected){
      this.style = "selected";
      newVal[this.id] = this.value;
    } else {
      this.style = null;
      newVal[this.id] = null;
    }

    this.update.emit(newVal);
  }
}
