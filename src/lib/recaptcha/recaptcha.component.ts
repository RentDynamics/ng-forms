import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rd-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.less'],
})
export class RecaptchaComponent implements OnInit {

  @Input() siteKey: string;
  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    window['verifyRecaptchaCallback'] = this.verifyRecaptchaCallback.bind(this);
  }

  ngOnInit() {
    this.displayRecaptcha();
  }

  displayRecaptcha() {
    var doc = <HTMLDivElement>document.getElementById('rd-recaptcha-form');
    var script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }

  verifyRecaptchaCallback(response) {
    this.success.emit(response);
  }

}
