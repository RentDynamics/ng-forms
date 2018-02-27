import { AfterContentInit, Component, Directive, EventEmitter, Input, OnInit, Output, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'rd-button-group-button'
})
export class ButtonGroupButtonDirective implements OnInit, AfterContentInit {
  @Input() value: any;
  @Output() onClick = new EventEmitter();
  @HostBinding('class.btn-primary') active: boolean = false;

  constructor(){

  }

  ngOnInit(){
  }

  ngAfterContentInit(){
  }

  @HostListener('click') onHostClick(args){
    this.onClick.emit(this.value);
  }
}
