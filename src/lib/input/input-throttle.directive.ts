import {
  Directive, EventEmitter, HostBinding, HostListener, Input, OnInit,
  Output, OnDestroy
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs/Rx'

@Directive({
  selector: '[rdInputThrottle]',
  providers: [NgModel]
})
export class InputThrottleDirective implements OnInit, OnDestroy {
  @Input() throttleDuration?: number;
  @Input() debounceDuration: number;
  @Output() onFinishedTyping: EventEmitter<any> = new EventEmitter<any>();
  @Output() onStartedTyping: EventEmitter<any> = new EventEmitter<any>();
  @HostListener('keyup', ['$event']) keyup(event) {
    this.onKeyUp(event);
  }

  keyup$: EventEmitter<any> = new EventEmitter<any>();
  isFirstKeyUp: boolean = true;

  constructor(public ngModel: NgModel) { }

  ngOnInit() {
    if (this.throttleDuration)
      this.keyup$.throttleTime(this.throttleDuration).subscribe(result => {
        this.onStartedTyping.emit(this.ngModel.model);
      })
    if (this.debounceDuration)
      this.keyup$.debounceTime(this.debounceDuration).subscribe(result => {
        this.onFinishedTyping.emit(this.ngModel.model);
        this.isFirstKeyUp = true;
      })
  }

  onKeyUp(event) {
    if (this.isFirstKeyUp) {
      this.onStartedTyping.emit(this.ngModel.model)
      this.isFirstKeyUp = false;
    }
    this.keyup$.emit(this.ngModel.model);
  }

  ngOnDestroy() {
    this.onFinishedTyping.emit(this.ngModel.model);
  }
}


